'use client';

import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Download, Upload, Send } from 'lucide-react';

// Define interfaces for our data structure
interface Resource {
  name: string;
  url: string;
}

interface Video {
  name: string;
  description: string;
  resources: Resource[];
}

interface CourseData {
  title: string;
  level: string;
  category: string;
  language: string;
  duration: string;
  price: number;
  description: string;
  tags: string;
  thumbnail: string;
  videos: Video[];
}

export default function AddCourseComponent() {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    level: "beginners",
    category: "",
    language: "english",
    duration: "",
    price: 0,
    description: "",
    tags: "",
    thumbnail: "",
    videos: [
      {
        name: "",
        description: "",
        resources: [
          {
            name: "",
            url: ""
          }
        ]
      }
    ]
  });

  // Predefined options for category and language
  const categoryOptions = [
    "datascience",
    "webdevelopment",
    "mobileapp",
    "cloudcomputing",
    "cybersecurity",
    "ai",
    "machinelearning",
    "graphicdesign",
    "digitalmarketing",
    "business"
  ];

  const languageOptions = [
    "english",
    "hindi",
    "spanish",
    "french",
    "german",
    "japanese",
    "chinese",
    "arabic",
    "portuguese",
    "russian"
  ];

  const levelOptions = [
    "beginners",
    "intermediate",
    "advanced"
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name: keyof CourseData, value: string) => {
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (index: number, field: keyof Video, value: string) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[index] = {
      ...updatedVideos[index],
      [field]: value
    };
    setCourseData(prev => ({
      ...prev,
      videos: updatedVideos
    }));
  };

  const handleResourceChange = (videoIndex: number, resourceIndex: number, field: keyof Resource, value: string) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[videoIndex].resources[resourceIndex] = {
      ...updatedVideos[videoIndex].resources[resourceIndex],
      [field]: value
    };
    setCourseData(prev => ({
      ...prev,
      videos: updatedVideos
    }));
  };

  const addVideo = () => {
    setCourseData(prev => ({
      ...prev,
      videos: [
        ...prev.videos,
        {
          name: "",
          description: "",
          resources: [
            {
              name: "",
              url: ""
            }
          ]
        }
      ]
    }));
  };

  const removeVideo = (index: number) => {
    if (courseData.videos.length <= 1) return;
    const updatedVideos = [...courseData.videos];
    updatedVideos.splice(index, 1);
    setCourseData(prev => ({
      ...prev,
      videos: updatedVideos
    }));
  };

  const addResource = (videoIndex: number) => {
    const updatedVideos = [...courseData.videos];
    updatedVideos[videoIndex].resources.push({
      name: "",
      url: ""
    });
    setCourseData(prev => ({
      ...prev,
      videos: updatedVideos
    }));
  };

  const removeResource = (videoIndex: number, resourceIndex: number) => {
    const updatedVideos = [...courseData.videos];
    if (updatedVideos[videoIndex].resources.length <= 1) return;
    updatedVideos[videoIndex].resources.splice(resourceIndex, 1);
    setCourseData(prev => ({
      ...prev,
      videos: updatedVideos
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Course Data:", courseData);
    alert("Course data prepared! Check console for JSON output.");
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(courseData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `${courseData.title.replace(/\s+/g, '_')}.json`);
    linkElement.click();
  };

  // Function to handle publishing course data to API
  const handlePublish = async () => {
    try {
      // Basic validation
      if (!courseData.title || !courseData.category || !courseData.duration) {
        alert("Please fill in all required fields");
        return;
      }

      const response = await fetch('/api/publishcourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Course published successfully!");
        console.log("Publish response:", result);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error publishing course:", error);
      alert("Failed to publish course. Please check console for details.");
    }
  };

  // Function to handle JSON file import
  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string) as CourseData;
        setCourseData(importedData);
        alert("Course data imported successfully!");
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        alert("Invalid JSON file. Please check the file format.");
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    e.target.value = '';
  };

  return (
    <div className=" mx-auto p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
          <CardDescription>
            Fill in the details to create a new course in the required JSON format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Course Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level *</Label>
                <Select
                  value={courseData.level}
                  onValueChange={(value) => handleSelectChange("level", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map(option => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={courseData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select
                  value={courseData.language}
                  onValueChange={(value) => handleSelectChange("language", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map(option => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (e.g., 4h) *</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={courseData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={courseData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={courseData.tags}
                onChange={handleInputChange}
                placeholder="python,basics,mit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                value={courseData.thumbnail}
                onChange={handleInputChange}
                type="url"
              />
            </div>

            {/* Videos Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Videos</Label>
                <Button type="button" onClick={addVideo} className="flex items-center gap-2">
                  <Plus size={16} /> Add Video
                </Button>
              </div>

              {courseData.videos.map((video, videoIndex) => (
                <Card key={videoIndex} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Video {videoIndex + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeVideo(videoIndex)}
                        disabled={courseData.videos.length <= 1}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`video-name-${videoIndex}`}>Video Name</Label>
                      <Input
                        id={`video-name-${videoIndex}`}
                        value={video.name}
                        onChange={(e) => handleVideoChange(videoIndex, 'name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`video-desc-${videoIndex}`}>Video Description</Label>
                      <Textarea
                        id={`video-desc-${videoIndex}`}
                        value={video.description}
                        onChange={(e) => handleVideoChange(videoIndex, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Resources</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addResource(videoIndex)}
                          className="flex items-center gap-2"
                        >
                          <Plus size={14} /> Add Resource
                        </Button>
                      </div>

                      {video.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                          <div className="space-y-2">
                            <Label htmlFor={`resource-name-${videoIndex}-${resourceIndex}`}>
                              Resource Name
                            </Label>
                            <Input
                              id={`resource-name-${videoIndex}-${resourceIndex}`}
                              value={resource.name}
                              onChange={(e) => handleResourceChange(
                                videoIndex, 
                                resourceIndex, 
                                'name', 
                                e.target.value
                              )}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`resource-url-${videoIndex}-${resourceIndex}`}>
                              Resource URL
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                id={`resource-url-${videoIndex}-${resourceIndex}`}
                                value={resource.url}
                                onChange={(e) => handleResourceChange(
                                  videoIndex, 
                                  resourceIndex, 
                                  'url', 
                                  e.target.value
                                )}
                                type="url"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => removeResource(videoIndex, resourceIndex)}
                                disabled={video.resources.length <= 1}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-4 justify-end pt-4 flex-wrap">
              <Button type="button" variant="outline" onClick={downloadJSON} className="flex items-center gap-2">
                <Download size={16} /> Download JSON
              </Button>
              
              {/* Import JSON Button */}
              <label htmlFor="import-json" className="cursor-pointer">
                <Button type="button" variant="outline" onClick={() => document.getElementById('import-json')?.click()} className="flex items-center gap-2">
                  <Upload size={16} /> Import JSON
                </Button>
                <Input
                  id="import-json"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              
              {/* Publish Button */}
              <Button 
                type="button" 
                onClick={handlePublish}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Send size={16} /> Publish
              </Button>
              
              <Button type="submit">Create Course</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}