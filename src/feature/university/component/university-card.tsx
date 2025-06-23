import type { University } from "../data/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

function UniversityCard({ university }: { university: University }) {
  return (
    <Card key={university.id} className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {university.name.charAt(0)}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <h3 className="font-semibold text-gray-900">{university.name}</h3>

            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Course name</p>
                <p className="text-sm">{university.courseName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    University type
                  </p>
                  <p className="text-sm">{university.universityType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Begins at</p>
                  <p className="text-sm">{university.beginsAt}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link
                  to="/university/$universityId/apply"
                  params={{ universityId: university.id }}
                >
                  Apply Now
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link
                  to="/university/$universityId"
                  params={{ universityId: university.id }}
                >
                  View Detail
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UniversityCard;
