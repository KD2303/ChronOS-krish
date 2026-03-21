import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6", className)}>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-[0.02em] uppercase leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-600 mt-1 max-w-3xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 mt-3 sm:mt-0">{actions}</div>}
    </div>
  );
}
