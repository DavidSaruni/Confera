import { AppShell, PageHeader } from "@/components/AppShell";
import { SCHEDULE, CONFERENCE } from "@/data/conference";
import { ExternalLink } from "lucide-react";

export default function SchedulePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Program"
        title="Conference schedule"
        subtitle="Two days of keynotes, plenaries and breakout rounds. Synced live with the official Google Drive folder — last-minute changes appear here first."
      />
      <a
        href={CONFERENCE.driveScheduleUrl}
        target="_blank"
        rel="noreferrer"
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground hover:border-primary/40"
      >
        Open Google Drive folder <ExternalLink className="h-3.5 w-3.5" />
      </a>

      <div className="space-y-10">
        {SCHEDULE.map((day) => (
          <section key={day.day}>
            <h2 className="font-display text-xl text-foreground">{day.day}</h2>
            <div className="gold-rule mt-2 mb-4 h-px" />
            <ol className="relative space-y-0 border-l border-border pl-5">
              {day.items.map((it, i) => (
                <li key={i} className="relative pb-5 last:pb-0">
                  <span className="absolute -left-[26px] top-1.5 inline-block h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-lg text-primary">{it.time}</span>
                    <span className="font-medium text-foreground">{it.title}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{it.room}</div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
