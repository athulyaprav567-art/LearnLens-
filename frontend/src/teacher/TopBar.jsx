import { Menu, Bell } from "lucide-react";
import { teacherData } from "../data/mockData";

export default function TopBar({ onMenuClick }) {
  return (
    <header className="h-14 bg-cream border-b border-border flex items-center justify-between px-5 lg:px-8 sticky top-0 z-20">
      <button
        className="lg:hidden text-coffee hover:text-espresso transition-colors"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} strokeWidth={1.8} />
      </button>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-4">
        <button className="relative text-coffee hover:text-espresso transition-colors">
          <Bell size={18} strokeWidth={1.8} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-maroon rounded-full flex items-center justify-center text-[9px] text-cream font-body font-bold">
            3
          </span>
        </button>
        <div className="h-5 w-px bg-border" />
        <div className="text-right">
          <p className="text-xs font-body font-semibold text-espresso leading-tight">
            {teacherData.shortName}
          </p>
          <p className="text-[11px] font-body text-coffee leading-tight">
            {teacherData.class}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-espresso flex items-center justify-center text-cream text-xs font-body font-semibold flex-shrink-0">
          {teacherData.name.charAt(0)}
        </div>
      </div>
    </header>
  );
}