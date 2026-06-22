export type Abstract = {
  code: string;
  title: string;
  author: string;
  institution: string;
  type: "Oral" | "Poster";
};

type CacheEntry = { abstracts: Abstract[]; expires: number };
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000;

function extractSpreadsheetId(url: string): string | null {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return match?.[1] ?? null;
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || (char === "\r" && next === "\n")) {
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      if (char === "\r") i++;
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.trim())) rows.push(row);
  return rows;
}

function isPresentationType(value: string): boolean {
  return /^(oral|poster)(\s+presentation)?$/i.test(value.trim());
}

function normalizeType(value: string): Abstract["type"] {
  return /poster/i.test(value) ? "Poster" : "Oral";
}

function parseRow(cells: string[]): Abstract | null {
  const code = cells[0]?.trim() ?? "";
  const author = cells[1]?.trim() ?? "";
  const institution = cells[2]?.trim() ?? "";
  const colD = cells[3]?.trim() ?? "";
  const colE = cells[4]?.trim() ?? "";

  if (!code || !/^\d+$/.test(code) || !author) return null;

  let type: Abstract["type"] = "Oral";
  let title = "";

  if (isPresentationType(colD)) {
    type = normalizeType(colD);
    title = colE;
  } else if (colE) {
    title = colE;
    if (colD) type = normalizeType(colD);
  } else {
    title = colD;
  }

  if (!title) return null;

  return { code, author, institution, type, title };
}

export function parseAbstractsCsv(csv: string): Abstract[] {
  const rows = parseCsv(csv);
  const abstracts: Abstract[] = [];

  for (const row of rows.slice(1)) {
    const parsed = parseRow(row);
    if (parsed) abstracts.push(parsed);
  }

  return abstracts.sort((a, b) => Number(a.code) - Number(b.code));
}

function csvExportUrls(spreadsheetId: string): string[] {
  return [
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`,
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`,
  ];
}

export async function fetchAbstractsFromSheet(sheetUrl: string): Promise<Abstract[]> {
  const spreadsheetId = extractSpreadsheetId(sheetUrl);
  if (!spreadsheetId || /your-book-of-abstracts-id/i.test(sheetUrl)) return [];

  const cached = cache.get(spreadsheetId);
  if (cached && cached.expires > Date.now()) return cached.abstracts;

  let lastError: unknown;
  for (const url of csvExportUrls(spreadsheetId)) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (!response.ok) continue;

      const csv = await response.text();
      if (!csv.includes(",") || csv.startsWith("<!DOCTYPE")) continue;

      const abstracts = parseAbstractsCsv(csv);
      if (abstracts.length === 0) continue;

      cache.set(spreadsheetId, { abstracts, expires: Date.now() + CACHE_TTL_MS });
      return abstracts;
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) throw lastError;
  return [];
}
