 "use client";

import React, { useState } from "react";

interface Payment {
    id: number;
    student: string;
    course: string;
    amount: number;
    date: string;
    status: "Paid" | "Pending" | "Failed";
}

const Payments: React.FC = () => {
    const [payments] = useState<Payment[]>([
        { id: 1, student: "Rahul", course: "ReactJS", amount: 5000, date: "2025-08-01", status: "Paid" },
        { id: 2, student: "Amit", course: "NodeJS", amount: 4000, date: "2025-08-05", status: "Pending" },
        { id: 3, student: "Priya", course: "NextJS", amount: 6000, date: "2025-08-10", status: "Failed" },
    ]);

    const [filterCourse, setFilterCourse] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const filteredPayments = payments.filter((p) => {
        return (
            (filterCourse ? p.course === filterCourse : true) &&
            (filterStatus ? p.status === filterStatus : true) &&
            (filterDate ? p.date === filterDate : true)
        );
    });

     
    const exportCSV = async () => {
        const { saveAs } = await import("file-saver");
        const headers = ["ID,Student,Course,Amount,Date,Status"];
        const rows = filteredPayments.map(
            (p) => `${p.id},${p.student},${p.course},${p.amount},${p.date},${p.status}`
        );
        const csv = [...headers, ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "payments.csv");
    };

    
    const exportPDF = async () => {
        const jsPDF = (await import("jspdf")).default;
        await import("jspdf-autotable");

        const doc = new jsPDF();
        doc.text("Payment History", 14, 10);
        (doc as any).autoTable({
            head: [["ID", "Student", "Course", "Amount", "Date", "Status"]],
            body: filteredPayments.map((p) => [p.id, p.student, p.course, p.amount, p.date, p.status]),
        });
        doc.save("payments.pdf");
    };

    return (
        <div className="p-4 md:p-6 bg-[#0f172a] min-h-screen text-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Reports / Payments</h2>

           
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <select
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                    className="px-3 py-2 rounded-lg text-black w-full md:w-auto"
                >
                    <option value="">Filter by Course</option>
                    <option value="ReactJS">ReactJS</option>
                    <option value="NodeJS">NodeJS</option>
                    <option value="NextJS">NextJS</option>
                </select>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 rounded-lg text-black w-full md:w-auto"
                >
                    <option value="">Filter by Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                </select>

                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="px-3 py-2 rounded-lg text-black w-full md:w-auto"
                />
            </div>

            
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <button
                    onClick={exportCSV}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium w-full md:w-auto"
                >
                    Export CSV
                </button>
                <button
                    onClick={exportPDF}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium w-full md:w-auto"
                >
                    Export PDF
                </button>
            </div>

            {/* Table (Responsive) */}
            <div className="overflow-x-auto rounded-lg border border-gray-700">
                <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-[#1e293b] text-gray-300 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Student</th>
                            <th className="px-4 py-3">Course</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((p) => (
                            <tr key={p.id} className="border-b border-gray-700 hover:bg-[#1e293b]">
                                <td className="px-4 py-3">{p.id}</td>
                                <td className="px-4 py-3">{p.student}</td>
                                <td className="px-4 py-3">{p.course}</td>
                                <td className="px-4 py-3">₹{p.amount}</td>
                                <td className="px-4 py-3">{p.date}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            p.status === "Paid"
                                                ? "bg-green-700 text-green-200"
                                                : p.status === "Pending"
                                                ? "bg-yellow-600 text-yellow-200"
                                                : "bg-red-700 text-red-200"
                                        }`}
                                    >
                                        {p.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
