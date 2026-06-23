import { Link, Outlet, useLocation } from "react-router-dom";
import { Bell, Calendar, Image as ImageIcon, BookOpen, Mic2, Building2, Video, Home, MessageSquare } from "lucide-react";
import type { ReactNode } from "react";
import { CONFERENCE } from "@/data/conference";
import kabarakLogo from "@/public/images/Kabarak_University_Logo.png";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/schedule", label: "Schedule", icon: Calendar },
  { to: "/breakouts", label: "Rooms", icon: Video },
  { to: "/speakers", label: "Speakers", icon: Mic2 },
  { to: "/abstracts", label: "Book of Abstracts", icon: BookOpen },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/partners", label: "Partners", icon: Building2 },
  { to: "/announcements", label: "News", icon: Bell },
  { to: "/feedback", label: "Feedback", icon: MessageSquare },
];

export function AppShell({ children }: { children?: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <div className="mx-auto flex max-w-6xl gap-8 px-4 pb-32 pt-6 md:px-6 lg:pt-10">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1">
            {NAV.map((n) => {
              const Icon = n.icon;
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/75 hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children ?? <Outlet />}</main>
      </div>
      <MobileTabBar pathname={pathname} />
      <footer className="mx-auto max-w-6xl px-6 pb-28 pt-6 text-center text-xs text-muted-foreground lg:pb-10">
        © {new Date().getFullYear()} {CONFERENCE.host} · {CONFERENCE.faculty}
      </footer>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="ribbon h-1 w-full" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={kabarakLogo}
            alt="Kabarak University"
            width={56}
            height={56}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />
          <div className="leading-tight">
            <div className="font-display text-base text-foreground sm:text-lg">{CONFERENCE.shortName}</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Kabarak · {CONFERENCE.dates}
            </div>
          </div>
        </Link>
        <Link
          to="/announcements"
          className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground/80 hover:border-primary/40 hover:text-foreground"
        >
          <Bell className="h-3.5 w-3.5 text-primary" />
          <span className="hidden sm:inline">Live updates</span>
          <span className="ml-0.5 inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
        </Link>
      </div>
    </header>
  );
}

function MobileTabBar({ pathname }: { pathname: string }) {
  const tabs = [...NAV.slice(0, 4), NAV.find((n) => n.to === "/feedback")!];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2">
        {tabs.map((n) => {
          const Icon = n.icon;
          const active = pathname === n.to;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "stroke-[2.2]" : ""}`} />
              {n.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      )}
      <h1 className="font-display text-3xl text-foreground sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
      <div className="gold-rule mt-5 h-px" />
    </div>
  );
}
