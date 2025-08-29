"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CertificateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = () => {
    if (!name || !course) return;

    const text = `Certificate of Completion - ${course}`;
    const query = `/demo-certificate/view?text=${encodeURIComponent(
      text
    )}&name=${encodeURIComponent(name)}`;
    router.push(query);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl w-full">
        
        {/* Left: Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 bg-white shadow-xl rounded-2xl border space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-blue-700">
            🎓 Generate Your Demo Certificate
          </h2>
          <p className="text-center text-gray-600">
            Fill in your details and preview a personalized demo certificate instantly.
          </p>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Course Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Course</label>
            <Select onValueChange={(val) => setCourse(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Python for Data Science">
                  Python for Data Science
                </SelectItem>
                <SelectItem value="Web Development Bootcamp">
                  Web Development Bootcamp
                </SelectItem>
                <SelectItem value="Machine Learning Fundamentals">
                  Machine Learning Fundamentals
                </SelectItem>
                <SelectItem value="Cloud Computing Essentials">
                  Cloud Computing Essentials
                </SelectItem>
                <SelectItem value="Cybersecurity Basics">
                  Cybersecurity Basics
                </SelectItem>
                <SelectItem value="Blockchain Developer Program">
                  Blockchain Developer Program
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Button */}
          <Button onClick={handleSubmit} className="w-full">
            View Certificate
          </Button>
        </motion.div>

        {/* Right: Illustration / Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center"
        >
          <Image
            src="/images/monaCertificate.png" // 👈 apna image public/ me rakhna
            alt="Certificate Illustration"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
}
