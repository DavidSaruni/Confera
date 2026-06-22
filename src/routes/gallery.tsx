import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/AppShell";
import { CONFERENCE } from "@/data/conference";
import { getGalleryImages } from "@/lib/api/gallery.functions";
import { ExternalLink, ImageIcon, Loader2 } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · AHC 2026" },
      { name: "description", content: "Curated photos from keynote moments and networking highlights at the 16th Annual Health Conference." },
    ],
  }),
  component: Gallery,
});

function galleryLinkLabel(url: string) {
  if (/photos\.(google\.com|app\.goo\.gl)/i.test(url)) return "Open full Google Photos album";
  return "Open full Google Drive gallery";
}

function Gallery() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery-images"],
    queryFn: () => getGalleryImages(),
    staleTime: 60 * 60 * 1000,
  });

  const images = data?.images ?? [];
  const fromShare = data?.source === "share";

  return (
    <AppShell>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from AHC 2026"
        subtitle="Relive keynote sessions, panel discussions and networking highlights. Photos sync from the official shared album."
      />
      <a
        href={CONFERENCE.driveGalleryUrl}
        target="_blank"
        rel="noreferrer"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground hover:border-primary/40"
      >
        {galleryLinkLabel(CONFERENCE.driveGalleryUrl)} <ExternalLink className="h-3.5 w-3.5" />
      </a>

      {isLoading && (
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading photos from the shared album…
        </div>
      )}

      {!isLoading && isError && (
        <p className="mb-6 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          Could not load the shared album right now. Try opening the album link above.
        </p>
      )}

      {!isLoading && images.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground/60" />
          <p className="max-w-md text-sm text-muted-foreground">
            No photos are available yet. Check back after the conference or open the shared album link above.
          </p>
        </div>
      )}

      {images.length > 0 && (
        <>
          {fromShare && (
            <p className="mb-4 text-xs text-muted-foreground">
              Showing {images.length} photo{images.length === 1 ? "" : "s"} from the shared album.
            </p>
          )}
          <div className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
            {images.map((src, i) => (
              <div key={`${src}-${i}`} className="break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card card-elev">
                <img
                  src={src}
                  alt={`Conference moment ${i + 1}`}
                  loading="lazy"
                  className="block w-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
