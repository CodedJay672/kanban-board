"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import CustomDialog from "./CustomDialog";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";
import { createTask } from "@/lib/actions/tasks.action";
import { toast } from "sonner";

const AddButton = ({
  label,
  status,
  project,
}: {
  label: string;
  project: string;
  status: string;
}) => {
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const data = Object.fromEntries(formData.entries());

      const isUpdated = await createTask(data, status, project);

      if (!isUpdated) return toast.error("Failed to create task.");

      toast.success("Task created!!");
      setOpen(false);
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="ml-3 space-x-2 font-semibold hover:bg-transparent cursor-pointer dark:hover:bg-transparent"
      >
        <div className="size-6 flex-center rounded-full bg-foreground/8 dark:bg-foreground/10">
          <PlusIcon />
        </div>
        {label}
      </Button>
      <CustomDialog title="Add a task" open={open} toggleOpen={setOpen}>
        <div className="w-full bg-background/10 dark:bg-foregound-light">
          <h2 className="text-xl font-bold text-foreground dark:text-foreground">
            New Task
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <CustomInput id="title" name="title" label="Title" />

            <CustomInput id="assignees" name="assignees" label="Assignees" />

            <div className="flex flex-col gap-3">
              <label
                htmlFor="description"
                className="text-base text-foreground dark:text-gray-light font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Simple task description..."
                rows={6}
                className="w-full p-3 border border-gray text-foreground dark:text-foreground/80 dark:border-gray-light outline-none rounded-lg resize-none"
              />
            </div>

            <SubmitButton label="Create Task" />
          </form>
        </div>
      </CustomDialog>
    </>
  );
};

export default AddButton;
