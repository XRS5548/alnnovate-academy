import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// Agar aap MongoDB use kar rahe ho to yaha DB connection import karke save karna hoga
// import { connectDB } from "@/lib/db";
// import Course from "@/models/Course";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Basic fields
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;
    const language = formData.get("language") as string;
    const duration = formData.get("duration") as string;
    const price = formData.get("price") as string;
    const tags = formData.get("tags") as string;

    // Image upload (file handling)
    const image = formData.get("image") as File | null;
    let imageUrl = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = path.join(process.cwd(), "public/uploads", image.name);
      await writeFile(filePath, buffer);

      imageUrl = `/uploads/${image.name}`;
    }

    // Parse JSON fields
    const videos = JSON.parse(formData.get("videos") as string);
    const resources = JSON.parse(formData.get("resources") as string);

    // Example save to DB (pseudo code)
    // await connectDB();
    // const newCourse = await Course.create({
    //   name,
    //   category,
    //   description,
    //   level,
    //   language,
    //   duration,
    //   price,
    //   tags: tags.split(",").map((t) => t.trim()),
    //   image: imageUrl,
    //   videos,
    //   resources,
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully",
        data: {
          name,
          category,
          description,
          level,
          language,
          duration,
          price,
          tags,
          image: imageUrl,
          videos,
          resources,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create course" },
      { status: 500 }
    );
  }
}
