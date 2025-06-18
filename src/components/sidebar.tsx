"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Building2,
  Bookmark,
  Mail,
  Settings,
  Shield,
  Pencil,
  CalendarCheck,
  LogOutIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/providers/auth-context";
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: Building2, label: "University", to: "/university" },
  { icon: Bookmark, label: "Application", to: "/application" },
  { icon: CalendarCheck, label: "Events", to: "/events" },
  { icon: Mail, label: "Contact Us", to: "/contact" },
  { icon: Settings, label: "Settings", to: "/settings" },
  { icon: Shield, label: "Privacy", to: "/privacy" },
];

export default function AppSidebar() {
  const { logout } = useAuth();
  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="offcanvas"
      className="p-4"
    >
      <SidebarHeader>
        <div className="flex items-start gap-1 p-4">
          <div className=" w-12 h-12 rounded-full overflow-hidden">
            <img
              src="/assets/dashboard/profile.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <Pencil className=" text-primary w-4 h-4" />
        </div>
        <span className="font-semibold">Rohit Sharma</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-4 pt-4">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.to} className="gap-8">
                <SidebarMenuButton asChild className="text-md">
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 p-3 hover:bg-muted rounded-md"
                  >
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {/* Add optional footer content here */}
        <Button
          variant={"ghost"}
          onClick={logout}
          className="w-full text-left justify-start text-muted-foreground hover:text-white"
        >
          <LogOutIcon className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
