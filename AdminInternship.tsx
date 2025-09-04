"use client";
import React, { useState } from "react";

interface Internship {
  id: number;
  title: string;
  assignedStudents: number;
  status: "Open" | "Closed";
}

const Internships: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([
    { id: 1, title: "Frontend Developer", assignedStudents: 3, status: "Open" },
    { id: 2, title: "Backend Developer", assignedStudents: 2, status: "Closed" },
  ]);

  const [addTitle, setAddTitle] = useState("");
  const [editing, setEditing] = useState<{ id: number; title: string } | null>(null);


  const handleAdd = () => {
    const title = addTitle.trim();
    if (!title) return;
    setInternships((prev) => [
      ...prev,
      { id: Date.now(), title, assignedStudents: 0, status: "Open" },
    ]);
    setAddTitle("");
  };

  const startEdit = (row: Internship) => setEditing({ id: row.id, title: row.title });
  const saveEdit = () => {
    if (!editing) return;
    const title = editing.title.trim();
    if (!title) return;
    setInternships((prev) =>
      prev.map((i) => (i.id === editing.id ? { ...i, title } : i))
    );
    setEditing(null);
  };
  const cancelEdit = () => setEditing(null);

  // Delete
  const handleDelete = (id: number) =>
    setInternships((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Manage Internships
        </h2>

        <div className="flex w-full sm:w-auto gap-2">
          <input
            type="text"
            value={addTitle}
            onChange={(e) => setAddTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Enter internship title..."
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Add
          </button>
        </div>
      </div>


      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr className="text-left text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                <th className="px-4 py-3">Internship Title</th>
                <th className="px-4 py-3">Assigned</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((row) => {
                const isEditing = editing?.id === row.id;
                return (
                  <tr
                    key={row.id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-sm sm:text-base"
                  >
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          value={editing!.title}
                          onChange={(e) =>
                            setEditing((prev) =>
                              prev ? { ...prev, title: e.target.value } : prev
                            )
                          }
                          className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-700
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      ) : (
                        <span className="text-gray-800 dark:text-gray-100">
                          {row.title}
                        </span>
                      )}
                    </td>


                    <td className="px-4 py-3 text-center">{row.assignedStudents}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded text-xs sm:text-sm font-medium ${row.status === "Open"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                          }`}
                      >
                        {row.status}
                      </span>
                    </td>

                  
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white text-xs sm:text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => startEdit(row)}
                            className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Internships;
