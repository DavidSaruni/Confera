import { AppShell, PageHeader } from "@/components/AppShell";
import { BREAKOUTS } from "@/data/conference";
import { Video } from "lucide-react";

export default function BreakoutsPage() {
  const dayGroups = BREAKOUTS.reduce(
    (groups, session) => {
      const existing = groups.find((g) => g.dayLabel === session.dayLabel);
      if (existing) {
        existing.sessions.push(session);
      } else {
        groups.push({ dayLabel: session.dayLabel, sessions: [session] });
      }
      return groups;
    },
    [] as { dayLabel: string; sessions: (typeof BREAKOUTS)[number][] }[],
  );

  return (
    <AppShell>
      <PageHeader
        eyebrow="Breakout Rooms · Zoom"
        title="Join a session"
        subtitle="Breakouts run on Zoom across both conference days. Pick a topic and tap Join to enter your room."
      />

      <div className="space-y-10">
        {dayGroups.map((group) => (
          <section key={group.dayLabel}>
            <div className="mb-5">
              <h2 className="font-display text-xl text-foreground">{group.dayLabel}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{group.sessions[0]?.time}</p>
              <div className="gold-rule mt-3 h-px" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {group.sessions.map((b) => (
                <BreakoutCard key={b.id} session={b} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}

function BreakoutCard({ session }: { session: (typeof BREAKOUTS)[number] }) {
  const hasLink = Boolean(session.link);

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 card-elev">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">
            {session.sessionLabel}
          </div>
          <h3 className="mt-1 font-display text-lg text-foreground">{session.topic}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
          Zoom
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-3">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary/80">Moderators</div>
        <ul className="mt-2 space-y-2">
          {session.moderators.map((moderator) => (
            <li key={moderator.name}>
              <div className="font-display text-sm text-foreground">{moderator.name}</div>
              <div className="text-xs text-muted-foreground">{moderator.school}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <div>
          <span className="font-medium text-foreground/80">Session Rapporteur:</span> {session.rapporteur}
        </div>
        {session.venue && (
          <div>
            <span className="font-medium text-foreground/80">Venue:</span> {session.venue}
          </div>
        )}
      </div>

      {hasLink ? (
        <a
          href={session.link!}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95"
        >
          <Video className="h-4 w-4" /> Join Zoom room
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-5 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground"
        >
          <Video className="h-4 w-4" /> Zoom link coming soon
        </button>
      )}
    </article>
  );
}
