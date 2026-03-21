import { MapPin, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  title?: string;
  subtitle?: string;
  className?: string;
  markers?: { label: string; status: "safe" | "warning" | "critical" }[];
  legend?: { label: string; color: string }[];
  onMarkerClick?: (zone: string) => void;
  delay?: number;
}

export function MapPlaceholder({ title = "Interactive Risk Map", subtitle, className, markers = [], legend = [], onMarkerClick, delay = 0 }: MapPlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden opacity-0 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <Maximize2 className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="relative h-[320px] bg-gradient-to-br from-[hsl(152,20%,92%)] via-[hsl(180,15%,90%)] to-[hsl(200,18%,88%)] mx-5 mb-3 rounded-xl overflow-hidden">
        {/* Simulated map terrain */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
          <path d="M0,200 Q50,180 100,190 T200,170 T300,185 T400,175 V300 H0Z" fill="hsl(152,30%,45%)" opacity="0.3" />
          <path d="M0,220 Q80,200 160,215 T320,195 T400,210 V300 H0Z" fill="hsl(152,25%,50%)" opacity="0.2" />
          <path d="M0,250 Q100,230 200,245 T400,235 V300 H0Z" fill="hsl(152,20%,55%)" opacity="0.15" />
          {/* Grid lines */}
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="hsl(200,10%,70%)" strokeWidth="0.5" opacity="0.3" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={i * 45} y1="0" x2={i * 45} y2="300" stroke="hsl(200,10%,70%)" strokeWidth="0.5" opacity="0.3" />
          ))}
        </svg>

        {/* Markers */}
        {markers.length > 0 ? markers.map((m, i) => {
          const positions = [
            { top: "25%", left: "30%" },
            { top: "45%", left: "55%" },
            { top: "35%", left: "70%" },
            { top: "60%", left: "40%" },
            { top: "20%", left: "60%" },
          ];
          const pos = positions[i % positions.length];
          const colors = { safe: "bg-emerald-600", warning: "bg-amber-500", critical: "bg-rose-600" };
          return (
            <button
              key={i}
              type="button"
              onClick={() => onMarkerClick?.(m.label)}
              className="absolute flex flex-col items-center"
              style={pos}
            >
              <div className={cn("h-3 w-3 rounded-full border-2 border-white shadow-md", colors[m.status])} />
              <span className="text-[10px] font-medium text-slate-700 mt-1 bg-white/90 px-1.5 py-0.5 rounded hover:bg-emerald-50">{m.label}</span>
            </button>
          );
        }) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center text-muted-foreground/60">
              <MapPin className="h-8 w-8 mb-2" />
              <span className="text-xs">Select a region to visualize</span>
            </div>
          </div>
        )}

        {/* Heatmap overlay blobs */}
        <div className="absolute top-[20%] left-[25%] h-24 w-24 rounded-full bg-rose-500/20 blur-xl" />
        <div className="absolute top-[50%] left-[50%] h-20 w-20 rounded-full bg-amber-500/20 blur-xl" />
        <div className="absolute top-[30%] left-[65%] h-16 w-16 rounded-full bg-emerald-600/20 blur-xl" />
      </div>

      {legend.length > 0 && (
        <div className="px-5 pb-4 flex items-center gap-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Legend</span>
          {legend.map((l, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={cn("h-2.5 w-2.5 rounded-full", l.color)} />
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
