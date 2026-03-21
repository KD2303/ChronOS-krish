import { TopNav } from "./TopNav";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f0f9ff_0%,_#f0fdf4_35%,_#f8fdfb_100%)] text-slate-900">
      <TopNav />
      <div className="flex flex-col">
        <div className="sticky top-14 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-3 md:px-6">
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 font-medium">
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">Date: Last 30 days</span>
              <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-700">Region: Global</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">Scenario: Baseline</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Weekly Data Reviewed</span>
                <span className="text-xs font-bold text-slate-800">3/5 Regions</span>
              </div>
              <div className="relative w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "60%" }} />
              </div>
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Filter</button>
              <button className="rounded-lg border border-emerald-600 bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">Apply</button>
            </div>
          </div>
        </div>
        <main>{children}</main>
        <footer className="border-t border-white/30 py-4 px-6 mt-8 bg-white/50 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>© 2026 GreenAtlas Environmental Intelligence Platform</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Data Sourcing</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
