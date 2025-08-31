"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function VerifyEmailBox({ email }: { email: string }) {
  const [values, setValues] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (val: string, idx: number) => {
    if (!/^[0-9]?$/.test(val)) return; // only digits
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 p-6 rounded-2xl shadow-lg border w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold">Verify your Email</h2>
      <p className="text-sm text-muted-foreground text-center">
        Enter the 6-digit verification code we sent to your email.
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

      <Button onClick={handleSubmit} disabled={values.join("").length < 6 || loading}>
        {loading ? "Verifying..." : "Verify"}
      </Button>

      {message && (
        <p
          className={`text-sm mt-2 ${
            message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </motion.div>
  );
}
