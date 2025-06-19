"use server";

import { revalidatePath } from "next/cache";
import Projects from "../models/Projects";
import { connectDB } from "../mongo-db/Db";

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

export async function getAllProjects(userId: string) {
  try {
    connectDB();

    const projects = await Projects.find({ createdBy: userId }).exec();

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    throw error;
  }
}
