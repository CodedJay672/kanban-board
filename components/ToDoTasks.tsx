"use client";

import React, { useEffect, useState } from "react";
import Column from "./Column";
import { COLUMNS } from "@/constant";

const ToDoTasks = ({ project }: { project: projectType | null }) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    if (!client) return;

    setClient(true);
  }, [client]);

  return (
    <section className="w-full rounded-xl flex justify-between gap-3 overflow-hidden min-h-[calc(100vh-125px)]">
      {COLUMNS.map((column) => (
        <Column
          key={column.id}
          projectId={project?._id as string}
          tasks={project?.tasks.filter((item) => item.status === column.id)}
          id={column.id}
          title={column.title}
        />
      ))}
    </section>
  );
};

export default ToDoTasks;
