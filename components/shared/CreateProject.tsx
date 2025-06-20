"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import CustomDialog from "./CustomDialog";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";
import { createProject } from "@/lib/actions/projects.actions";
import { toast } from "sonner";

const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");

    try {
      await createProject(title as string);

      setOpen(false);
      toast.success("New project created");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="size-7 rounded-full bg-gray dark:bg-white/8 text-dark-1"
      >
        <PlusIcon size={8} className="text-dark-3 dark:text-gray-light" />
      </Button>

      <CustomDialog title="projects" open={open} toggleOpen={setOpen}>
        <div className="w-full bg-background/10 dark:bg-foregound-light">
          <h2 className="text-xl font-bold text-foreground dark:text-foreground">
            New project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <CustomInput
              id="title"
              name="title"
              label="Project title"
              value={title}
              setValue={setTitle}
            />

            <SubmitButton label="Create Project" />
          </form>
        </div>
      </CustomDialog>
    </>
  );
};

export default CreateProject;
