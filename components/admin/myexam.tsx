"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Exam {
  _id: string;
  name: string;
  thumbnail: string;
}

export default function MyExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExams = async () => {
    try {
      const res = await fetch("/api/myexams");
      const data = await res.json();
      if (data.success) {
        setExams(data.exams);
      }
    } catch (err) {
      console.error("Failed to fetch exams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    try {
      const res = await fetch(`/api/exams/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setExams((prev) => prev.filter((exam) => exam._id !== id));
      } else {
        alert(data.message || "Failed to delete exam");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (id: string) => {
    // For now redirect to edit page (you can replace with modal)
    window.location.href = `/dashboard/exams/edit/${id}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  if (exams.length === 0) {
    return <p className="text-center text-lg mt-10">No exams created yet.</p>;
  }

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">My Created Exams</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>{exam._id}</TableCell>
                <TableCell>{exam.name}</TableCell>
                <TableCell>
                  <Image
                    src={exam.thumbnail}
                    alt={exam.name}
                    width={60}
                    height={40}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(exam._id)}
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(exam._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
