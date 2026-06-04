"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sidebarLinks } from "./data";
import NavItem from "./NavItem";

export default function Sidebar({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    localStorage.setItem("sidebar-collapsed", String(!collapsed));
  };

  const sidebarWidth = collapsed ? "w-20" : "w-72";

  if (isMobile) {
    return (
      <div className="h-full bg-white overflow-y-auto">
        <div className="p-4 border-b">
          <img src="/alpinistlogo.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <nav className="p-2 space-y-1">
          {sidebarLinks.map((link) => (
            <NavItem key={link.href} item={link} pathname={pathname} onClose={onClose} collapsed={false} />
          ))}
        </nav>
      </div>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 hidden h-screen ${sidebarWidth} border-r border-gray-200 bg-white lg:flex lg:flex-col overflow-y-auto z-40 transition-all duration-300`}>
      <div className={`border-b border-gray-200 p-3 flex ${collapsed ? "justify-center" : "justify-between"} items-center`}>
        {!collapsed && (
          <div className="flex flex-col items-center">
            <img src="/alpinistlogo.png" alt="Alpinist AI Logo" className="h-8 w-auto object-contain" />
            <h1 className="text-xs font-bold text-gray-900 mt-1">Alpinist AI</h1>
          </div>
        )}
        <button onClick={toggleCollapse} className="p-1 rounded-lg hover:bg-gray-100">
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto pb-20">
        {sidebarLinks.map((link) => (
          <NavItem key={link.href} item={link} pathname={pathname} onClose={() => {}} collapsed={collapsed} />
        ))}
      </nav>
    </aside>
  );
}