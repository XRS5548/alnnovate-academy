"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Step 1: Send Email
  const handleSendEmail = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/forgotpassword?email=" + email);
      const data = await res.json();
      if (data.success) {
        setStep("otp");
        setMessage("OTP sent to your email.");
      } else {
        setMessage(data.message || "Email not found.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
    setLoading(false);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/verifyforgototp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setStep("reset");
        setMessage("OTP verified, set your new password.");
      } else {
        setMessage(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
    setLoading(false);
  };

  // Step 3: Change Password
  const handleChangePassword = async () => {
    setLoading(true);
    setMessage("");
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/changepasswordwithotp", {
        method: "POST",
        body: JSON.stringify({ email, otp, password, confirmPassword }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Password changed successfully!");
      } else {
        setMessage(data.message || "Error changing password.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader>
          <CardTitle>Forgot Password - Alnnovate Academy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm"
            >
              {message}
            </motion.p>
          )}

          {step === "email" && (
            <>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleSendEmail} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === "otp" && (
            <>
              <Input
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button onClick={handleVerifyOtp} disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button onClick={handleSendEmail} variant={'secondary'} disabled={loading}>
                {loading ? "Sending..." : "Resend OTP"}
              </Button>
            </>
          )}

          {step === "reset" && (
            <>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button onClick={handleChangePassword} disabled={loading}>
                {loading ? "Updating..." : "Change Password"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
