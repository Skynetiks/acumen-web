"use client";

import {
  Building2,
  Bookmark,
  Mail,
  Settings,
  Shield,
  LogOut,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const menuItems = [
  { icon: Building2, label: "University", screen: "university" as const },
  { icon: Bookmark, label: "Application", screen: "application" as const },
  { icon: Mail, label: "Contact Us", screen: "dashboard" as const },
  { icon: Settings, label: "Settings", screen: "settings" as const },
  { icon: Shield, label: "Privacy Policy", screen: "dashboard" as const },
  { icon: LogOut, label: "Sign Out", screen: "dashboard" as const },
];

export default function AppSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-0 text-primary">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm p-0 bg-white">
        <div className="flex h-full">
          {/* Sidebar Content */}
          <div className="flex-1 p-6">
            {/* Profile Section */}
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="Rohit Sharma"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">Rohit Sharma</h2>
            </div>

            {/* Menu Items */}
            <div className="space-y-8">
              {menuItems.map((item, index) => (
                <Link
                  to={`/${item.screen}` as string}
                  key={index}
                  className="w-full flex gap-4 items-center p-0 h-auto text-lg font-medium"
                >
                  <item.icon className="w-6 h-6 mr-4 text-muted-foreground" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
