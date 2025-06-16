"use client";

import { Search, FileText, Calendar, Bell, Building2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageWrapper from "@/components/page-wrapper";
import type { DashboardDataType } from "./data/schema";
import { Link } from "@tanstack/react-router";
import PageTitle from "@/components/page-title";
import PageHeader from "@/components/page-header";
import AppSidebar from "@/components/sidebar";
import BookingPopup from "../booking/booking-popup";

interface DashboardProps {
  data: DashboardDataType;
}

export default function Dashboard({ data }: DashboardProps) {
  return (
    <PageWrapper>
      {/* Header */}
      <PageHeader>
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-4">
            <AppSidebar />
            <PageTitle title="Welcome, Ankur !" />
          </div>
          <Link
            to="/notification"
            className={buttonVariants({ variant: "ghost" })}
          >
            <Bell className="w-6 h-6 text-primary" />
          </Link>
        </div>
      </PageHeader>

      {/* Action Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-primary text-white border-0">
            <CardContent className="p-4 text-center">
              <Search className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Search</p>
              <p className="text-xs">Universities</p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-white border-0">
            <CardContent className="p-4 text-center">
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">My</p>
              <p className="text-xs">Applications</p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-white border-0">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Upcoming</p>
              <p className="text-xs">events</p>
            </CardContent>
          </Card>
        </div>

        {/* Book a Session Button */}
        <div className="w-full text-center">
          <BookingPopup />
        </div>
      </div>

      {/* Universities Section */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Universities</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">University of Tokyo</span>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
              >
                Apply
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  Aichi Bunkyo University
                </span>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
              >
                Apply
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* My Applications Section */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">My Applications</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Osaka University</span>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-4"
              >
                Complete
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Nagoya University</span>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-4"
              >
                Incomplete
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Events Section */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">Events</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-orange-100">
            <CardContent className="p-4">
              <div className="text-center mb-3">
                <div className="text-2xl font-bold text-primary">28</div>
                <div className="text-xs text-gray-600">APRIL</div>
              </div>
              <div className="mb-2">
                <img
                  src="/placeholder.svg?height=40&width=60"
                  alt="Event illustration"
                  width={60}
                  height={40}
                  className="mx-auto"
                />
              </div>
              <p className="text-xs font-medium mb-1">
                Your Career starts here
              </p>
              <p className="text-xs text-primary">Wed, Apr 28, 5:30PM</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="mb-3">
                <img
                  src="/placeholder.svg?height=60&width=80"
                  alt="Library books"
                  width={80}
                  height={60}
                  className="w-full rounded"
                />
              </div>
              <p className="text-xs font-medium mb-1">
                Your Career starts here
              </p>
              <p className="text-xs text-primary">Wed, Apr 28, 5:30PM</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
