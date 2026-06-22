import { useQuery } from "@tanstack/react-query";
import { AppShell, PageHeader } from "@/components/AppShell";
import { FeedbackChartCard } from "@/components/FeedbackCharts";
import { fetchFeedback } from "@/lib/api/client";
import type { FeedbackStats } from "@/lib/feedback.server";
import { BarChart3, ExternalLink, Loader2, RefreshCw, Star } from "lucide-react";

export default function FeedbackPage() {
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["feedback"],
    queryFn: () => fetchFeedback(),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const stats = data?.stats;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Feedback"
        title="Conference evaluation"
        subtitle="Complete the official evaluation form below. Response summaries adapt automatically to whichever form and linked spreadsheet you share."
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {data?.formUrl && (
          <a
            href={data.formUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground hover:border-primary/40"
          >
            Open form in new tab <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-foreground hover:border-primary/40 disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
          Refresh stats
        </button>
      </div>

      <section className="mb-8 overflow-hidden rounded-2xl border border-border bg-card card-elev">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-lg text-foreground">Evaluation form</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {stats?.formTitle ?? "Submit your evaluation using the embedded form below."}
          </p>
        </div>
        {data?.embedUrl ? (
          <iframe
            src={data.embedUrl}
            title={stats?.formTitle ?? "Conference evaluation form"}
            className="block min-h-[2200px] w-full border-0 bg-background"
            loading="lazy"
          />
        ) : (
          <div className="flex min-h-[320px] items-center justify-center p-8 text-sm text-muted-foreground">
            {isLoading ? "Loading form…" : "Evaluation form unavailable."}
          </div>
        )}
      </section>

      <FeedbackSummary stats={stats} isLoading={isLoading} isError={isError} />
    </AppShell>
  );
}

function FeedbackSummary({
  stats,
  isLoading,
  isError,
}: {
  stats?: FeedbackStats;
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 card-elev">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Building response summary…
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 card-elev">
        <p className="text-sm text-muted-foreground">Could not load response statistics.</p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6 card-elev">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <div>
              <h2 className="font-display text-lg text-foreground">Live response summary</h2>
              {stats.formTitle && (
                <p className="mt-0.5 text-xs text-muted-foreground">{stats.formTitle}</p>
              )}
            </div>
          </div>
          {stats.source === "sheet" && (
            <p className="text-[11px] text-muted-foreground">
              Updated {new Date(stats.updatedAt).toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Responses" value={String(stats.totalResponses)} />
          <StatCard
            label="Overall average"
            value={stats.overallAverage !== null ? `${stats.overallAverage}/5` : "—"}
            icon
          />
          <StatCard label="Question groups" value={String(stats.charts.length)} />
        </div>

        {stats.source === "unavailable" && stats.message && (
          <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/40 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
            {stats.message}
          </p>
        )}
      </div>

      {stats.charts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stats.charts.map((chart) => (
            <FeedbackChartCard key={chart.id} chart={chart} />
          ))}
        </div>
      )}
    </section>
  );
}

function StatCard({
  label,
  value,
  icon = false,
}: {
  label: string;
  value: string;
  icon?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 px-3 py-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-1 font-display text-2xl text-foreground">
        {icon && value !== "—" && <Star className="h-5 w-5 fill-current text-gold" />}
        {value}
      </div>
    </div>
  );
}
