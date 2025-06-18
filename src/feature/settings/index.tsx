"use client";

import { Edit, Users, Shield, Bell, Moon, FileText } from "lucide-react";
import NavigateBackArrow from "@/components/navigate-back-arrow";
import PageWrapper from "@/components/page-wrapper";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";

const settingsItems = [
  { icon: Edit, label: "Edit Profile", color: "bg-primary" },
  { icon: Users, label: "Contacts", color: "bg-primary" },
  { icon: Shield, label: "Account And Privacy", color: "bg-primary" },
  { icon: Bell, label: "Notification Preferences", color: "bg-primary" },
  { icon: Moon, label: "Dark Mode", color: "bg-primary" },
  { icon: FileText, label: "Terms And Conditions", color: "bg-primary" },
];

export default function Settings() {
  return (
    <PageWrapper>
      <PageHeader className="px-6">
        <div className="flex items-center gap-4 py-6 mb-8">
          <NavigateBackArrow to="/dashboard" />
          <span className="text-lg font-medium">Home</span>
        </div>
        <PageTitle title="Settings" className="text-2xl" />
      </PageHeader>

      {/* Profile Section */}
      <div className="px-6 mb-12 ">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="/assets/dashboard/profile.png"
              alt="Rohit Sharma"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold">Rohit Sharma</h2>
        </div>
      </div>

      {/* Settings Items */}
      <div className="px-6 space-y-8">
        {settingsItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 cursor-pointer">
            <div
              className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center`}
            >
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-md font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
