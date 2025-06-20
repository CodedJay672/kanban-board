"use server";

import { revalidatePath } from "next/cache";
import Projects from "../models/Projects";
import { connectDB } from "../mongo-db/Db";
import { cache } from "react";

export async function createProject(projectTitle: string) {
  try {
    connectDB();

    const project = new Projects({
      title: projectTitle,
      createdBy: "new-user-id",
      createdAt: new Date(),
    });

    await project.save();

    revalidatePath("/");
  } catch (error) {
    throw error;
  }
}

export const getAllProjects = cache(async (userId: string) => {
  try {
    connectDB();

    const projects = await Projects.find({ createdBy: userId }).exec();

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    throw error;
  }
});

export const deleteProjectById = async (projectId: string) => {
  try {
    connectDB();

    const res = (await Projects.findByIdAndDelete(
      projectId
    ).exec()) as projectType;

    if (!res) throw new Error("Failed to delete");

    revalidatePath("/");
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    throw error;
  }
};
