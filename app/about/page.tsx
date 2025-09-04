"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          About <span className="text-primary">Alnnovate Academy</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-lg md:text-xl"
        >
          Empowering students and professionals with next-gen skills in{" "}
          <span className="font-semibold">AI, Data Science, and Technology</span>.  
          Learn, innovate, and grow with us!
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6 py-12">
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-3">🎯 Our Mission</h2>
            <p>
              To make world-class education accessible to everyone, helping learners 
              build industry-ready skills through hands-on projects and mentorship.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-3">🌍 Our Vision</h2>
            <p>
              To become a global hub for innovation and learning where students, 
              developers, and creators thrive together.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Stats */}
      <section className="bg-muted py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { number: "10k+", label: "Learners" },
            { number: "150+", label: "Courses" },
            { number: "50+", label: "Expert Trainers" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-4xl font-bold">{stat.number}</h3>
              <p className="mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Rohit Verma", role: "Founder & CEO" },
            { name: "Saniya khan", role: "Founder & COO" },
            { name: "Ashish", role: "Co-Founder & CTO" },
          ].map((member, i) => (
            <Card key={i} className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
