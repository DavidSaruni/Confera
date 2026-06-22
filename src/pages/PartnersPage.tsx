import { AppShell, PageHeader } from "@/components/AppShell";
import { PARTNERS } from "@/data/conference";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

export default function PartnersPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Partners"
        title="Institutions powering AHC 2026"
        subtitle="With gratitude to the partners standing with Kabarak University to advance universal health coverage."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {PARTNERS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 card-elev hover:border-primary/40"
          >
            <PartnerLogo name={p.name} logo={p.logo} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 font-display text-lg text-foreground group-hover:text-primary">
                {p.name}
                <ExternalLink className="h-4 w-4 opacity-60" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
            </div>
          </a>
        ))}
      </div>
    </AppShell>
  );
}

function PartnerLogo({ name, logo }: { name: string; logo?: string }) {
  const [err, setErr] = useState(false);
  if (logo && !err) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-1.5">
        <img
          src={logo}
          alt={name}
          onError={() => setErr(true)}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }
  return (
    <div className="ribbon flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-display text-xl text-primary-foreground">
      {name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
    </div>
  );
}
