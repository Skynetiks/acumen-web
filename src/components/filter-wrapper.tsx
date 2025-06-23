"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@uidotdev/usehooks";
import type { ReactNode } from "react";
import { ListFilter } from "lucide-react";

interface ResponsiveFilterWrapperProps {
  modalTitle?: string;
  children: ReactNode;
  onReset?: () => void;
  onSubmit?: () => void;
  formId?: string; // ✅ allow native form connection
}

export function ResponsiveFilterWrapper({
  modalTitle,
  children,
  onReset,
  onSubmit,
  formId,
}: ResponsiveFilterWrapperProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const TriggerButton = (
    <Button className="p-2 rounded-full flex items-center">
      <span className="p-1 bg-white rounded-full">
        <ListFilter className="h-4 w-4 text-primary" strokeWidth={3} />
      </span>
      <span>Filters&nbsp;</span>
    </Button>
  );

  const ActionButtons = (
    <div className="flex gap-4 pt-4 px-6 md:justify-end">
      <div className="flex-1 flex items-center justify-center">
        <Button
          type="reset"
          form={formId}
          variant="outline"
          className="rounded-full h-10 w-full border-gray-300 text-gray-600 font-semibold"
          onClick={onReset}
        >
          RESET
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Button
          type="submit"
          form={formId}
          variant="default"
          className="rounded-full w-full h-10"
          onClick={onSubmit}
        >
          APPLY
        </Button>
      </div>
    </div>
  );

  const Content = (
    <>
      <div className="px-6 pb-6 overflow-y-auto">{children}</div>
      {ActionButtons}
    </>
  );

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        <DialogContent className="max-w-xl p-4 py-8 border-0 rounded-2xl">
          <DialogTitle>{modalTitle || "Filters"}</DialogTitle>
          <div className="py-4">{Content}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="!max-h-[90vh] rounded-t-3xl border-0 p-4">
        <DrawerTitle className="pb-4">{modalTitle || "Filters"}</DrawerTitle>
        <div className="py-4">{Content}</div>
      </DrawerContent>
    </Drawer>
  );
}
