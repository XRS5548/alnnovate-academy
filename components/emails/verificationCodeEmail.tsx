import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  code: string; // 6-digit verification code
}

export function VerificationEmail({ firstName, code }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f7fb",
        padding: "30px",
      }}
    >
      {/* Main container */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header with logo */}
        <div
          style={{
            backgroundColor: "#000000FF",
            padding: "20px",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          <img
            src="https://alnnovate.vercel.app/logo.png" // apna logo link yaha daalna
            alt="Alnnovate Logo"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <h2 style={{ margin: 0, fontSize: "30px", fontFamily:"monospace" }}>Alnnovate</h2>
        </div>

        {/* Body */}
        <div style={{ padding: "30px" }}>
          <h1 style={{ fontSize: "22px", color: "#333" }}>
            Hi {firstName},
          </h1>
          <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
            Thank you for signing up with <b>Alnnovate</b>.  
            To complete your verification, please use the 6-digit code below:
          </p>

          {/* Verification Code Box */}
          <div
            style={{
              margin: "30px 0",
              padding: "15px 20px",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "8px",
              color: "#0d47a1",
              border: "2px dashed #0d47a1",
            }}
          >
            {code}
          </div>

          <p style={{ fontSize: "14px", color: "#777" }}>
            This code is valid for the next <b>2 Weeks</b>.  
            If you didn’t request this, you can safely ignore this email.
          </p>

          <p style={{ marginTop: "30px", fontSize: "16px", color: "#333" }}>
            Cheers, <br />
            The <b>Alnnovate</b> Team
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "15px",
            textAlign: "center",
            fontSize: "12px",
            color: "#888",
          }}
        >
          © {new Date().getFullYear()} Alnnovate. All rights reserved.  
          <br />
          <a
            href="https://alnnovate.com"
            style={{ color: "#0d47a1", textDecoration: "none" }}
          >
            alnnovate.com
          </a>
        </div>
      </div>
    </div>
  );
}
