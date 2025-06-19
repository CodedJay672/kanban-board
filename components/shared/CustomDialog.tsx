import React, { Dispatch } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";

const CustomDialog = ({
  title,
  open,
  toggleOpen,
  children,
}: {
  title: string;
  open: boolean;
  toggleOpen: Dispatch<boolean>;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogOverlay className="fixed inset-0 place-items-center grid bg-black/40 p-4">
        <DialogTitle className="hidden">{title}</DialogTitle>
        <DialogContent
          aria-describedby={undefined}
          className="w-full max-w-lg p-4 pb-12 border-none rounded-xl animate-in z-99"
        >
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default CustomDialog;
