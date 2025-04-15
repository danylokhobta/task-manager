import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

type GlobalState = {
  isLoaded: boolean;
  setLoading: (timeoutMs: number) => void;
  setLoaded: () => void;
};

let timeoutId: NodeJS.Timeout | null = null; // Store the timeout ID

export const useToast = create<GlobalState>((set) => ({
  isLoaded: true,

  setLoading: (timeoutMs = 500) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    // Start a new timeout to set isLoaded to false after the specified delay
    timeoutId = setTimeout(() => {
      set({ isLoaded: false });
      timeoutId = null; // Reset timeoutId after execution
    }, timeoutMs);
  },

  setLoaded: () => {
    // Clear the timeout to prevent isLoaded from being set to false
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    // Immediately set isLoaded to true
    set({ isLoaded: true });
  },
}));

// Export standalone functions
export const setLoading = (timeoutMs = 500) => {
  useToast.getState().setLoading(timeoutMs);
};
// Export standalone functions
export const setLoaded = () => {
  useToast.getState().setLoaded();
};

export default useToast;