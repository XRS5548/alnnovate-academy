"use client";
import React from "react";

export default function AdminHome() {
    const totalCourses = 12;
    const totalStudents = 145;
    const activeInternships = 4;
    const studentsInInternship = 35;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">Total Courses</h2>
                <p className="text-3xl font-bold text-blue-600">{totalCourses}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">Total Students</h2>
                <p className="text-3xl font-bold text-green-500">{totalStudents}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">Active Internships</h2>
                <p className="text-3xl font-bold text-purple-500">{activeInternships}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">Students in Internship</h2>
                <p className="text-3xl font-bold text-yellow-500">{studentsInInternship}</p>
            </div>
        </section>
    );
}
