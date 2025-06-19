"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TProjectState {
  project: projectType | null;
  setProject: (data: projectType) => void;
  draggedId: string;
  setDraggedId: (t: string) => void;
}

export const useStore = create<TProjectState>()(
  devtools(
    persist(
      (set) => ({
        project: null,
        setProject: (data) =>
          set(() => ({
            project: data,
          })),

        draggedId: "",
        setDraggedId: (data) => set(() => ({ draggedId: data })),
      }),
      {
        name: "kanban",
        partialize: (state) => ({ project: state.project }),
      }
    )
  )
);
