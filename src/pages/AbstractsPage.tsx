import { useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/AppShell";
import { CONFERENCE } from "@/data/conference";
import { fetchAbstracts } from "@/lib/api/client";
import type { Abstract } from "@/lib/abstracts.server";
import { useMemo, useState } from "react";
import { Search, FileText, ExternalLink, Loader2 } from "lucide-react";

export default function AbstractsPage() {
  const [q, setQ] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["abstracts"],
    queryFn: () => fetchAbstracts(),
    staleTime: 30 * 60 * 1000,
  });

  const abstracts = data?.abstracts ?? [];
  const fromSheet = data?.source === "sheet";

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return abstracts;
    return abstracts.filter(
      (a) =>
        a.title.toLowerCase().includes(s) ||
        a.author.toLowerCase().includes(s) ||
        a.code.includes(s) ||
        a.institution.toLowerCase().includes(s),
    );
  }, [abstracts, q]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Book of Abstracts"
        title="Search the full repository"
        subtitle="Browse every accepted paper from the official spreadsheet. Filter by author, title, abstract code, or institution."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, author, or code…"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none ring-ring focus:border-primary/50 focus:ring-2"
          />
        </div>
        <a
          href={CONFERENCE.driveAbstractsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <FileText className="h-4 w-4" /> Open spreadsheet
          <ExternalLink className="h-3.5 w-3.5 opacity-80" />
        </a>
      </div>

      {isLoading && (
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading abstracts from the spreadsheet…
        </div>
      )}

      {!isLoading && isError && (
        <p className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          Could not load the spreadsheet right now. Try opening it directly using the button above.
        </p>
      )}

      {!isLoading && fromSheet && abstracts.length > 0 && (
        <p className="mb-4 text-xs text-muted-foreground">
          Showing {abstracts.length} accepted abstract{abstracts.length === 1 ? "" : "s"} synced from Google Sheets.
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-card card-elev">
        <ul className="divide-y divide-border">
          {filtered.map((a) => (
            <AbstractRow key={a.code} a={a} />
          ))}
          {!isLoading && filtered.length === 0 && (
            <li className="p-8 text-center text-sm text-muted-foreground">
              {abstracts.length === 0 ? "No abstracts are available yet." : `No abstracts match "${q}".`}
            </li>
          )}
        </ul>
      </div>
    </AppShell>
  );
}

function AbstractRow({ a }: { a: Abstract }) {
  return (
    <li className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:gap-5">
      <div className="font-display text-2xl text-primary sm:w-20">#{a.code}</div>
      <div className="flex-1">
        <div className="font-medium text-foreground">{a.title}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {a.author} · {a.institution}
        </div>
      </div>
      <span
        className={`self-start rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
          a.type === "Oral" ? "bg-primary text-primary-foreground" : "bg-gold text-gold-foreground"
        }`}
      >
        {a.type}
      </span>
    </li>
  );
}
