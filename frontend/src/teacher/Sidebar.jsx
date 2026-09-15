import { NavLink, useLocation } from "react-router-dom";
import { Home, BarChart2, Lightbulb, FileText, Settings, BookOpen } from "lucide-react";
import { teacherData } from "../data/mockData";

const navItems = [
  { to: "/teacher",        label: "Home",     icon: Home,       exact: true },
  { to: "/teacher/analysis",  label: "Analysis",  icon: BarChart2  },
  { to: "/teacher/insights",  label: "Insights",  icon: Lightbulb  },
  { to: "/teacher/reports",   label: "Reports",   icon: FileText   },
  { to: "/teacher/settings",  label: "Settings",  icon: Settings   },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-espresso/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-60 bg-cream border-r border-border z-40
          flex flex-col transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="px-6 pt-7 pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-maroon" strokeWidth={1.8} />
            <span className="font-display text-xl font-semibold text-espresso tracking-wide">
              LearnLens
            </span>
          </div>
          <p className="text-xs text-coffee mt-1 font-body">Teaching Intelligence</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ to, label, icon: Icon, exact }) => {
            const isActive = exact
              ? location.pathname === to
              : location.pathname.startsWith(to) && to !== "/teacher";
            const activeExact = location.pathname === "/teacher" && to === "/teacher";
            const active = activeExact || (!exact && isActive);

            return (
              <NavLink
                key={to}
                to={to}
                end={exact}
                onClick={onClose}
                className={({ isActive: a }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                    a
                      ? "bg-espresso text-cream"
                      : "text-coffee hover:bg-beige hover:text-espresso"
                  }`
                }
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </NavLink>
            );
          })}
        </nav>

        {/* Teacher info */}
        <div className="px-6 py-5 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-espresso flex items-center justify-center text-cream text-xs font-body font-semibold flex-shrink-0">
              {teacherData.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-body font-semibold text-espresso truncate">
                {teacherData.shortName}
              </p>
              <p className="text-[11px] font-body text-coffee truncate">
                {teacherData.class}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}