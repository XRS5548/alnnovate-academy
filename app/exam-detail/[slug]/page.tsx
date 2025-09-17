"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Exam type
interface Exam {
  _id: string;
  name: string;
  duration: string;
  fee: string;
  thumbnail?: string;
  createdAt: string;
}

export default function ExamDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  const examId = params.slug;

  // Fetch exam details
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await fetch(`/api/getexamdetails?exam=${examId}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setExam(data);
      } catch (err) {
        setError("Failed to load exam details");
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  // Apply exam function
  const handleApply = async () => {
    try {
      const res = await fetch("/api/applyexam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setApplied(true);
      } else {
        setError(data.message || "Failed to apply");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  if (loading) return <p className="p-6">Loading exam details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT: Main content */}
      <motion.div
        className="md:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {exam?.thumbnail && (
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
            <Image
              src={exam.thumbnail}
              alt={exam.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-6 space-y-4">
          <h1 className="text-3xl font-bold">{exam?.name}</h1>
          <p className="text-lg">
            <strong>Duration:</strong> {exam?.duration}
          </p>
          <p className="text-lg">
            <strong>Fee:</strong> {exam?.fee === "0" ? "Free" : `${exam?.fee} INR`}
          </p>
          <p className="text-lg">
            <strong>Created At:</strong>{" "}
            {exam?.createdAt
              ? new Date(exam.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </motion.div>

      {/* RIGHT: Sidebar */}
      <div className="flex flex-col justify-between border rounded-xl shadow-md p-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Exam Summary</h2>
          <p>
            <strong>Name:</strong> {exam?.name}
          </p>
          <p>
            <strong>Duration:</strong> {exam?.duration}
          </p>
          <p>
            <strong>Fee:</strong> {exam?.fee === "0" ? "Free" : `${exam?.fee} INR`}
          </p>
        </div>

        {!applied ? (
          <Button onClick={handleApply} className="mt-6 w-full">
            Apply for Exam
          </Button>
        ) : (
          <p className="text-green-600 font-semibold mt-6 text-center">
            ✅ You have successfully applied
          </p>
        )}
      </div>
    </div>
  );
}
