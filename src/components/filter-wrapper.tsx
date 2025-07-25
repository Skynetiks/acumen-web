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
import { useState, type ReactNode } from "react";
import { ListFilter } from "lucide-react";

interface ResponsiveFilterWrapperProps {
  modalTitle?: string;
  children: ReactNode;
  formId?: string; // ✅ allow native form connection
}

export function ResponsiveFilterWrapper({
  modalTitle,
  children,
  formId,
}: ResponsiveFilterWrapperProps) {
  const [open, setOpen] = useState(false);
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
    <div className="flex gap-4 px-6 bg-background">
      <div className="flex-1 flex items-center justify-center">
        <Button
          type="reset"
          form={formId}
          variant="outline"
          className="rounded-full h-10 w-full border-gray-300 text-gray-600 font-semibold"
          onClick={() => {
            setOpen(false);
          }}
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
          onClick={() => {
            setOpen(false);
          }}
        >
          APPLY
        </Button>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        <DialogContent className="max-w-xl p-4 py-8 border-0 rounded-2xl max-h-[90dvh] flex flex-col">
          <DialogTitle className="shrink-0">
            {modalTitle || "Filters"}
          </DialogTitle>
          <div className="flex-1 flex flex-col pt-6 py-2 gap-6 min-h-0">
            <div className="flex-1 px-6 overflow-y-auto min-h-0">
              {children}
            </div>
            <div className="shrink-0">{ActionButtons}</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="!max-h-[90vh] rounded-t-full border-0">
        <div className="px-6">
          <DrawerTitle>{modalTitle || "Filters"}</DrawerTitle>
        </div>
        <div
          className="px-6 pt-8 py-4 overflow-y-auto"
          style={{ maxHeight: "calc(90dvh - 200px)" }}
        >
          {children}
        </div>
        <div className="py-4">{ActionButtons}</div>
      </DrawerContent>
    </Drawer>
  );
}
