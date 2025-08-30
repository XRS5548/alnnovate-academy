"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
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
          Get in <span className="text-primary">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg"
        >
          Have questions about our courses or want to collaborate?  
          We’d love to hear from you!
        </motion.p>
      </section>

      {/* Contact Info */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 justify-center gap-6 px-6 pb-16">
        {[
          { title: "📧 Email", value: "alnnovateacademy@gmail.com" },
          { title: "🖇️ LinkedIn", value: "@alnnovate-academy" },
          { title: "🌐 Instagram", value: "@alnnovate.academy" },


        ].map((info, i) => (
          <Card key={i} className="rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold">{info.title}</h3>
              <p className="mt-2 text-muted-foreground">{info.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Contact Form */}
      <section className="bg-muted py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Send Us a Message</h2>
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" rows={5} />
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
