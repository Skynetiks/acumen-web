import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const toggleSidebar = useSidebar().toggleSidebar;
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          {/* Mobile Topbar */}
          <div className="p-2 md:hidden border-b flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-primary"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <span className="text-lg font-semibold">Acumen</span>
            <div className="w-6 h-6" />
          </div>
        </div>
      </nav>
    </header>
  );
}
