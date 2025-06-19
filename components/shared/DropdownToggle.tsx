import React from "react";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";

const DropdownToggle = ({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownToggle;
