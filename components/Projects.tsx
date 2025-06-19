"use client";

import { useStore } from "@/lib/store/kanbanStore";
import SideDropdown from "./shared/SideDropdown";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Projects = ({ projects }: { projects: projectType[] }) => {
  const { project } = useStore();
  const [open, setOpen] = useState(false);

  const toggleState = () => {
    setOpen((prev) => !prev);
  };

  const count = (status: string) => {
    const result = project?.tasks.filter((item) => item.status === status);

    return result?.length;
  };

  return (
    <>
      <SideDropdown label="Projects" data={projects} />
      <div
        onClick={toggleState}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-xl flex-between cursor-pointer"
      >
        <p
          className={cn(
            "text-base font-semibold text-foreground-light dark:text-gray-light transition-all",
            {
              "font-bold text-foreground dark:text-foreground": open,
            }
          )}
        >
          Tasks
        </p>
        {open ? (
          <ChevronDownIcon
            size={16}
            className="text-foreground cursor-pointer"
          />
        ) : (
          <ChevronRightIcon
            size={16}
            onClick={toggleState}
            className="text-foreground-light dark:text-gray-light cursor-pointer"
          />
        )}
      </div>
      {open && (
        <div className="px-3 flex flex-col animate-in">
          <div className="flex items-center">
            <div className="h-6 border border-gray dark:border-gray-700" />
            <div className="w-[24px] border border-gray dark:border-gray-700" />
            <div className="py-1 px-5 rounded-full ml-2">
              <p className="text-foreground-light dark:text-gray-light font-exo font-semibold capitalize">
                All Tasks ({project?.tasks.length})
              </p>
            </div>
          </div>
          {project && (
            <>
              <div className="flex items-center">
                <div className="h-12 border border-gray dark:border-gray-700" />
                <div className="w-[24px] border border-gray dark:border-gray-700" />
                <div
                  className={cn(
                    "py-1 px-5 rounded-full ml-2 select-none cursor-pointer"
                  )}
                >
                  <p
                    className={cn(
                      "text-foreground/50 font-exo font-semibold capitalize tansition-all"
                    )}
                  >
                    To Dos ({count("ToDo")})
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 border border-gray dark:border-gray-700" />
                <div className="w-[24px] border border-gray dark:border-gray-700" />
                <div
                  className={cn(
                    "py-1 px-5 rounded-full ml-2 select-none cursor-pointer"
                  )}
                >
                  <p
                    className={cn(
                      "text-foreground/50 font-exo font-semibold capitalize tansition-all"
                    )}
                  >
                    In Progress ({count("InProgress")})
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 border border-gray dark:border-gray-700" />
                <div className="w-[24px] border border-gray dark:border-gray-700" />
                <div
                  className={cn(
                    "py-1 px-5 rounded-full ml-2 select-none cursor-pointer"
                  )}
                >
                  <p
                    className={cn(
                      "text-foreground/50 font-exo font-semibold capitalize tansition-all"
                    )}
                  >
                    Done ({count("Done")})
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Projects;
