import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
  department: boolean;
  designation: boolean;
  shift: boolean;
}

interface WorkspaceState {
  workspaceName: string;
  progress: ProgressState;
  setWorkspaceName: (name: string) => void;
  clearWorkspace: () => void;
  setStepComplete: (key: keyof ProgressState, complete?: boolean) => void;
  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    set => ({
      workspaceName: '',
      progress: {
        department: false,
        designation: false,
        shift: false,
      },
      setWorkspaceName: (name: string) => set({ workspaceName: name }),
      clearWorkspace: () => set({ workspaceName: '' }),
      setStepComplete: (key, complete = true) =>
        set(state => ({
          progress: { ...state.progress, [key]: complete },
        })),
      reset: () =>
        set({
          workspaceName: '',
          progress: { department: false, designation: false, shift: false },
        }),
    }),
    {
      name: 'ems_workspace', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        workspaceName: state.workspaceName,
        progress: state.progress,
      }), // only persist what we need
    }
  )
);
