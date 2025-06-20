"use client";

import { getTask, updateTaskDetails } from "@/lib/actions/tasks.action";
import React, { useEffect, useState } from "react";
import CustomInput from "./shared/CustomInput";
import SubmitButton from "./shared/SubmitButton";

const UpdateTaskForm = ({
  projectId,
  taskId,
}: {
  projectId: string | undefined;
  taskId: string;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignees, setAssignees] = useState("");
  const [priority, setPriority] = useState("");
  const [progress, setProgress] = useState("");

  useEffect(() => {
    const getTaskById = async () => {
      const task = await getTask(taskId, projectId);

      if (!task) return null;

      setTitle(task?.title as string);
      setDescription((task?.description as string) ?? "");
      setAssignees((task?.assignees as string) ?? "");
      setPriority((task?.priority as string) ?? "");
      setProgress(task?.progress.toString() ?? "");
    };

    getTaskById();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await updateTaskDetails(
        taskId,
        {
          title,
          description,
          assignees,
          priority,
          progress: parseInt(progress),
          updatedAt: new Date(),
        },
        projectId
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <CustomInput
        label="Title"
        id="title"
        name="title"
        value={title}
        setValue={setTitle}
      />

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="description"
          className="text-base text-foreground dark:text-gray-light font-medium"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this task"
          className="w-full p-3 border border-gray text-foreground dark:text-foreground/80 dark:border-gray-light outline-none rounded-lg resize-none"
        />
      </div>

      <div className="flex-between gap-3 mb-10">
        <CustomInput
          id="assignees"
          name="assignees"
          label="Assignees"
          value={assignees}
          setValue={setAssignees}
        />

        <div className="w-full flex flex-col space-y-2">
          <label
            htmlFor="priority"
            className="text-base text-foreground dark:text-gray-light font-medium"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled
            className="p-3 border border-gray bg-background dark:bg-background/80"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <CustomInput
          label="Progress"
          id="progress"
          name="progress"
          value={progress}
          setValue={setProgress}
        />
      </div>

      <SubmitButton label="Update Task" />
    </form>
  );
};

export default UpdateTaskForm;
