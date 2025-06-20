"use server";

import { revalidatePath } from "next/cache";
import Projects from "../models/Projects";
import { connectDB } from "../mongo-db/Db";
import { cache } from "react";

export const createTask = async (
  data: Partial<Task>,
  status: string,
  projectId?: string
) => {
  if (!projectId) return false;
  try {
    connectDB();

    const project = await Projects.findById(projectId).exec();

    if (!project) return false;

    // update the project tasks
    project.tasks = [
      ...project.tasks,
      {
        ...data,
        progress: 0,
        priority: data.priority,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await project.save();

    revalidatePath("/", "page");
    return true;
  } catch (error) {
    throw error;
  }
};

export const getTask = cache(async (id: string, projectId?: string) => {
  try {
    if (!projectId) throw new Error("No projectId.");

    const project = (await Projects.findById(projectId).exec()) as projectType;

    if (!project) throw new Error("Project not found.");

    const task = project.tasks.find((item) => item._id.toString() === id);

    if (!task) throw new Error("Task not found.");

    return JSON.parse(JSON.stringify(task)) as Task;
  } catch (error) {
    throw error;
  }
});

export const deleteTask = async (projectId?: string, taskId?: string) => {
  try {
    if (!projectId || !taskId) return;

    connectDB();

    const project = await Projects.findById(projectId).exec();

    if (!project) throw new Error("Project not found");

    //filter the tasks to remove the deleted task
    const tasks = project.tasks.filter(
      (item: Task) => item._id.toString() !== taskId
    ) as Task[];

    project.tasks = tasks;
    await project.save();

    revalidatePath("/", "page");
  } catch (error) {
    throw error;
  }
};

export const updateTaskDetails = async (
  taskId: string,
  data: Pick<
    Task,
    | "title"
    | "description"
    | "assignees"
    | "priority"
    | "progress"
    | "updatedAt"
  >,
  projectId?: string
) => {
  try {
    connectDB();

    const project = await Projects.findById(projectId).exec();

    if (!project) throw new Error("Project not found.");

    const newTasks = project.tasks.map((item: Task) =>
      item._id.toString() === taskId ? { ...item, ...data } : item
    );

    project.tasks = newTasks;
    await project.save();

    revalidatePath("/", "page");
  } catch (error) {
    throw error;
  }
};
