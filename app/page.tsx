import BoardMenu from "@/components/BoardMenu";
import Projects from "@/components/Projects";
import CreateProject from "@/components/shared/CreateProject";
import SideDropdown from "@/components/shared/SideDropdown";
import TasksBoard from "@/components/TasksBoard";
import ThemeSwitch from "@/components/ThemeSwitch";
import Topbar from "@/components/Topbar";
import { getAllProjects } from "@/lib/actions/projects.actions";

export default async function Home() {
  const projects = await getAllProjects("new-user-id");

  return (
    <section className="w-full flex bg-background/20 dark:bg-dark-3">
      <div className="w-[318px] h-screen px-7 py-8 bg-background dark:bg-dark sticky top-0 left-10 shadow-2xl">
        <div className="flex-between mb-9">
          <h1 className="text-3xl font-bold dark:text-foreground">Projects</h1>
          <CreateProject />
        </div>

        <div className="flex flex-col gap-2">
          <SideDropdown label="Team" data={[]} />
          <Projects projects={projects} />
          <SideDropdown label="Reminders" data={[]} />
          <SideDropdown label="Messangers" data={[]} />
        </div>

        <div className="w-full px-7 absolute bottom-2 left-0">
          <ThemeSwitch />
        </div>
      </div>
      <div className="flex-1 p-6">
        <Topbar />
        <BoardMenu />
        <div className="w-full flex gap-2 mt-6">
          <TasksBoard />
        </div>
      </div>
    </section>
  );
}
