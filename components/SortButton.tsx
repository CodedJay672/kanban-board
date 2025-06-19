"use client";

import React, { useState } from "react";
import DropdownToggle from "./shared/DropdownToggle";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

const SortButton = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("asc");

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div onClick={handleToggle} className="flex items-center gap-3">
        <span className="text-base font-exo font-semibold text-gray-light select-none">
          Sort
        </span>
        <div className="flex-center size-7 rounded-full bg-gray dark:bg-transparent border border-gray-light">
          <MoreHorizontalIcon size={16} />
        </div>
      </div>

      <DropdownToggle open={open} onOpenChange={handleToggle}>
        <DropdownMenuItem>Asc</DropdownMenuItem>
        <DropdownMenuItem>Desc</DropdownMenuItem>
      </DropdownToggle>
    </>
  );
};

export default SortButton;
