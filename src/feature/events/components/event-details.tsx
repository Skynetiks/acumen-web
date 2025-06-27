import PageWrapper from "@/components/page-wrapper";
import PageHeader from "@/components/page-header";
import NavigateBackArrow from "@/components/navigate-back-arrow";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title";
import { Calendar, MapPin } from "lucide-react";
import type { EventType } from "../data/schema";
import { format } from "date-fns";

export default function EventDetails({
  event,
}: {
  event: EventType | undefined;
}) {
  return (
    <PageWrapper className="p-0">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={event?.image}
          alt={event?.title}
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />

        {/* Page Header */}
        <div className="absolute top-12 left-0 right-0 px-6 z-10">
          <PageHeader>
            <div className="flex items-center justify-between gap-4">
              <NavigateBackArrow to="/events" />
              <PageTitle title="Event Details" className="text-white text-xl" />
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-white text-sm font-medium">
                  {event?.id}
                </span>
              </div>
            </div>
          </PageHeader>
        </div>

        {/* CTA Button */}
        <div className="absolute -bottom-6 left-6 right-6 z-10">
          <Button className="w-full bg-white text-primary hover:bg-gray-50 rounded-full h-14 text-lg font-semibold shadow-lg">
            Interested
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-10 py-8 mt-8 bg-white rounded-t-3xl">
        <h2 className="text-[32px] font-bold mb-10 leading-tight text-gray-900">
          {event?.title}
        </h2>

        {/* Event Info */}
        <div className="space-y-8 mb-10">
          <EventInfoItem
            icon={<Calendar className="w-6 h-6 text-primary" />}
            title={format(new Date(event?.date || new Date()), "dd MMM, yyyy")}
            subtitle={format(
              new Date(event?.date || new Date()),
              "EEE, MMM d - h:mm a"
            )}
          />
          <EventInfoItem
            icon={<MapPin className="w-6 h-6 text-primary" />}
            title={event?.location || "Gala Convention Center"}
            subtitle={event?.location || "36 Bangalore"}
          />
          <EventInfoItem
            icon={
              <img
                src="/placeholder.svg?height=56&width=56"
                alt="Rohit Sharma"
                width={56}
                height={56}
                className="rounded-2xl object-cover"
              />
            }
            title="Rohit Sharma"
            subtitle="Organizer"
          />
        </div>

        {/* About */}
        <div>
          <h3 className="text-[22px] font-bold mb-4 text-gray-900">
            About Event
          </h3>
          <p className="text-gray-700 text-[17px] leading-relaxed">
            Enjoy your favorite dishe and a lovely
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

function EventInfoItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
        {icon}
      </div>
      <div className="pt-1">
        <p className="font-semibold text-[18px] text-gray-900 mb-1">{title}</p>
        <p className="text-gray-500 text-[15px]">{subtitle}</p>
      </div>
    </div>
  );
}
