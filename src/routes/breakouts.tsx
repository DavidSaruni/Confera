import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { BREAKOUTS } from "@/data/conference";
import { Video, Users } from "lucide-react";

export const Route = createFileRoute("/breakouts")({
  head: () => ({
    meta: [
      { title: "Breakout Rooms · AHC 2026" },
      { name: "description", content: "Browse virtual breakout rooms by topic and join via Zoom with one tap." },
    ],
  }),
  component: Breakouts,
});

function Breakouts() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Breakout Rooms · Zoom"
        title="Join a session"
        subtitle="All breakouts run on Zoom. Pick a topic, tap Join, and you're in."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {BREAKOUTS.map((b) => (
          <article key={b.id} className="group flex flex-col rounded-2xl border border-border bg-card p-5 card-elev">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-primary">{b.time}</div>
                <h3 className="mt-1 font-display text-lg text-foreground">{b.topic}</h3>
                <div className="text-sm text-muted-foreground">Hosted by {b.host}</div>
              </div>
              <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">Zoom</span>
            </div>
            {b.speaker ? (
              <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-3">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary/80">Featured Speaker</div>
                <div className="mt-0.5 font-display text-sm text-foreground">{b.speaker}</div>
                <div className="text-xs text-muted-foreground">{b.speakerRole}</div>
              </div>
            ) : null}
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {b.capacity} seats</span>
            </div>
            <a
              href={b.link}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95"
            >
              <Video className="h-4 w-4" /> Join Zoom room
            </a>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
