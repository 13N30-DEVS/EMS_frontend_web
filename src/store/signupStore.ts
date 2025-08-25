import { create } from 'zustand';

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

export const useSignupStore = create<SignupState>(set => ({
  step: 1,
  data: {},
  setStep: (step: number) => set({ step }),
  setData: (data: Partial<FormData>) =>
    set(state => ({
      data: { ...state.data, ...data },
    })),
  reset: () => set({ step: 1, data: {} }),
}));
