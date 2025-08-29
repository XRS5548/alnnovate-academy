"use client";

import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Suspense } from "react";

export  function MyPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Your Name";
  const text = searchParams.get("text") || "Certificate of Completion";

  const downloadCertificate = async () => {
    const element = document.getElementById("certificate");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${name}-certificate.pdf`);
  };

  return (
  <>
     <div className="warning w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 text-center font-medium">
        ⚠️ This is just a demo certificate. It is not an official certificate.
      </div>
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div
        id="certificate"
        className="relative w-[1000px] h-[700px] shadow-lg"
      >
        {/* Background Image */}
        <img
          src="/certificate.png"
          alt="Certificate"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Name */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 text-5xl font-bold text-black " style={{ fontFamily: "Playwrite HU" }}>
          {name}
        </div>

        {/* Course / Completion Text */}
        <div className="absolute top-[58%] left-1/2 -translate-x-1/2 text-xl text-[#FFD700] " >
          {text}
        </div>
      </div>

      {/* Download Button */}
      {/* <button
        onClick={downloadCertificate}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Download Certificate
      </button> */}
    </div>
  </>

  );
}

export default function Page(){
    return (
        <Suspense>
            <MyPage />
        </Suspense>
    )
}
