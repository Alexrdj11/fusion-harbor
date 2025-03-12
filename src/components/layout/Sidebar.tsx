import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Briefcase,
  Users,
  BarChart2,
  Layers,
  ShieldCheck,
  ClipboardList,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";

interface NavigationItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const navigationItems: NavigationItem[] = [
    { title: "Dashboard", path: "/dashboard", icon: <Briefcase size={20} /> },
    { title: "Jobs", path: "/jobs", icon: <Briefcase size={20} /> },
    { title: "Candidates", path: "/candidates", icon: <Users size={20} /> },
    { title: "Analytics", path: "/analytics", icon: <BarChart2 size={20} /> },
    { title: "Skill Gap", path: "/skill-gap", icon: <Layers size={20} /> },
    { title: "Bias Mitigation", path: "/bias-mitigation", icon: <ShieldCheck size={20} /> },
    { title: "ATS", path: "/ats", icon: <ClipboardList size={20} /> },
    { title: "Reports", path: "/reports", icon: <FileText size={20} /> },
    { title: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar h-screen border-r border-border transition-all duration-300 overflow-y-auto",
          isOpen
            ? "w-64 translate-x-0 opacity-100"
            : isMobile
            ? "w-0 -translate-x-full opacity-0"
            : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-center h-16 border-b border-border">
          {isOpen ? (
            <Logo />
          ) : (
            !isMobile && <Logo size="sm" className="mx-auto" />
          )}
        </div>

        <nav className="p-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center p-3 rounded-md transition-colors",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive
                        ? "bg-sidebar-accent text-primary-blue font-medium"
                        : "text-sidebar-foreground",
                      !isOpen && "justify-center"
                    )
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {isOpen && <span>{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
