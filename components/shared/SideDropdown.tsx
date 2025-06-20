"use client";

import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store/kanbanStore";
import { deleteProjectById } from "@/lib/actions/projects.actions";
import { toast } from "sonner";

const SideDropdown = ({
  label,
  data,
}: {
  label: string;
  data: projectType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { project, setProject } = useStore();

  useEffect(() => {
    setProject(data[0]);
  }, []);

  const toggleState = () => {
    setIsOpen((prev) => !prev);
  };

  const isActive = (item: projectType) => {
    return item.title === project?.title;
  };

  const deleteProject = async (id: string) => {
    try {
      const isDeleted = await deleteProjectById(id);

      if (!isDeleted) return toast.error("Failed. Try again.");

      toast.success("Project deleted");
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div
        onClick={toggleState}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-xl flex-between cursor-pointer"
      >
        <p
          className={cn(
            "text-base font-semibold text-foreground-light dark:text-gray-light transition-all",
            {
              "font-bold text-foreground dark:text-foreground": isOpen,
            }
          )}
        >
          {label}
        </p>
        {isOpen ? (
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
      {isOpen && (
        <div className="px-3 flex flex-col animate-in">
          <div className="flex items-center">
            <div className="h-6 border border-gray dark:border-gray-700" />
            <div className="w-[24px] border border-gray dark:border-gray-700" />
            <div className="py-1 px-5 rounded-full ml-2">
              <p className="text-foreground-light dark:text-gray-light font-exo font-semibold capitalize">
                All {label} ({data.length})
              </p>
            </div>
          </div>
          {data &&
            data.length > 0 &&
            data.map((item, idx) => (
              <div key={idx} className="flex items-center gap-5">
                <div className="flex items-center">
                  <div className="h-12 border border-gray dark:border-gray-700" />
                  <div className="w-[24px] border border-gray dark:border-gray-700" />
                  <div
                    onClick={() => setProject(item)}
                    className={cn(
                      "py-1 px-5 rounded-full ml-2 select-none cursor-pointer",
                      {
                        "bg-dark-1/4 dark:bg-foreground/4": isActive(item),
                      }
                    )}
                  >
                    <p
                      className={cn(
                        "text-foreground/50 font-exo font-semibold capitalize tansition-all",
                        {
                          "text-foreground font-bold": isActive(item),
                        }
                      )}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>

                <TrashIcon
                  size={20}
                  onClick={() => deleteProject(item._id as string)}
                  className="text-dark-3 dark:text-foreground/50 cursor-pointer"
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default SideDropdown;
