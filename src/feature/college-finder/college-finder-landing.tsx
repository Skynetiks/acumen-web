import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import PageWrapper from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Menu, GraduationCap, Search } from "lucide-react";

export function CollegeFinderLanding() {
  return (
    <PageWrapper>
      <PageHeader>
        <div className="bg-background">
          <div className="flex items-center justify-start p-4 gap-6">
            <Menu className="h-6 w-6 text-primary" />
            <PageTitle title="Find Universities" />
            <div className="w-6" /> {/* Spacer */}
          </div>
        </div>
      </PageHeader>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Thank You Message */}
        <Card className="bg-white border-none shadow-none">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
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
            <div className="flex justify-center pt-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Feature */}
        <div className="text-center space-y-6">
          {/* Graduation Cap with Magnifying Glass Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Feature Text */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Find universities that fit you better than a tailored suit!
            </h3>
            <p className="text-gray-600">
              Delivering results with our unique algorithm
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="pt-8 w-full text-center">
          <Button asChild className="max-w-max py-4">
            <Link to="/universities">Get Started</Link>
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
