"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  Building,
  FileText,
  Clock,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ApplicationDetailPageProps {
  params: {
    id: string;
  };
}

const mockApplicationData = {
  "tokyo-eng": {
    university: "University of Tokyo",
    program: "Engineering",
    degree: "Masters",
    date: "28 April 2025",
    status: "Under Review",
    documents: [
      { name: "Passport.pdf", status: "Verified" },
      { name: "12th Transcript.pdf", status: "Verified" },
      { name: "degree_certificate.pdf", status: "Pending" },
      { name: "Statement of Purpose.pdf", status: "Verified" },
      { name: "Letter of Recommendation1.pdf", status: "Verified" },
    ],
    timeline: [
      { date: "15 March 2025", event: "Application Submitted" },
      { date: "18 March 2025", event: "Documents Verified" },
      { date: "20 March 2025", event: "Under Review" },
      { date: "Expected: 15 April 2025", event: "Interview" },
      { date: "Expected: 25 April 2025", event: "Final Decision" },
    ],
  },
  "kyoto-nat": {
    university: "Kyoto University",
    program: "Natural Sciences",
    degree: "PhD",
    date: "30 May 2025",
    status: "Documents Pending",
    documents: [
      { name: "Passport.pdf", status: "Verified" },
      { name: "12th Transcript.pdf", status: "Pending" },
      { name: "degree_certificate.pdf", status: "Not Uploaded" },
      { name: "Statement of Purpose.pdf", status: "Verified" },
    ],
    timeline: [
      { date: "10 March 2025", event: "Application Submitted" },
      { date: "Pending", event: "Documents Verification" },
      { date: "Expected: 15 April 2025", event: "Under Review" },
      { date: "Expected: 30 April 2025", event: "Interview" },
    ],
  },
};

export default function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const applicationId = params.id;
  const application =
    mockApplicationData[applicationId as keyof typeof mockApplicationData] ||
    mockApplicationData["tokyo-eng"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Not Uploaded":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Link to="/applications">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold">{application.university}</h1>
      </div>

      {/* Application Status */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Application Status</h2>
            <Badge className="bg-primary">{application.status}</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground text-sm">Program</p>
                <p>
                  {application.program} ({application.degree})
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground text-sm">Start Date</p>
                <p>{application.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground text-sm">University</p>
                <p>{application.university}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="font-medium mb-4">Documents</h2>

          <div className="space-y-3">
            {application.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <p>{doc.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(doc.status)}`}
                  ></div>
                  <span className="text-sm text-muted-foreground">
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-medium mb-4">Application Timeline</h2>

          <div className="space-y-4">
            {application.timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p>{item.event}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
          Contact Admission Officer
        </Button>
        <Button
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/5"
        >
          Upload Missing Documents
        </Button>
      </div>
    </div>
  );
}
