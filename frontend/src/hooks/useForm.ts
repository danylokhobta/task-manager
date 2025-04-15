import { RefObject } from "react";
import { create } from "zustand";

type FormStore = {
  formRefs: Record<string, RefObject<HTMLFormElement | null>>; // Dynamic form ref storage
  setFormRef: (name: string, ref: RefObject<HTMLFormElement | null>) => void; // Setter for refs
  submitForm: (name: string) => void; // Submit a specific form by name
};

export const useForm = create<FormStore>((set, get) => ({
  formRefs: {}, // Initialize as an empty object
  setFormRef: (name, ref) => set((state) => ({
    formRefs: { ...state.formRefs, [name]: ref },
  })),
  submitForm: (name) => {
    const formRef = get().formRefs[name]; // Access the form ref by name
    if (formRef?.current) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    } else {
      console.error(`Form with identifier "${name}" does not exist.`);
    }
  },
}));
