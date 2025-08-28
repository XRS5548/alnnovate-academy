"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t bg-background py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Alnnovate Academy
          </h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Empowering the next generation with AI, Data Science, and cutting-edge 
            technology education. Learn. Innovate. Lead. 🚀
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </motion.div>

        {/* Newsletter & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to our newsletter for updates and learning resources.
          </p>
          <form className="flex items-center gap-2 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-primary"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-primary"><Linkedin size={20} /></Link>
            <Link href="#" className="hover:text-primary"><Instagram size={20} /></Link>
            <Link href="mailto:info@alnnovate.com" className="hover:text-primary"><Mail size={20} /></Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Alnnovate Academy. All rights reserved.
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full -z-10"></div>
    </footer>
  );
}
