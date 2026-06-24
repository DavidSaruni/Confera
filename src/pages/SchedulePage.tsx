import { AppShell, PageHeader } from "@/components/AppShell";
import { CONFERENCE } from "@/data/conference";
import { drivePdfDownloadUrl, drivePdfEmbedUrl } from "@/lib/api/client";
import { Download, ExternalLink } from "lucide-react";

const pdfEmbed = drivePdfEmbedUrl(CONFERENCE.schedulePdfUrl);
const pdfDownload = drivePdfDownloadUrl(CONFERENCE.schedulePdfUrl);

export default function SchedulePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Program"
        title="Conference schedule"
        subtitle="Official AHC 2026 program. Last-minute changes will be reflected in the PDF below."
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <a
          href={CONFERENCE.schedulePdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground hover:border-primary/40"
        >
          Open PDF in new tab <ExternalLink className="h-3.5 w-3.5" />
        </a>
        {pdfDownload && (
          <a
            href={pdfDownload}
            download="AHC-Program-2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground hover:border-primary/40"
          >
            Download PDF <Download className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {pdfEmbed ? (
        <section className="overflow-hidden rounded-2xl border border-border bg-card card-elev">
          <iframe
            src={pdfEmbed}
            title="AHC 2026 Conference Program"
            className="block min-h-[85vh] w-full border-0 bg-background"
            loading="lazy"
            allow="autoplay"
          />
        </section>
      ) : (
        <p className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          The program PDF could not be loaded.{" "}
          <a href={CONFERENCE.schedulePdfUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            Open it on Google Drive
          </a>
          .
        </p>
      )}
    </AppShell>
  );
}
