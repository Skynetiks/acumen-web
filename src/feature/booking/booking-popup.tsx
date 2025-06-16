"use client";

import { Calendar, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BookingPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="max-w-max rounded-full border-primary text-primary hover:bg-primary hover:text-white mb-8"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book a Session
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm mx-auto rounded-2xl border-0 p-8">
        <div className="text-center py-10">
          <p className="text-lg font-medium leading-relaxed text-gray-900">
            Your booking request has been accepted. We will get back to you
            shortly.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
