import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: String,
  createdBy: String,
  createdAt: Date,
  tasks: [
    {
      title: String,
      description: String,
      assignees: String,
      priority: String,
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
