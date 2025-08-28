"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Full-Stack Web Development",
    description:
      "Master frontend & backend with React, Node.js, and MongoDB. Build real-world projects.",
    image: "https://plus.unsplash.com/premium_photo-1678566111483-f45ad346d50a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "6 Months",
  },
  {
    title: "Data Science & AI",
    description:
      "Learn Python, ML, and AI with hands-on projects and real-world datasets.",
    image: "https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "8 Months",
  },
  {
    title: "Mobile App Development",
    description:
      "Become a mobile dev expert with Flutter & React Native. Create cross-platform apps.",
    image: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "5 Months",
  },
  {
    title: "Cybersecurity & Ethical Hacking",
    description:
      "Learn penetration testing, network security, and ethical hacking techniques.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "4 Months",
  },
];

export default function PopularCourses() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Popular Courses
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Upgrade your skills with our most in-demand programs designed for the
          future of technology.
        </motion.p>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="rounded-2xl border bg-background shadow-sm hover:shadow-lg overflow-hidden group"
            >
              {/* Image */}
              <div className="relative w-full h-40">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {course.description}
                </p>
                <p className="text-xs font-medium text-primary mb-4">
                  ⏳ Duration: {course.duration}
                </p>
                <Button className="w-full">Enroll Now</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}
