"use client";
import { useState } from "react";

export default function AdminStudents() {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Aman Sharma",
            course: "React Basics",
            email: "aman@example.com",
            paymentStatus: "Pending",
            amountPaid: 0,
            paymentDate: "-",
        },
        {
            id: 2,
            name: "Priya Verma",
            course: "Node.js",
            email: "priya@example.com",
            paymentStatus: "Partial",
            amountPaid: 2000,
            paymentDate: "2025-09-01",
        },
        {
            id: 3,
            name: "Ravi Kumar",
            course: "Fullstack",
            email: "ravi@example.com",
            paymentStatus: "Paid",
            amountPaid: 5000,
            paymentDate: "2025-08-28",
        },
    ]);


    const markAsPaid = (id: number) => {
        setStudents((prev) =>
            prev.map((s) =>
                s.id === id
                    ? {
                        ...s,
                        paymentStatus: "Paid",
                        paymentDate: new Date().toISOString().split("T")[0],
                    }
                    : s
            )
        );
    };


    const viewInvoice = (student: any) => {
        alert(`
      Invoice for ${student.name}
      Course: ${student.course}
      Paid: ₹${student.amountPaid}
      Status: ${student.paymentStatus}
      Date: ${student.paymentDate}
    `);
    };

    return (
        <div className="p-6 bg-[#0f172a] text-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Manage Students</h2>


            <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-700">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Course</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Payment Status</th>
                            <th className="p-3 text-left">Amount Paid</th>
                            <th className="p-3 text-left">Payment Date</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr
                                key={student.id}
                                className="border-t border-gray-700 hover:bg-gray-900"
                            >
                                <td className="p-3">{student.name}</td>
                                <td className="p-3">{student.course}</td>
                                <td className="p-3">{student.email}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded text-sm ${student.paymentStatus === "Paid"
                                            ? "bg-green-600"
                                            : student.paymentStatus === "Partial"
                                                ? "bg-yellow-600"
                                                : "bg-red-600"
                                            }`}
                                    >
                                        {student.paymentStatus}
                                    </span>
                                </td>
                                <td className="p-3">₹{student.amountPaid}</td>
                                <td className="p-3">{student.paymentDate}</td>
                                <td className="p-3 flex gap-2">
                                    {student.paymentStatus !== "Paid" && (
                                        <button
                                            onClick={() => markAsPaid(student.id)}
                                            className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Mark as Paid
                                        </button>
                                    )}
                                    <button
                                        onClick={() => viewInvoice(student)}
                                        className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-600"
                                    >
                                        View Invoice
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid gap-4 md:hidden">
                {students.map((student) => (
                    <div
                        key={student.id}
                        className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                    >
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <p className="text-sm text-gray-300">{student.course}</p>
                        <p className="text-sm text-gray-400">{student.email}</p>

                        <div className="mt-3 flex flex-wrap gap-2 items-center">
                            <span
                                className={`px-3 py-1 rounded text-sm ${student.paymentStatus === "Paid"
                                    ? "bg-green-600"
                                    : student.paymentStatus === "Partial"
                                        ? "bg-yellow-600"
                                        : "bg-red-600"
                                    }`}
                            >
                                {student.paymentStatus}
                            </span>
                            <span className="text-sm">₹{student.amountPaid}</span>
                            <span className="text-sm">{student.paymentDate}</span>
                        </div>


                        <div className="mt-4 flex gap-2">
                            {student.paymentStatus !== "Paid" && (
                                <button
                                    onClick={() => markAsPaid(student.id)}
                                    className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 text-sm"
                                >
                                    Mark as Paid
                                </button>
                            )}
                            <button
                                onClick={() => viewInvoice(student)}
                                className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-600 text-sm"
                            >
                                View Invoice
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
