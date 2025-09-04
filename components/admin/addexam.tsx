"use client"

import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddExam() {
  const [mcqs, setMcqs] = useState<{ question: string; options: string[]; marks: string }[]>([])
  const [longQuestions, setLongQuestions] = useState<{ question: string; marks: string }[]>([])
  const [codingProblems, setCodingProblems] = useState<{ problem: string; marks: string }[]>([])

  const [mcq, setMcq] = useState({ question: "", options: ["", "", "", ""], marks: "" })
  const [longQ, setLongQ] = useState({ question: "", marks: "" })
  const [code, setCode] = useState({ problem: "", marks: "" })

  const totalQuestions = mcqs.length + longQuestions.length + codingProblems.length

  // Add MCQ
  const addMcq = () => {
    if (!mcq.question || !mcq.marks) return
    setMcqs([...mcqs, mcq])
    setMcq({ question: "", options: ["", "", "", ""], marks: "" })
  }

  // Add Long Question
  const addLongQuestion = () => {
    if (!longQ.question || !longQ.marks) return
    setLongQuestions([...longQuestions, longQ])
    setLongQ({ question: "", marks: "" })
  }

  // Add Coding Problem
  const addCodingProblem = () => {
    if (!code.problem || !code.marks) return
    setCodingProblems([...codingProblems, code])
    setCode({ problem: "", marks: "" })
  }

  // Publish Exam
  const publishExam = async () => {
    const examData = { mcqs, longQuestions, codingProblems }
    try {
      const res = await fetch("/api/addexam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examData),
      })
      if (res.ok) {
        alert("Exam published successfully!")
      } else {
        alert("Failed to publish exam.")
      }
    } catch (err) {
      console.error(err)
      alert("Error publishing exam.")
    }
  }

  // Download JSON
  const downloadJSON = () => {
    const examData = { mcqs, longQuestions, codingProblems }
    const blob = new Blob([JSON.stringify(examData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "exam.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  // Import JSON
  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (data.mcqs && data.longQuestions && data.codingProblems) {
          setMcqs(data.mcqs)
          setLongQuestions(data.longQuestions)
          setCodingProblems(data.codingProblems)
          alert("Exam data imported successfully!")
        } else {
          alert("Invalid exam file format.")
        }
      } catch (err) {
        alert("Error reading exam file.")
      }
    }
    reader.readAsText(file)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Add Exam</CardTitle>
        <div className="text-sm font-medium">Total Questions: {totalQuestions}</div>
      </CardHeader>
      <CardContent>
        {/* Action Buttons */}
        <div className="flex gap-3 mb-5">
          <Button onClick={publishExam}>Publish</Button>
          <Button variant="outline" onClick={downloadJSON}>Download JSON</Button>
          <div>
            <Input type="file" accept="application/json" onChange={importJSON} />
          </div>
        </div>

        <Tabs defaultValue="mcq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mcq">MCQ</TabsTrigger>
            <TabsTrigger value="long">Long Questions</TabsTrigger>
            <TabsTrigger value="coding">Coding Problem</TabsTrigger>
          </TabsList>

          {/* MCQ TAB */}
          <TabsContent value="mcq">
            <div className="space-y-3">
              <Input
                placeholder="Enter MCQ Question"
                value={mcq.question}
                onChange={(e) => setMcq({ ...mcq, question: e.target.value })}
              />
              {mcq.options.map((opt, i) => (
                <Input
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...mcq.options]
                    newOptions[i] = e.target.value
                    setMcq({ ...mcq, options: newOptions })
                  }}
                />
              ))}
              <Input
                type="number"
                placeholder="Marks"
                value={mcq.marks}
                onChange={(e) => setMcq({ ...mcq, marks: e.target.value })}
              />
              <Button onClick={addMcq}>Add MCQ</Button>

              <div className="mt-4">
                <h3 className="font-semibold">Added MCQs</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {mcqs.map((m, idx) => (
                    <li key={idx}>
                      {m.question} <span className="text-muted-foreground">({m.marks} marks)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* LONG QUESTIONS TAB */}
          <TabsContent value="long">
            <div className="space-y-3">
              <Textarea
                placeholder="Enter Long Question"
                value={longQ.question}
                onChange={(e) => setLongQ({ ...longQ, question: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Marks"
                value={longQ.marks}
                onChange={(e) => setLongQ({ ...longQ, marks: e.target.value })}
              />
              <Button onClick={addLongQuestion}>Add Question</Button>

              <div className="mt-4">
                <h3 className="font-semibold">Added Long Questions</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {longQuestions.map((q, idx) => (
                    <li key={idx}>
                      {q.question} <span className="text-muted-foreground">({q.marks} marks)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* CODING PROBLEM TAB */}
          <TabsContent value="coding">
            <div className="space-y-3">
              <Textarea
                className="h-60 font-mono"
                placeholder="Write coding problem or solution here..."
                value={code.problem}
                onChange={(e) => setCode({ ...code, problem: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Marks"
                value={code.marks}
                onChange={(e) => setCode({ ...code, marks: e.target.value })}
              />
              <Button onClick={addCodingProblem}>Add Coding Problem</Button>

              <div className="mt-4">
                <h3 className="font-semibold">Added Coding Problems</h3>
                <ul className="list-decimal ml-5 space-y-1">
                  {codingProblems.map((c, idx) => (
                    <li key={idx}>
                      <pre className="bg-muted p-2 rounded whitespace-pre-wrap">{c.problem}</pre>
                      <span className="text-muted-foreground">({c.marks} marks)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
