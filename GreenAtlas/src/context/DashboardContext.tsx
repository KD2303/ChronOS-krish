import { createContext, useContext, useState, ReactNode } from "react";

type Zone = "Zone A-12" | "Zone B-04" | "Zone C-18" | "Zone D-07" | "";

interface DashboardContextValue {
  selectedZone: Zone;
  setSelectedZone: (zone: Zone) => void;
  clearSelectedZone: () => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedZone, setSelectedZone] = useState<Zone>("");

  const clearSelectedZone = () => setSelectedZone("");

  return (
    <DashboardContext.Provider value={{ selectedZone, setSelectedZone, clearSelectedZone }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
}
