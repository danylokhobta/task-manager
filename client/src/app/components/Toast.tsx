'use client';
import { Snackbar, Fade } from "@mui/material";
import useToast from "../../hooks/useToast"; // Zustand toast store

const Toast = () => {
  const { message, type, open, hideToast } = useToast();

  const toastColor = {
    info: "bg-gray-900/10",
    success: "bg-green-900/10",
    warning: "bg-yellow-900/10",
    error: "bg-red-900/10",
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={hideToast}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      slots={{ transition: Fade }}
      style={{ bottom: "100px" }}
      >
        <div className="relative backdrop-blur-sm">
          <div className="relative bg-white/60 mx-3 my-2 px-3 py-2 text-md text-black z-10">
            {message}
          </div>
          <div className={`${toastColor[type]} absolute top-0 bottom-0 left-0 right-0 z-0`} />
        </div>
    </Snackbar>
  );
};

export default Toast;
