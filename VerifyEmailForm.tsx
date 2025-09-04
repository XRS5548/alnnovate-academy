"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function VerifyEmailBox({ email }: { email: string }) {
  const [values, setValues] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0); // countdown seconds
  const [message, setMessage] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // countdown logic
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (val: string, idx: number) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newValues = [...values];
    newValues[idx] = val;
    setValues(newValues);

    if (val && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = values.join("");
    if (code.length !== 6) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Verified successfully!");
      } else {
        setMessage(data.message || "Invalid code, please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setMessage(null);

    try {
      const res = await fetch("/api/resendverification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Verification email resent!");
        setCooldown(30); // start 30s countdown
      } else {
        setMessage(data.message || "Failed to resend email. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong while resending.");
    } finally {
      setResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 p-6 rounded-2xl shadow-lg border w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold">Verify your Email</h2>
      <p className="text-sm text-muted-foreground text-center">
        Enter the 6-digit verification code we sent to your email.
        <br />
        <strong>Note: Please check your spam folder as emails may sometimes go there.</strong>
      </p>

      <div className="flex gap-2">
        {values.map((val, idx) => (
          <Input
            key={idx}
            ref={(el) => {
              inputsRef.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="w-12 h-12 text-center text-lg font-bold"
            disabled={loading}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Button
          onClick={handleSubmit}
          disabled={values.join("").length < 6 || loading}
          className="w-full"
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>

        <Button
          onClick={handleResend}
          variant="outline"
          disabled={resending || cooldown > 0}
          className="w-full"
        >
          {resending
            ? "Resending..."
            : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend Code"}
        </Button>
      </div>

      {message && (
        <p
          className={`text-sm mt-2 text-center ${message.toLowerCase().includes("success") ||
              message.toLowerCase().includes("resent")
              ? "text-green-600"
              : "text-red-600"
            }`}
        >
          {message}
        </p>
      )}
    </motion.div>
  );
}
