"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="https://images.unsplash.com/photo-1560439514-07abbb294a86?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Alnnovate Academy"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-purple-600/40 mix-blend-multiply"></div>
        </motion.div>

        {/* Right Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Alnnovate Academy
            </span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Alnnovate Academy is a next-generation learning platform where 
            students and professionals gain industry-ready skills in{" "}
            <strong>AI, Data Science, Web Development, Cybersecurity,</strong>{" "}
            and more. Our mission is to make tech education{" "}
            <span className="font-medium">accessible, innovative, and career-focused.</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="p-4 rounded-xl border bg-background shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
              <p className="text-sm text-muted-foreground">
                To empower learners with practical knowledge and hands-on skills 
                that prepare them for real-world challenges.
              </p>
            </div>
            <div className="p-4 rounded-xl border bg-background shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">🚀 Our Vision</h3>
              <p className="text-sm text-muted-foreground">
                To become a global hub for AI and tech education, 
                nurturing the innovators and leaders of tomorrow.
              </p>
            </div>
          </div>

          <Button size="lg" className="mt-4">
            Learn More
          </Button>
        </motion.div>
      </div>

      {/* Background glow */}
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-primary/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}
