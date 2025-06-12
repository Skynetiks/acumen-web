"use client";

import { FormRenderer } from "@/components/form-builder/form-renderer";
import { useEffect, useState } from "react";
import { collegeApplicationConfig } from "./config/college-application.config";

interface ApplyPageProps {
  params: {
    universityId: string;
  };
}

// Mock function to get user's saved profile data
const getUserProfileData = async () => {
  // In real app, this would fetch from API/localStorage
  return {
    personalDetails: {
      dateOfBirth: "1995-06-15",
      nationality: "indian",
      gender: "male",
      familyBackground: "business",
      academicBackground: "bachelors",
      languageProficiency: "ielts",
    },
    studyPreferences: {
      preferredLevelOfStudy: "graduate",
      preferredYearOfAdmission: "2025",
      preferredIntake: ["fall", "spring"],
    },
    coursePreferences: {
      coursePreferences: ["engineering", "natural-science"],
      courseSearch: "Computer Science",
    },
    whyJapan: {
      whyJapan: ["world-class-education", "career-development"],
    },
    contactPreferences: {
      contactTime: ["morning", "afternoon"],
      contactMethod: ["email", "whatsapp"],
    },
    stayConnected: {
      hearAboutUs: ["social-media", "website"],
    },
    documentUpload: {
      documents: ["passport", "transcript", "degree", "sop", "lor1", "lor2"],
    },
  };
};

export default function ApplyPage({ params }: ApplyPageProps) {
  const [initialData, setInitialData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUserProfileData();
        setInitialData(userData);
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Create university-specific config
  const universityConfig = {
    ...collegeApplicationConfig,
    id: `college-application-${params.universityId}`,
    title: `Apply to University`,
    onComplete: async (data: Record<string, any>) => {
      console.log(`Application to ${params.universityId} completed:`, data);
      // Submit application to specific university
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  };

  return <FormRenderer config={universityConfig} initialData={initialData} />;
}
