"use client";

import { motion } from "framer-motion";
import { Users, Laptop, Award, MessageSquare } from "lucide-react";

const features = [
  {
    title: "Expert Mentors",
    description: "Learn from industry experts with years of real-world experience.",
    icon: Users,
  },
  {
    title: "Hands-on Projects",
    description: "Build practical skills with live projects and coding challenges.",
    icon: Laptop,
  },
  {
    title: "Certified Programs",
    description: "Earn recognized certifications to boost your career opportunities.",
    icon: Award,
  },
  {
    title: "Community Support",
    description: "Join an active community of learners, mentors, and alumni.",
    icon: MessageSquare,
  },
];

export default function FeaturesSection() {
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
          Why Choose{" "}
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Alnnovate Academy
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Empowering students with the right skills, tools, and guidance to
          succeed in the world of technology.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 rounded-2xl border bg-background shadow-sm hover:shadow-md transition"
            >
              <feature.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background blur */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full -z-10"></div>
    </section>
  );
}
