import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
  department: boolean;
  designation: boolean;
  shift: boolean;
  validationErrors: Record<string, string | undefined>;
  isLoading: boolean;
  error: string | null;
}

interface WorkspaceState {
  workspaceName: string;
  progress: ProgressState;
  setWorkspaceName: (name: string) => void;
  clearWorkspace: () => void;
  setStepComplete: (
    key: keyof Omit<ProgressState, 'validationErrors' | 'isLoading' | 'error'>,
    complete?: boolean
  ) => void;
  setValidationError: (field: string, error?: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
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
        validationErrors: {},
        isLoading: false,
        error: null,
      },
      setWorkspaceName: (name: string) => set({ workspaceName: name }),
      clearWorkspace: () => set({ workspaceName: '' }),
      setStepComplete: (key, complete = true) =>
        set(state => ({
          progress: { ...state.progress, [key]: complete },
        })),
      setValidationError: (field, error) =>
        set(state => ({
          progress: {
            ...state.progress,
            validationErrors: {
              ...state.progress.validationErrors,
              [field]: error,
            },
          },
        })),
      setLoading: (loading: boolean) =>
        set(state => ({
          progress: { ...state.progress, isLoading: loading },
        })),
      setError: (error: string | null) =>
        set(state => ({
          progress: { ...state.progress, error },
        })),
      reset: () =>
        set({
          workspaceName: '',
          progress: {
            department: false,
            designation: false,
            shift: false,
            validationErrors: {},
            isLoading: false,
            error: null,
          },
        }),
    }),
    {
      name: 'ems_workspace',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        workspaceName: state.workspaceName,
        progress: {
          department: state.progress.department,
          designation: state.progress.designation,
          shift: state.progress.shift,
          validationErrors: state.progress.validationErrors,
          isLoading: state.progress.isLoading,
          error: state.progress.error,
        },
      }),
    }
  )
);
