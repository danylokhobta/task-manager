import { showToast } from "../store/toastStore";
import { logout as logoutUtil } from "./authUtils";

type handleErrorInterface = {
  error?: {} | unknown,
  message: string,
  showInToast?: boolean,
  logout?: boolean,
  rejectPromise?: boolean,
}

const handleError = ({error, message, showInToast, logout, rejectPromise}: handleErrorInterface): void => {
  // Log the error message to the console for debugging
  console.error(message, error && `: ${error}`);

  // Show toast notification if `showInToast` is true
  if (showInToast) {
    showToast(message, "error"); // Display toast with type "error"
  }

  if (logout) {
    logoutUtil();
  }

  if (rejectPromise) {
    Promise.reject();
  }
};

export default handleError;