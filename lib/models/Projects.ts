import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: String,
  createdBy: String,
  createdAt: Date,
  tasks: [
    {
      title: String,
      description: String,
      Assignees: String,
      progress: Number,
      status: {
        type: String,
        enum: ["ToDo", "InProgress", "Done"],
      },
    },
  ],
  comments: [
    {
      user: String,
      content: String,
    },
  ],
});

const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectSchema);
export default Projects;
