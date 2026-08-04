import { NextRequest, NextResponse } from "next/server";
import { getProjectsCollection } from "@/lib/mongodb";
import { projects as defaultProjects } from "@/data/projects.data";

export async function GET() {
  try {
    const collection = await getProjectsCollection();
    let projects = await collection.find({}).toArray();

    // Seed default projects if database collection is empty
    if (projects.length === 0) {
      console.log("Seeding default projects to MongoDB...");
      const docsToInsert = defaultProjects.map(({ _id, ...rest }) => ({
        ...rest,
        createdAt: new Date(),
      }));
      await collection.insertMany(docsToInsert as any);
      projects = await collection.find({}).toArray();
    }


    // Format _id to string for client consumption
    const formattedProjects = projects.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));

    return NextResponse.json({ success: true, data: formattedProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, image, liveUrl, category, techStack, githubClient, githubServer } = body;

    if (!name || !description) {
      return NextResponse.json(
        { success: false, message: "Name and description are required" },
        { status: 400 }
      );
    }

    const collection = await getProjectsCollection();

    // Generate unique numeric id or timestamp string id
    const newProject = {
      id: Date.now(),
      name,
      description,
      image: image || "/mess_manager.png",
      liveUrl: liveUrl || "",
      category: category || "Full Stack",
      techStack: Array.isArray(techStack)
        ? techStack
        : typeof techStack === "string"
        ? techStack.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      githubClient: githubClient || "",
      githubServer: githubServer || "",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newProject);

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: { ...newProject, _id: result.insertedId.toString() },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}
