"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NavItem({ item, level = 0, pathname, onClose, collapsed = false }: any) {
  const [isOpen, setIsOpen] = useState(level === 0);
  const [dynamicChildren, setDynamicChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const Icon = item.icon;
  const hasChildren = (item.children && item.children.length > 0) || item.dynamicChildren;
  const isActive = pathname === item.href || (item.href.includes('#') && pathname === item.href.split('#')[0]);

  const linkClasses = `flex items-center ${collapsed ? "justify-center" : "gap-3"} flex-1`;
  const wrapperClasses = `flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"} ${level > 0 ? "ml-6" : ""}`;

  useEffect(() => {
    if (item.dynamicChildren && !dynamicChildren.length && !loading) {
      setLoading(true);
      fetch("/api/notes")
        .then(res => res.json())
        .then(data => {
          const noteChildren = data.notes.map((note: any) => ({
            name: note.title,
            href: `/notes/read?slug=${note.slug}`,
            icon: () => null
          }));
          setDynamicChildren(noteChildren);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }, [item.dynamicChildren]);

  const childrenToRender = item.children || dynamicChildren;

  return (
    <div>
      <div className={wrapperClasses}>
        <Link href={item.href} onClick={onClose} className={linkClasses}>
          <Icon className="h-5 w-5" />
          {!collapsed && <span className="font-medium text-sm">{item.name}</span>}
        </Link>
        {hasChildren && !collapsed && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-200 rounded-lg">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>
      {hasChildren && !collapsed && isOpen && (
        <div className="ml-2 mt-1 space-y-1">
          {loading && <div className="text-xs text-gray-400 ml-6">Loading...</div>}
          {childrenToRender?.map((child: any) => (
            <NavItem key={child.href} item={child} level={level + 1} pathname={pathname} onClose={onClose} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  );
}