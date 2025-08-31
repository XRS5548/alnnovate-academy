"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateCourseUI() {
  const [videos, setVideos] = useState([{ title: "", description: "", link: "" }]);
  const [resources, setResources] = useState([""]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    level: "",
    language: "",
    duration: "",
    price: "",
    tags: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
   const { name, value, files } = e.target as HTMLInputElement; 
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addVideo = () => setVideos([...videos, { title: "", description: "", link: "" }]);
  const addResource = () => setResources([...resources, ""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("level", formData.level);
    data.append("language", formData.language);
    data.append("duration", formData.duration);
    data.append("price", formData.price);
    data.append("tags", formData.tags);
    if (formData.image) data.append("image", formData.image);
    data.append("videos", JSON.stringify(videos));
    data.append("resources", JSON.stringify(resources));

    try {
      const res = await fetch("/api/createcourse", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const data = await res.text()
        console.log(data)
        alert("✅ Course Created Successfully!");
      } else {
        alert("❌ Failed to create course");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto p-6 space-y-6"
    >
      <h1 className="text-3xl font-bold mb-4">📚 Create New Course</h1>

      {/* Course Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="name" placeholder="Course Name" onChange={handleChange} required />

        <Select onValueChange={(val) => setFormData({ ...formData, category: val })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="data-science">Data Science</SelectItem>
            <SelectItem value="machine-learning">Machine Learning</SelectItem>
            <SelectItem value="web-development">Web Development</SelectItem>
            <SelectItem value="ai">Artificial Intelligence</SelectItem>
            <SelectItem value="python">Python</SelectItem>
          </SelectContent>
        </Select>

        <Input
          name="language"
          placeholder="Language (e.g. English, Hindi)"
          onChange={handleChange}
        />

        <Select onValueChange={(val) => setFormData({ ...formData, level: val })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <Input name="duration" placeholder="Duration (e.g. 20 Hours)" onChange={handleChange} />
        <Input name="price" placeholder="Price (0 for Free)" type="number" onChange={handleChange} />
      </div>

      <Textarea
        name="description"
        placeholder="Course Description"
        rows={4}
        onChange={handleChange}
        required
      />

      <Input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />

      <Input name="image" type="file" accept="image/*" onChange={handleChange} />

      {/* Videos Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">🎥 Course Videos</h2>
        {videos.map((v, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-3 rounded-lg">
            <Input
              placeholder="Video Title"
              value={v.title}
              onChange={(e) => {
                const newVideos = [...videos];
                newVideos[i].title = e.target.value;
                setVideos(newVideos);
              }}
            />
            <Input
              placeholder="Video Description"
              value={v.description}
              onChange={(e) => {
                const newVideos = [...videos];
                newVideos[i].description = e.target.value;
                setVideos(newVideos);
              }}
            />
            <Input
              placeholder="Video Link (YouTube/Vimeo)"
              value={v.link}
              onChange={(e) => {
                const newVideos = [...videos];
                newVideos[i].link = e.target.value;
                setVideos(newVideos);
              }}
            />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addVideo}>
          + Add Another Video
        </Button>
      </div>

      {/* Resources Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">📎 Additional Resources</h2>
        {resources.map((r, i) => (
          <Input
            key={i}
            placeholder="Resource Link"
            value={r}
            onChange={(e) => {
              const newRes = [...resources];
              newRes[i] = e.target.value;
              setResources(newRes);
            }}
          />
        ))}
        <Button type="button" variant="outline" onClick={addResource}>
          + Add Resource
        </Button>
      </div>

      <Button
        type="submit"
        className="w-full py-3 text-lg"
        disabled={loading}
      >
        {loading ? "Creating Course..." : "🚀 Create Course"}
      </Button>
    </form>
  );
}
