"use client";
import { useState } from "react";

type Course = {
    id: number;
    title: string;
    category: string;
    duration: string;
    status: string;
};

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, title: "React Basics", category: "Web", duration: "4 weeks", status: "Active" },
        { id: 2, title: "Node.js", category: "Backend", duration: "6 weeks", status: "Active" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editCourse, setEditCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({ title: "", category: "", duration: "", status: "Active" });

    const openAddModal = () => {
        setEditCourse(null);
        setFormData({ title: "", category: "", duration: "", status: "Active" });
        setShowModal(true);
    };

    const openEditModal = (course: Course) => {
        setEditCourse(course);
        setFormData({
            title: course.title,
            category: course.category,
            duration: course.duration,
            status: course.status,
        });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editCourse) {
            setCourses(courses.map((c) => (c.id === editCourse.id ? { ...c, ...formData } : c)));
        } else {
            const newCourse: Course = { id: Date.now(), ...formData };
            setCourses([...courses, newCourse]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this course?")) {
            setCourses(courses.filter((c) => c.id !== id));
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Manage Courses</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={openAddModal}
                >
                    Add New Course
                </button>
            </div>

            <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Duration</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr
                            key={course.id}
                            className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900"
                        >
                            <td className="px-4 py-2 border">{course.title}</td>
                            <td className="px-4 py-2 border">{course.category}</td>
                            <td className="px-4 py-2 border">{course.duration}</td>
                            <td className="px-4 py-2 border">{course.status}</td>
                            <td className="px-4 py-2 border space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    onClick={() => openEditModal(course)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                                    onClick={() => handleDelete(course.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                            {editCourse ? "Edit Course" : "Add Course"}
                        </h2>
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full mb-2 p-2 border rounded"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="w-full mb-2 p-2 border rounded"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Duration"
                            className="w-full mb-2 p-2 border rounded"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                        <select
                            className="w-full mb-4 p-2 border rounded"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
