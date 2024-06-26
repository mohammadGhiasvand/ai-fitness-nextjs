"use client";

import Navbar from "@/components/navbar";
import useUserInfo from "@/hooks/use-user-thread";
import { prismadb } from "@/lib/prismadb";
import { AssistantTableProps } from "@/types";
import { useUser } from "@clerk/nextjs";
import { UserThread } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = useUserInfo();

  useEffect(() => {
    if (userInfo.assistantId) return;

    const getAssistant = async () => {
      try {
        const res = await axios.get<{
          success: boolean;
          assistant?: AssistantTableProps;
          error?: string;
        }>("/api/assistant");

        if (!res.data.assistant || !res.data.success) {
          console.error(
            res.data.error ?? "Unknown error from getting the assistant"
          );
          toast.error("Failed to get the assistant id");
          return;
        }

        userInfo.setAssistantId(res.data.assistant.assistantId);
      } catch (error) {
        console.error(error);
        toast.error("Failed to globally set the assistant id");
        userInfo.setAssistantId(null);
      }
    };

    getAssistant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUserThread = async () => {
      try {
        const res = await axios.get<{
          success: boolean;
          message?: string;
          userThread: UserThread;
        }>("/api/user-thread");

        if (!res.data.success || !res.data.userThread) {
          userInfo.setUserThread(null);
          console.error(res.data.message ?? "User Thread not found");
        }

        userInfo.setUserThread(res.data.userThread);
      } catch (error) {
        console.error(error);
        userInfo.setUserThread(null);
      }
    };

    getUserThread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Navbar */}
      <Navbar />

      {children}
    </div>
  );
}
