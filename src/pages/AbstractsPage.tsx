import { useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/AppShell";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CONFERENCE } from "@/data/conference";
import { fetchAbstracts, drivePdfEmbedUrl, drivePdfDownloadUrl } from "@/lib/api/client";
import type { Abstract } from "@/lib/abstracts.server";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, FileText, Loader2, Download, Maximize2, Minimize2, X } from "lucide-react";

export default function AbstractsPage() {
  const [q, setQ] = useState("");
  const [pdfOpen, setPdfOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["abstracts"],
    queryFn: () => fetchAbstracts(),
    staleTime: 30 * 60 * 1000,
  });

  const abstracts = data?.abstracts ?? [];
  const fromSheet = data?.source === "sheet";
  const pdfEmbed = drivePdfEmbedUrl(CONFERENCE.abstractsPdfUrl);

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
        subtitle="Search accepted papers below or open the full Book of Abstracts PDF."
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
        <button
          type="button"
          onClick={() => setPdfOpen(true)}
          disabled={!pdfEmbed}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-50"
        >
          <FileText className="h-4 w-4" /> Open full PDF
        </button>
      </div>

      {isLoading && (
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading abstracts from the spreadsheet…
        </div>
      )}

      {!isLoading && isError && (
        <p className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          Could not load the abstract list right now. Open the full PDF to browse all papers.
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

      <AbstractsPdfDialog
        open={pdfOpen}
        onOpenChange={setPdfOpen}
        embedUrl={pdfEmbed}
        downloadUrl={drivePdfDownloadUrl(CONFERENCE.abstractsPdfUrl)}
      />
    </AppShell>
  );
}

function modalIconButtonClass() {
  return "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
}

function AbstractsPdfDialog({
  open,
  onOpenChange,
  embedUrl,
  downloadUrl,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  embedUrl: string | null;
  downloadUrl: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next && document.fullscreenElement) {
      void document.exitFullscreen();
    }
    onOpenChange(next);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await containerRef.current.requestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked by the browser
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        ref={containerRef}
        hideCloseButton
        className="flex h-[92dvh] w-[96vw] max-w-5xl flex-col gap-0 overflow-hidden bg-background p-0 data-[state=open]:sm:rounded-2xl [&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:max-w-none [&:fullscreen]:rounded-none"
      >
        <DialogHeader className="relative shrink-0 border-b border-border px-5 py-4 pr-36 text-left">
          <DialogTitle className="font-display text-lg">Book of Abstracts (PDF)</DialogTitle>
          <DialogDescription>SMHS Book of Abstracts 2026</DialogDescription>
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {downloadUrl && (
              <a
                href={downloadUrl}
                download="SMHS-BOA-2026.pdf"
                target="_blank"
                rel="noreferrer"
                className={modalIconButtonClass()}
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download PDF</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className={modalIconButtonClass()}
              title={isFullscreen ? "Exit full screen" : "Full screen"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              <span className="sr-only">{isFullscreen ? "Exit full screen" : "Full screen"}</span>
            </button>
            <DialogClose className={modalIconButtonClass()} title="Close">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>
        {embedUrl && open && (
          <iframe
            src={embedUrl}
            title="SMHS Book of Abstracts 2026"
            className="min-h-0 flex-1 w-full border-0 bg-background"
            loading="lazy"
            allow="autoplay"
          />
        )}
      </DialogContent>
    </Dialog>
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
