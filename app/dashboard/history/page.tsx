"use client";

import dayjs from "dayjs";
import Templates from "@/app/dashboard/(data)/Templates";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

function History() {
  const { user } = useUser(); // Using useUser hook for client-side
  const [historyList, setHistoryList] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTemplateName = (slug: string) => {
    const template = Templates.find((item) => item.slug === slug);
    return template || { name: "Unknown", icon: "/placeholder-icon.png" };
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.primaryEmailAddress) {
        setHistoryList([]);
        setLoading(false);
        return;
      }

      try {
        const response = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress))
          .orderBy(desc(AIOutput.id));
        setHistoryList(response);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search your previously generated AI content</p>

      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-5 font-bold border-b pb-2 gap-4">
          <span>TEMPLATE</span>
          <span>AI RESPONSE</span>
          <span>DATE</span>
          <span>WORDS COUNT</span>
          <span>COPY</span>
        </div>

        {loading ? (
          <div className="text-gray-500 mt-5">Loading...</div>
        ) : error ? (
          <div className="text-red-500 mt-5">Failed to load history. Please try again later.</div>
        ) : historyList.length > 0 ? (
          historyList.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-5 my-3 py-3 px-3 border-b gap-4"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={getTemplateName(item.templateSlug)?.icon}
                  alt={getTemplateName(item.templateSlug)?.name}
                  width={25}
                  height={25}
                />
                <span>{getTemplateName(item.templateSlug)?.name}</span>
              </div>
              <span className="line-clamp-3">{item.aiResponse}</span>
              <span>{(item.createdAt)}</span>

              <span>{item.aiResponse.split(" ").length}</span>
              <Button
                onClick={() => navigator.clipboard.writeText(item.aiResponse)}
                aria-label="Copy AI response"
                className="bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Copy
              </Button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 mt-5">No history found.</div>
        )}
      </div>
    </div>
  );
}

export default History;
