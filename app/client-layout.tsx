"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Sidebar from "@/components/sidebar/index";
import { Menu, X } from "lucide-react";

type SidebarContextType = {
  collapsed: boolean;
  toggleCollapse: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within ClientLayout");
  return context;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Update localStorage when collapsed state changes
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const handleSidebarToggle = () => {
      const updated = localStorage.getItem("sidebar-collapsed") === "true";
      setCollapsed(updated);
    };

    window.addEventListener("sidebar-toggle", handleSidebarToggle);
    return () =>
      window.removeEventListener("sidebar-toggle", handleSidebarToggle);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    window.dispatchEvent(new CustomEvent("sidebar-toggle"));
  };

  // Calculate margin based on collapsed state
  const marginClass = collapsed ? "lg:ml-20" : "lg:ml-72";

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapse }}>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-lg p-2 shadow-md border border-gray-200"
      >
        <Menu size={20} />
      </button>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 lg:hidden overflow-y-auto">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
            <Sidebar isMobile={true} onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar onToggle={toggleCollapse} />
      </div>

      {/* Content area - with proper width calculation */}
      <div
        className={`${marginClass} transition-all duration-300 w-full lg:w-auto overflow-x-hidden`}
      >
        <div className="max-w-full overflow-x-hidden">{children}</div>
      </div>
    </SidebarContext.Provider>
  );
}
