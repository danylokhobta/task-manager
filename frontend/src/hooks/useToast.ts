import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

type ToastState = {
  message: string;
  type: ToastType;
  open: boolean;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
};

export const useToast = create<ToastState>((set) => ({
  message: "",
  type: "info", // Default type
  open: false,
  showToast: (message, type) =>
    set({ message, type, open: true }), // Open toast with message and type
  hideToast: () =>
    set({ open: false }), // Reset state when hiding the toast
}));

// Export standalone functions
export const showToast = (message: string, type: ToastType) => {
  useToast.getState().showToast(message, type); // Access Zustand store directly
};

export const hideToast = () => {
  useToast.getState().hideToast(); // Access Zustand store directly
};

export default useToast;