type Task = {
  _id: string;
  title: String;
  description: String;
  assignees: ObjectId;
  priority: String;
  progress: Number;
  status: String;
  createdAt: Date;
};

type projectType = {
  _id: String;
  title: String;
  createdBy: String;
  createdAt: Date;
  tasks: Task[];
  comments: [
    {
      _id: string;
      user: String;
      content: String;
    }
  ];
};
