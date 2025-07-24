import NavigateBackArrowProps from "@/components/navigate-back-arrow";
import PageHeader from "@/components/page-header";
import PageWrapper from "@/components/page-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  GraduationCap,
  Globe,
  Building,
  Calendar,
  Tag,
  MapPin,
} from "lucide-react";
import type { University } from "@/feature/university/data/schema";

export function ApplicationDetail({ university }: { university: University }) {
  return (
    <PageWrapper>
      <PageHeader>
        <div className="flex items-center justify-start gap-10 p-4">
          <NavigateBackArrowProps to={"/university"} />
          <h1 className="text-lg font-semibold text-gray-900">
            {university.name}
          </h1>
          <div />
        </div>
      </PageHeader>

      {/* University Banner */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
          <img
            src={university.banner || "/assets/university-info.png"}
            alt={`${university.name} banner`}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        {/* University Logo */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 bg-white rounded-lg  border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <img
                src={university.logo || "/assets/university-logo.png"}
                alt={`${university.name} banner`}
                width={16}
                height={16}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>


      {/* Content */}
      <div className="p-4">
        {/* About Section */}
        <Card className=" shadow-none border-none">
          <CardContent className="p-0">
            {/* Section Header */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-primary border-b-2 border-pink-500 pb-1 inline-block">
                About
              </h2>
            </div>

            {/* Details List */}
            <div className="bg-muted pt-2 rounded-lg">
              {/* Pre-arrival Admission */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <Home className="h-5 w-5 text-primary" />
                  <span className="text-secondary-foreground">
                    Pre-arrival Admission :
                  </span>
                </div>
                <span className="text-primary font-medium capitalize">
                  {university.prearrivalAdmission}
                </span>
              </div>

              {/* Degree Type */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-secondary-foreground">
                    Degree Type:
                  </span>
                </div>
                <span className="text-primary font-medium">
                  {university.degreeType}
                </span>
              </div>

              {/* Medium of Instructions */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-secondary-foreground">
                    Medium of Instructions:
                  </span>
                </div>
                <span className="text-primary font-medium">
                  {university.mediumOfInstructions}
                </span>
              </div>

              {/* University Type */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="text-secondary-foreground">
                    University Type:
                  </span>
                </div>
                <span className="text-primary font-medium">
                  {university.universityType}
                </span>
              </div>

              {/* Begins at */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-secondary-foreground">Begins at:</span>
                </div>
                <span className="text-primary font-medium">
                  {university.beginsAt}
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <Tag className="h-5 w-5 text-primary" />
                  <span className="text-secondary-foreground">Category:</span>
                </div>
                <span className="text-primary font-medium">
                  {university.category}
                </span>
              </div>

              {/* Subcategory */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-secondary-foreground">
                    Subcategory :
                  </span>
                </div>
                <span className="text-primary font-medium">
                  {university.subcategory}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>);
}
