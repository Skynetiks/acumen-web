import { Search, FileText, Calendar, Bell, Building2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageWrapper from "@/components/page-wrapper";
import type { DashboardDataType } from "./data/schema";
import { Link } from "@tanstack/react-router";
import PageTitle from "@/components/page-title";
import PageHeader from "@/components/page-header";
import BookingPopup from "../booking/booking-popup";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { format } from "date-fns";

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
            <header className="block md:hidden">
              <SidebarTrigger className="lg:hidden text-primary" />
            </header>
            <PageTitle title="Welcome, Ankur !" />
          </div>
          <Link
            to="/notification"
            className={cn(buttonVariants({ variant: "ghost" }), "text-primary")}
          >
            <Bell className="w-6 h-6" />
          </Link>
        </div>
      </PageHeader>

      {/* Action Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-primary text-white border-0">
            <CardContent className="p-0 text-center">
              <Link to="/university">
                <Search className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs">Search</p>
                <p className="text-xs">Universities</p>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-primary text-white border-0">
            <CardContent className="p-0 text-center">
              <Link to="/application">
                <FileText className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs">My</p>
                <p className="text-xs">Applications</p>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-primary text-white border-0">
            <CardContent className="p-0 text-center">
              <Link to="/events">
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs">Upcoming</p>
                <p className="text-xs">events</p>
              </Link>
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
          {data.universities.map((university, i) => {
            return (
              <Card key={i}>
                <CardContent className="p-4 flex flex-col gap-4 justify-between items-center">
                  <div className="flex items-start gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">
                      {university.name}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                  >
                    <Link
                      to="/university/$universityId"
                      params={{ universityId: university.id }}
                    >
                      Apply
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* My Applications Section */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">My Applications</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.applications.map((application, i) => {
            return (
              <Card key={i}>
                <CardContent className="p-4  flex flex-col gap-4 justify-between items-center">
                  <div className="flex items-start gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">
                      {application.name}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-4"
                    asChild
                  >
                    <Link
                      to="/application/$applicationId"
                      params={{ applicationId: application.id }}
                    >
                      {i % 2 !== 0 ? "incomplete" : "Complete"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Events Section */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">Events</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.events.map((event, i) => {
            const date = new Date(event.date);
            return (
              <Card key={i} className="border-none shadow-none">
                <CardContent className=" relative p-0">
                  <Link to="/events/$eventId" params={{ eventId: event.id }}>
                    <div className="absolute left-2 top-1 text-center p-1 bg-white/80 rounded-2xl px-2">
                      <div className="text-md font-bold text-primary">
                        {format(date, "dd")}
                      </div>
                      <div className="text-[10px] text-primary">
                        {format(date, "MMM")}
                      </div>
                    </div>
                    <div className="mb-2">
                      <img
                        src={`${event.image}`}
                        alt="Event illustration"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-medium mb-1">{event.title}</p>
                    <p className="text-xs text-primary">
                      {format(date, "EEE, MMM d - h:mm a")}
                    </p>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
