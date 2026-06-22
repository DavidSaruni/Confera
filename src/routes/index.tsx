import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CONFERENCE, SPEAKERS, ANNOUNCEMENTS, SCHEDULE } from "@/data/conference";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import logoAsset from "@/assets/kabarak-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AHC 2026 — Kabarak 16th Annual Health Conference" },
      { name: "description", content: "Your companion app for the 16th Annual Health Conference: live schedules, breakout rooms, speakers, abstracts and announcements." },
      { property: "og:title", content: "AHC 2026 — Kabarak 16th Annual Health Conference" },
      { property: "og:description", content: "Stronger Systems, Healthier Communities, Shared Future. 25–26 June 2026, Kabarak University." },
    ],
  }),
  component: Index,
});

function Index() {
  const next = SCHEDULE[0].items.slice(0, 3);
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card card-elev">
        <div className="ribbon absolute inset-x-0 top-0 h-24 opacity-95" />
        <div className="relative px-6 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-8">
          <div className="mb-4 flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="Kabarak University"
              width={96}
              height={96}
              className="h-20 w-20 rounded-xl bg-white p-1.5 shadow-md ring-1 ring-black/5 sm:h-24 sm:w-24"
            />
            <div className="text-[11px] uppercase tracking-[0.22em] text-primary-foreground/85">
              <span className="rounded-full bg-primary-foreground/10 px-2.5 py-1 backdrop-blur">
                {CONFERENCE.faculty}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary-foreground/85">
            <span className="rounded-full bg-gold px-2.5 py-1 text-gold-foreground">Mode · {CONFERENCE.mode}</span>
          </div>
          <h1 className="mt-24 max-w-3xl font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
            {CONFERENCE.edition}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Kabarak University, Nakuru</span>
            <span>·</span>
            <span>{CONFERENCE.dates}</span>
          </div>

          <div className="mt-6 max-w-2xl rounded-2xl border border-border/70 bg-background/70 p-4 backdrop-blur">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Theme</div>
            <p className="mt-1 font-display text-lg leading-snug text-foreground">“{CONFERENCE.theme}”</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              {CONFERENCE.tagline}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/schedule" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95">
              View full schedule <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/breakouts" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary/40">
              Join a breakout room
            </Link>
          </div>
        </div>
      </section>

      {/* Two-column highlights */}
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 card-elev">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-foreground">Up next today</h2>
            <Link to="/schedule" className="text-xs font-medium text-primary hover:underline">Full agenda →</Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {next.map((it) => (
              <li key={it.time} className="flex items-start gap-4 py-3">
                <div className="w-14 shrink-0 font-display text-lg text-primary">{it.time}</div>
                <div>
                  <div className="font-medium text-foreground">{it.title}</div>
                  <div className="text-xs text-muted-foreground">{it.room}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/announcements" className="group rounded-2xl border border-border bg-card p-6 card-elev hover:border-primary/40">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-foreground">Latest news</h2>
            <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] font-medium text-destructive-foreground">LIVE</span>
          </div>
          <div className="mt-4 space-y-3">
            {ANNOUNCEMENTS.slice(0, 2).map((a) => (
              <div key={a.id}>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{a.when}</div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary">{a.title}</div>
              </div>
            ))}
          </div>
        </Link>
      </section>

      {/* Speakers preview */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Distinguished Speakers</div>
            <h2 className="font-display text-2xl text-foreground">Meet the voices shaping AHC 2026</h2>
          </div>
          <Link to="/speakers" className="text-xs font-medium text-primary hover:underline">All speakers →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPEAKERS.map((s) => (
            <article key={s.name} className="rounded-2xl border border-border bg-card p-5 card-elev">
              <div className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                s.accent === "primary" ? "bg-primary text-primary-foreground" : s.accent === "gold" ? "bg-gold text-gold-foreground" : "bg-forest text-forest-foreground"
              }`}>{s.role}</div>
              <div className="mt-3 font-display text-lg text-foreground">{s.name}</div>
              <div className="text-sm text-muted-foreground">{s.title}</div>
              <div className="mt-3 text-[11px] uppercase tracking-wider text-primary">{s.session}</div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
