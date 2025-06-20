"use client";

import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "./ui/button";
import {
  ListIcon,
  MessageSquareTextIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
} from "lucide-react";
import dayjs from "dayjs";
import { useStore } from "@/lib/store/kanbanStore";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteTask } from "@/lib/actions/tasks.action";
import { toast } from "sonner";
import CustomDialog from "./shared/CustomDialog";
import SubmitButton from "./shared/SubmitButton";
import CustomInput from "./shared/CustomInput";
import UpdateTaskForm from "./UpdateTaskForm";

const TaskCard = ({
  title,
  description,
  progress,
  status,
  createdAt,
  projectId,
  id,
  assignees,
}: {
  title: string;
  description: string;
  progress: number;
  status: string;
  createdAt: Date;
  projectId: string | undefined;
  id: string;
  assignees: string | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const { draggedId } = useStore();

  const formattedDate = dayjs(createdAt).format("DD MMM YYYY").toLowerCase();

  const { attributes, setNodeRef, listeners, transform } = useDraggable({
    id,
    disabled: open ? true : false,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleDelete = async () => {
    try {
      await deleteTask(projectId, id);

      toast.success("Task deleted.");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <article
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "w-full max-w-[320px] rounded-xl bg-background dark:bg-foreground/2 p-4 backdrop-blur-md select-none",
          {
            "shadow-2xl": draggedId === id,
          }
        )}
      >
        <div className="flex-between gap-4">
          <div>
            <h3 className="text-base font-bold text-foreground">{title}</h3>
            <p className="text-sm font-medium text-foreground/50">
              {description}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex-center size-7 rounded-full bg-gray dark:bg-transparent border border-gray-light cursor-pointer shrink-0">
                <MoreHorizontalIcon size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background dark:bg-dark-2 border-none"
            >
              <div>
                <DropdownMenuItem
                  asChild
                  className="text-sm text-foreground dark:text-foreground/80 w-full hover:bg-transparent dark:hover:bg-transparent cursor-pointer"
                >
                  <Button
                    variant="ghost"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => setOpen(true)}
                    className="w-full hover:bg-background/20 dark:hover:bg-foreground/10"
                  >
                    Edit
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-sm text-red-400 w-full hover:bg-transparent dark:hover:bg-transparent cursor-pointer"
                >
                  <Button
                    variant="ghost"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={handleDelete}
                    className="w-full hover:bg-background/20 dark:hover:bg-foreground/10"
                  >
                    Delete
                  </Button>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
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
              {status === "Done" ? 10 : Math.round(progress / 10)}/10
            </span>
          </div>
          <div className="w-full bg-foreground/10 mt-2.5 rounded-full">
            <div
              style={{
                width: status === "Done" ? "100%" : `${Math.round(progress)}%`,
              }}
              className={cn("bg-progress p-0.5 rounded-full transition-all", {
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
          <div className="flex items-center">
            {assignees ? (
              <div className="size-8 rounded-full border border-background/50 dark:border-dark-light bg-background/50 dark:bg-foreground/20 flex-center">
                <span className="text-sm text-foreground/50 dark:text-foreground/60 font-semibold">
                  {assignees[0]}
                </span>
              </div>
            ) : (
              <div className="flex-center gap-2">
                <span
                  onClick={() => console.log("hello world")}
                  className="text-sm flex-center gap-1.5 text-foreground/50 dark:text-foreground/50"
                >
                  <MessageSquareTextIcon size={14} /> 0
                </span>
                <span className="text-sm flex-center gap-1.5 text-foreground/50 dark:text-foreground/50">
                  <PaperclipIcon size={14} /> 0
                </span>
              </div>
            )}
          </div>
        </div>
      </article>

      <CustomDialog title="projects" open={open} toggleOpen={setOpen}>
        <UpdateTaskForm projectId={projectId} taskId={id} />
      </CustomDialog>
    </>
  );
};

export default TaskCard;
