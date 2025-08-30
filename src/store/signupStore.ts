import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// FormData type extended to hold all signup fields
export type FormData = {
  email: string;
  workspace: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
  logo: File | null;
};

interface SignupState {
  step: number; // current step in the signup flow
  data: Partial<FormData>;
  setStep: (step: number) => void;
  setData: (data: Partial<FormData>) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>()(
  persist(
    set => ({
      step: 1,
      data: {},
      setStep: (step: number) => set({ step }),
      setData: (data: Partial<FormData>) =>
        set(state => ({
          data: { ...state.data, ...data },
        })),
      reset: () => set({ step: 1, data: {} }),
    }),
    {
      name: 'signup-storage', // localStorage key name
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ data: state.data, step: state.step }),
    }
  )
);
