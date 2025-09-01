"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SignupData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "student" | "instructor";
  acceptTerms: boolean;
};

export default function AlnnovateSignupPage({ onSignup }: { onSignup?: (data: SignupData) => void }) {
  const router = useRouter();
  const [form, setForm] = useState<SignupData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match";
    if (!form.acceptTerms) e.acceptTerms = "You must accept terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg(null);
    if (!validate()) return;

    setLoading(true);
    toast.info("Please Wait ...")
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({

        }));
        toast.error(errData.message || "Login failed: Please check your credentials.")
      }

      const data = await res.json();
      onSignup?.(form);

      setSuccessMsg(data.message || "Signup successful!");
      setErrors({});
      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
        acceptTerms: false,
      });
      toast.success("Login Successfull. please wait for Verification ...")

      // ✅ UX improvement: show success + redirect message before navigating
      setRedirecting(true);
      setTimeout(() => {
        router.push(`/signup/verify?email=${form.email}`);
      }, 2000); // 2s delay so user can read the message
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle>Join Alnnovate Academy</CardTitle>
            <CardDescription>
              Sign up to access AI & Data Science courses, community, and internships.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
                  placeholder="Your full name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="you@company.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                    placeholder="Create a password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label="toggle password"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm((s) => ({ ...s, confirmPassword: e.target.value }))}
                  placeholder="Repeat your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <Label>I am a</Label>
                <Select
                  value={form.role}
                  onValueChange={(val) => setForm((s) => ({ ...s, role: val as "student" | "instructor" }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => setForm((s) => ({ ...s, acceptTerms: e.target.checked }))}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the Alnnovate{" "}
                  <a className="underline" href="/terms">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a className="underline" href="/privacy">
                    Privacy Policy
                  </a>.
                </label>
              </div>
              {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
              {errors.general && <p className="text-sm text-red-600">{errors.general}</p>}

              {/* Submit */}
              <div className="pt-2">
                <Button type="submit" disabled={loading || redirecting} className="w-full">
                  {loading ? "Creating account..." : redirecting ? "Redirecting..." : "Create account"}
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline">
                  Log in
                </a>
              </div>

              {/* Success + Redirect Info */}
              {successMsg && (
                <p className="mt-2 text-sm text-green-600">
                  {successMsg} {redirecting && "Redirecting to verification..."}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Alnnovate Academy — Empowering creators & learners.
        </p>
      </motion.div>
    </main>
  );
}
