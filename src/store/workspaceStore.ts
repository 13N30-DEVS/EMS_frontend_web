import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WorkspaceState {
  workspaceName: string;
  setWorkspaceName: (name: string) => void;
  clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaceName: "",
      setWorkspaceName: (name: string) => set({ workspaceName: name }),
      clearWorkspace: () => set({ workspaceName: "" }),
    }),
    {
      name: "ems_workspace", // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ workspaceName: state.workspaceName }),
    }
  )
);
