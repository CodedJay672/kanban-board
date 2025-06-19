"use server";

import { revalidatePath } from "next/cache";
import Projects from "../models/Projects";
import { connectDB } from "../mongo-db/Db";

export const createTask = async (
  data: Partial<Task>,
  status: string,
  projectId?: String
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
        status,
        createdAt: new Date(),
      },
    ];
    await project.save();

    revalidatePath("/");
    return true;
  } catch (error) {
    throw error;
  }
};

export const updateTaskStatus = async (taskId: string, newStatus: string) => {
  try {
    connectDB();

    const task = await Projects.findById(taskId).exec();
  } catch (error) {
    throw error;
  }
};
