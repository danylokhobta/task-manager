import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Toast from "@/app/components/Toast";
import Navbar from "@/app/components/Navbar";
import GlobalStatusMonitor from "@/utils/GlobalStatusMonitor";

export const metadata: Metadata = {
  title: "Task Manager | Version 0.2.0",
  description: "This full-stack application is designed to showcase my skills in both front-end and back-end development. The app demonstrates my ability to create and manage RESTful APIs on the back-end while seamlessly integrating them with the front-end. Additionally, it highlights my UX/UI design skills, featuring a clean, modern design for an intuitive user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative pl-5 pr-2 pt-5 box-border flex flex-col gap-5 h-screen max-w-xl mx-auto antialiased`}
      >
        <ReduxProvider>
          <Toast />
          <Navbar />
          {children}
          <GlobalStatusMonitor />
        </ReduxProvider>
      </body>
    </html>
  );
}
