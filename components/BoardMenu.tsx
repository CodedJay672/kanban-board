import React from "react";
import { Button } from "./ui/button";
import { LayoutGridIcon } from "lucide-react";
import AddButton from "./shared/AddButton";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import DropdownToggle from "./shared/DropdownToggle";
import Link from "next/link";

const BoardMenu = () => {
  return (
    <div className="w-full flex-between border-b border-gray dark:border-gray-3 mt-3">
      <div className="flex-center gap-2">
        <Button
          variant="ghost"
          className="text-foreground dark:text-foreground font-exo font-bold py-6 px-4 border-b border-foreground dark:border-foreground rounded-none"
        >
          <LayoutGridIcon /> Board view
        </Button>

        <AddButton label="Add view" />
      </div>

      <div className="flex-center gap-3">
        <FilterButton />
        <SortButton />
        <Link
          href="/new-template"
          className="text-background bg-foreground dark:text-foreground dark:bg-accent px-4 py-2 rounded-full font-exo"
        >
          New Template
        </Link>
      </div>
    </div>
  );
};

export default BoardMenu;
