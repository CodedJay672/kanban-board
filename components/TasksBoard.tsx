"use client";

import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import ToDoTasks from "./ToDoTasks";
import { useStore } from "@/lib/store/kanbanStore";

const TasksBoard = () => {
  const { project, setProject } = useStore();
  const [client, setClient] = useState(false);
  const { setDraggedId } = useStore();

  useEffect(() => {
    if (!client) return;

    setClient(true);
  }, []);

  const handleDragStart = (event: any) => {
    setDraggedId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedId("");

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as String;

    setProject({
      ...project,
      // @ts-ignore
      tasks: project?.tasks.map((task) =>
        task._id === activeId ? { ...task, status: over.id } : task
      ),
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <ToDoTasks project={project} />
    </DndContext>
  );
};

export default TasksBoard;
