"use client";

import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import DropdownToggle from "./shared/DropdownToggle";
import { Button } from "./ui/button";
import { ListIcon, MoreHorizontalIcon } from "lucide-react";
import dayjs from "dayjs";
import { useStore } from "@/lib/store/kanbanStore";
import { cn } from "@/lib/utils";

const TaskCard = ({
  title,
  description,
  progress,
  status,
  createdAt,
  id,
}: {
  title: string;
  description: string;
  progress: number;
  status: string;
  createdAt: Date;
  id: string;
}) => {
  const [open, setOpen] = useState(false);
  const { draggedId } = useStore();

  const formattedDate = dayjs(createdAt).format("DD MMM YYYY").toLowerCase();

  const { attributes, setNodeRef, listeners, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "w-full max-w-[320px] rounded-xl bg-background dark:bg-foreground/2 p-4 backdrop-blur-md",
        {
          "shadow-2xl z-99": draggedId === id,
        }
      )}
    >
      <div className="flex-between">
        <div>
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          <p className="text-sm font-medium text-foreground/50">
            {description}
          </p>
        </div>
        <div className="relative">
          <div className="flex-center size-7 rounded-full bg-gray dark:bg-transparent border border-gray-light">
            <MoreHorizontalIcon size={16} />
          </div>
          <DropdownToggle open={open} onOpenChange={handleToggle}>
            <Button variant="ghost" className="">
              Edit
            </Button>
            <Button variant="ghost" className="">
              Delete
            </Button>
          </DropdownToggle>
        </div>
      </div>
      <div className="mt-5.5 mb-5">
        <div className="flex-between">
          <div className="flex gap-1 items-center">
            <ListIcon size={16} className="text-foreground/50" />{" "}
            <span className="text-sm font-semibold text-foreground/50">
              Progress
            </span>
          </div>
          <span className="text-sm text-foreground font-semibold">
            {progress}/10
          </span>
        </div>
        <div className="w-full bg-foreground/10 mt-2.5 rounded-full">
          <div
            style={{ width: status === "Done" ? "100px" : `${progress * 10}%` }}
            className={cn("bg-progress p-0.5 rounded-full", {
              "bg-done": status === "Done",
            })}
          />
        </div>
      </div>

      <div className="flex-between">
        <div className="py-2 px-4 rounded-full flex-center bg-gray-light/10 dark:bg-foreground/8">
          <p className="text-gray-light font-semibold text-sm capitalize">
            {formattedDate}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
