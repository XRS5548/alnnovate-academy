"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Exam {
  _id: string;
  name: string;
  duration: string;
  fee: string;
  thumbnail: string;
  createdAt: string;
  createdBy: string;
}

export default function ExamsList() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        if (data.success) {
          setExams(data.exams);
        }
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExams();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 text-center">
        {/* Heading with glowing red ball */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            className="w-3 h-3 rounded-full bg-red-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Available{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Exams
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Practice and challenge yourself with our curated set of online exams.
        </motion.p>

        {/* Loader */}
        {loading && <p className="text-muted-foreground">Loading exams...</p>}

        {/* Exams Grid */}
        {!loading && exams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {exams.map((exam, index) => (
              <motion.div
                key={exam._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="rounded-2xl border bg-background shadow-sm hover:shadow-lg overflow-hidden group"
              >
                {/* Image */}
                <div className="relative w-full h-44">
                  <Image
                    src={exam.thumbnail}
                    alt={exam.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 text-left">
                  <h3 className="text-lg font-semibold mb-2">{exam.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Duration: {exam.duration}
                  </p>
                  <p className="text-sm font-medium text-primary mb-4">
                    {exam.fee === "0" ? "Free" : `₹${exam.fee}`}
                  </p>
                  <Button className="w-full">Start Exam</Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No exams fallback */}
        {!loading && exams.length === 0 && (
          <p className="text-muted-foreground">No exams found.</p>
        )}
      </div>

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}
