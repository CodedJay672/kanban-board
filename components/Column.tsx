"use client";

import React from "react";
import AddButton from "./shared/AddButton";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({
  projectId,
  tasks,
  id,
  title,
}: {
  projectId: string | undefined;
  tasks: Task[] | undefined;
  id: string;
  title: string;
}) => {
  const { setNodeRef: ref } = useDroppable({ id });

  return (
    <div className="w-full max-w-[352px] bg-dark-1/1 dark:bg-dark-2 py-4 px-3 border border-dashed border-foreground/8 rounded-xl flex-1 flex flex-col">
      <div className=" flex-between mb-4">
        <h3 className="text-sm font-bold text-foreground/50">
          {title} ({tasks?.length ?? 0})
        </h3>
        <AddButton
          project={(projectId as string) ?? ""}
          status={id}
          label="Add new task"
        />
      </div>
      <div ref={ref} className="space-y-6 flex-1">
        {tasks?.map((item) => (
          <TaskCard
            key={item._id}
            title={item.title as string}
            description={item.description as string}
            progress={item.progress as number}
            status={item.status as string}
            createdAt={item.createdAt}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
