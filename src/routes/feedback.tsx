import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { MessageSquare, Send, Star, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback · AHC 2026" },
      { name: "description", content: "Share your experience of the 16th Annual Health Conference — rate sessions and leave suggestions for the organizers." },
    ],
  }),
  component: FeedbackPage,
});

type Entry = { id: string; name: string; rating: number; topic: string; message: string; when: string };
const KEY = "ahc2026.feedback";

function loadAll(): Entry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

function FeedbackPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Overall experience");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => { setEntries(loadAll()); }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const next: Entry = {
      id: Math.random().toString(36).slice(2, 9),
      name: name.trim() || "Anonymous",
      topic, rating, message: message.trim(),
      when: new Date().toISOString(),
    };
    const all = [next, ...loadAll()];
    localStorage.setItem(KEY, JSON.stringify(all));
    setEntries(all);
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Feedback"
        title="Tell us about your conference"
        subtitle="Your reflections help us shape future editions of the Annual Health Conference."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6 card-elev">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Your name (optional)</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Anonymous"
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Topic</label>
              <select value={topic} onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring">
                {["Overall experience","Keynote sessions","Breakout rooms","Venue & logistics","App experience","Other"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Rating</label>
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)}
                  className={`rounded-lg p-2 transition ${n <= rating ? "text-gold" : "text-muted-foreground/40 hover:text-muted-foreground"}`}>
                  <Star className={`h-7 w-7 ${n <= rating ? "fill-current" : ""}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Your feedback</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required
              placeholder="What worked well? What could we improve?"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring" />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95">
              <Send className="h-4 w-4" /> Submit feedback
            </button>
            {sent && (
              <span className="inline-flex items-center gap-1.5 text-xs text-forest">
                <CheckCircle2 className="h-4 w-4" /> Thank you!
              </span>
            )}
          </div>
        </form>

        <div className="rounded-2xl border border-border bg-card p-6 card-elev">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg text-foreground">Recent feedback</h2>
          </div>
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No feedback yet — be the first to share your thoughts.</p>
          ) : (
            <ul className="space-y-4">
              {entries.slice(0, 8).map((e) => (
                <li key={e.id} className="border-b border-border pb-3 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium text-foreground">{e.name}</div>
                    <div className="flex">
                      {Array.from({ length: e.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current text-gold" />
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{e.topic} · {new Date(e.when).toLocaleString()}</div>
                  <p className="mt-1.5 text-sm text-foreground/80">{e.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
}
