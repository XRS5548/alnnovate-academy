"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Animated 404 Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
      >
        404
      </motion.h1>

      {/* Sub Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-2xl font-semibold"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-muted-foreground max-w-md"
      >
        Oops! The page you are looking for doesn’t exist or has been moved.
        Don’t worry, you can head back to safety.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium shadow-md hover:opacity-90 transition"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute -top-20 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}
