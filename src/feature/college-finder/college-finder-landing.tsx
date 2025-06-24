import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { GraduationCap, Search, UserPen } from "lucide-react";

export function CollegeFinderLanding() {
  return (
    <PageWrapper>
      <PageHeader>
        <div className="bg-background">
          <div className="flex items-center justify-start p-4 gap-6">
            <header className="block md:hidden">
              <SidebarTrigger className="lg:hidden text-primary" />
            </header>
            <PageTitle title="Find Universities" />
            <div className="w-6" /> {/* Spacer */}
          </div>
        </div>
      </PageHeader>

      {/* Main Content */}
      <div className="px-6 flex flex-col gap-10 h-full pb-8 ">
        {/* Thank You Message */}
        <Card className="bg-white border-none shadow-none">
          <CardContent className="p-6 text-center flex flex-col gap-1 items-center justify-center">
            <h2 className=" font-semibold text-gray-900">
              Thank you for sharing your information!
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Want to get results faster? Complete your profile once and the
              College Finder auto-fills the steps forever!
            </p>
            <Button variant="link" className=" font-medium p-0">
              Complete Profile
            </Button>

            {/* Profile Icon */}
            <svg
              width="26"
              height="19"
              viewBox="0 0 26 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.52083 9.52695C12.2825 9.52717 14.5206 7.49533 14.5204 4.98811C14.5202 2.48089 12.2817 0.448688 9.52002 0.448464C6.7583 0.44824 4.5202 2.48008 4.52042 4.9873C4.52065 7.49452 6.75911 9.52673 9.52083 9.52695ZM13.0209 10.662L12.3686 10.662C11.5014 11.0236 10.5366 11.2292 9.52098 11.2292C8.50536 11.2291 7.5444 11.0233 6.67328 10.6615L6.02093 10.6615C3.12249 10.6612 0.771123 12.7959 0.771358 15.4273L0.77149 16.9025C0.771574 17.8423 1.61149 18.6048 2.64664 18.6049L13.3849 18.6058C13.2912 18.3646 13.2521 18.1093 13.2833 17.8504L13.5487 15.6907L13.5956 15.2971L13.9041 15.017L16.9234 12.2759C15.9663 11.2935 14.5795 10.6622 13.0209 10.662ZM14.7909 15.8149L14.5255 17.9781C14.4826 18.3399 14.8185 18.6449 15.213 18.6024L17.5919 18.3614L22.9782 13.4715L20.1772 10.9286L14.7909 15.8149ZM25.4974 9.98572L24.0168 8.64156C23.6535 8.31172 23.0598 8.31167 22.6965 8.64145L21.2201 9.98182L21.0599 10.1272L23.8649 12.6701L25.4975 11.1879C25.8608 10.8546 25.8607 10.3191 25.4974 9.98572Z"
                fill="#3D2359"
              />
            </svg>
          </CardContent>
        </Card>

        {/* Main Feature */}
        <div className="text-center flex flex-col justify-center items-center gap-6">
          {/* Graduation Cap with Magnifying Glass Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src="/assets/find-university.png"
                  alt="Find University Icon"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Feature Text */}
          <div className="space-y-4 w-2/3 md:max-w-1/3">
            <h3 className="font-semibold text-gray-900">
              Find universities that fit you better than a tailored suit!
            </h3>
            <p className="text-gray-600 text-sm">
              Delivering results with our unique algorithm
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="pt-8 w-full text-center">
          <Button asChild className="w-full h-12 md:max-w-1/3 py-4">
            <Link to="/university">Get Started</Link>
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
