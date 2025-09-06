"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Twitter, Github } from "lucide-react";
import { toast } from "sonner"; // ✅ import sonner
import { useRouter } from "next/navigation";

type LoginData = {
  email: string;
  password: string;
  remember: boolean;
};

export default function AlnnovateLoginPage({
  onLogin,
}: {
  onLogin?: (data: LoginData) => void;
}) {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email) return "Email/Phone is required";
    if (email.indexOf("@") === -1 && !/^\d{6,}$/.test(email))
      return "Enter a valid email or phone";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      toast.error(v);
      return;
    }
    setLoading(true);
    toast.info("Please Wait")

    try {
      const payload = { email, password, remember };

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid username or password");
        toast.error(data.message || "Invalid username or password");

        return;
      }


      // ✅ user info ko localStorage me save karna
      if (data.success) {

         if(remember) localStorage.setItem("user", JSON.stringify(data.user));
        else sessionStorage.setItem("user", JSON.stringify(data.user))
        router.refresh()
        setTimeout(() => {
          router.push("/dashboard")
        }, 100);
      }

      if (onLogin) onLogin(payload);


      toast.success("Login successful 🎉");

      console.log("Login success:", data);
      // TODO: router.push("/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Alnnovate Academy</CardTitle>
            <CardDescription>
              Sign in to access courses, projects and your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email / Phone</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com or 9876543210"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(val) => setRemember(Boolean(val))}
                  />
                  <Label htmlFor="remember" className="select-none">
                    Remember me
                  </Label>
                </div>
                <a className="text-sm underline" href="/forgotpass">
                  Forgot?
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="pt-2">
                <Separator />
                <div className="flex items-center justify-center gap-3 pt-4">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => toast.info("GitHub login coming soon")}
                  >
                    <Github size={16} />
                    <span className="ml-2 hidden sm:inline">
                      Continue with GitHub
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => toast.info("Twitter login coming soon")}
                  >
                    <Twitter size={16} />
                    <span className="ml-2 hidden sm:inline">
                      Continue with Twitter
                    </span>
                  </Button>
                </div>
              </div>

              <div className="pt-3 text-center">
                <p className="text-sm">
                  New to Alnnovate?{" "}
                  <a className="underline" href="#">
                    Create an account
                  </a>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
