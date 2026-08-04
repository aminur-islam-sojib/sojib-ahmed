"use client";

import { useEffect, useState } from "react";
import {
  FolderGit2,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Github,
  RefreshCw,
  FolderPlus,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Project, ProjectCategory } from "@/types/project.types";

export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProject, setIsEditingProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    description: "",
    image: "/mess_manager.png",
    liveUrl: "",
    category: "Full Stack" as ProjectCategory,
    techStack: "",
    githubClient: "",
    githubServer: "",
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (json.success) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Handle direct file upload to ImgBB
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setProjectFormData((prev) => ({ ...prev, image: json.url }));
      } else {
        alert("Failed to upload image to ImgBB: " + (json.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image to ImgBB");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectFormData,
        techStack: projectFormData.techStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (isEditingProject) {
        const targetId = isEditingProject._id || isEditingProject.id;
        const res = await fetch(`/api/projects/${targetId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setShowProjectModal(false);
          setIsEditingProject(null);
          loadProjects();
        }
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setShowProjectModal(false);
          loadProjects();
        }
      }
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  const handleDeleteProject = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadProjects();
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const openEditModal = (proj: Project) => {
    setIsEditingProject(proj);
    setProjectFormData({
      name: proj.name,
      description: proj.description,
      image: proj.image || "",
      liveUrl: proj.liveUrl || "",
      category: proj.category || "Full Stack",
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : "",
      githubClient: proj.githubClient || "",
      githubServer: proj.githubServer || "",
    });
    setShowProjectModal(true);
  };

  const openCreateModal = () => {
    setIsEditingProject(null);
    setProjectFormData({
      name: "",
      description: "",
      image: "/mess_manager.png",
      liveUrl: "",
      category: "Full Stack",
      techStack: "Next.js, React, TypeScript, Tailwind CSS",
      githubClient: "",
      githubServer: "",
    });
    setShowProjectModal(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FolderGit2 className="size-6 text-emerald-500" /> Projects Manager
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your real portfolio projects stored in MongoDB. Adding or editing projects updates your public site instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={loadProjects} className="flex items-center gap-1.5 text-xs">
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button onClick={openCreateModal} size="sm" className="flex items-center gap-1.5 text-xs">
            <Plus className="size-4" /> Add New Project
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-16 text-center text-sm text-muted-foreground">Loading projects from MongoDB...</div>
      ) : projects.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border rounded-xl p-8 bg-card">
          <FolderPlus className="size-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold text-base mb-1">No Projects Stored</h3>
          <p className="text-xs text-muted-foreground mb-4">Get started by creating your first portfolio project.</p>
          <Button onClick={openCreateModal} size="sm">Create First Project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <Card key={proj._id || proj.id} className="bg-card border-border flex flex-col justify-between overflow-hidden shadow-xs hover:border-primary/50 transition-colors">
              {proj.image && (
                <div className="h-44 w-full overflow-hidden bg-muted relative">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <Badge variant="outline" className="text-[10px] font-normal mb-2">
                    {proj.category}
                  </Badge>
                  <h3 className="font-bold text-base leading-tight">{proj.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mt-2">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2">
                  {proj.techStack?.map((tech, i) => (
                    <span key={i} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-foreground/80 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-border flex items-center justify-between bg-muted/20">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-primary flex items-center gap-1 font-medium">
                      <ExternalLink className="size-3" /> Live Demo
                    </a>
                  )}
                  {proj.githubClient && (
                    <a href={proj.githubClient} target="_blank" rel="noreferrer" className="hover:text-primary flex items-center gap-1 font-medium">
                      <Github className="size-3" /> GitHub
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="size-8" onClick={() => openEditModal(proj)} title="Edit Project">
                    <Edit className="size-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive" onClick={() => handleDeleteProject(proj._id || proj.id)} title="Delete Project">
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold">
              {isEditingProject ? "Edit Portfolio Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="p-name" className="text-xs">Project Title *</Label>
                <Input
                  id="p-name"
                  required
                  value={projectFormData.name}
                  onChange={(e) => setProjectFormData({ ...projectFormData, name: e.target.value })}
                  placeholder="e.g. Mess Manager"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="p-desc" className="text-xs">Description *</Label>
                <textarea
                  id="p-desc"
                  required
                  rows={3}
                  className="w-full bg-background border border-input rounded-md p-2 text-sm focus:outline-hidden focus:ring-1 focus:ring-ring"
                  value={projectFormData.description}
                  onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                  placeholder="Detailed description of your project..."
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="p-cat" className="text-xs">Category</Label>
                <Input
                  id="p-cat"
                  value={projectFormData.category}
                  onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value as ProjectCategory })}
                  placeholder="Full Stack, Web Development, etc."
                />
              </div>

              {/* ImgBB Image Upload Section */}
              <div className="space-y-2 border border-border/80 p-3.5 rounded-lg bg-muted/20">
                <Label className="text-xs font-semibold">Project Cover Image (ImgBB Upload)</Label>

                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="text-xs cursor-pointer file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {uploadingImage && (
                    <span className="text-xs text-primary animate-pulse whitespace-nowrap">
                      Uploading to ImgBB...
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Input
                    id="p-image"
                    value={projectFormData.image}
                    onChange={(e) => setProjectFormData({ ...projectFormData, image: e.target.value })}
                    placeholder="https://i.ibb.co/... or /mess_manager.png"
                    className="text-xs font-mono"
                  />
                  {projectFormData.image && (
                    <img
                      src={projectFormData.image}
                      alt="Project Preview"
                      className="w-10 h-10 object-cover rounded-md border border-border shrink-0"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="p-tech" className="text-xs">Tech Stack (comma separated)</Label>
                <Input
                  id="p-tech"
                  value={projectFormData.techStack}
                  onChange={(e) => setProjectFormData({ ...projectFormData, techStack: e.target.value })}
                  placeholder="Next.js, TypeScript, React, MongoDB, Tailwind CSS"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="p-live" className="text-xs">Live Site URL</Label>
                  <Input
                    id="p-live"
                    value={projectFormData.liveUrl}
                    onChange={(e) => setProjectFormData({ ...projectFormData, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="p-git" className="text-xs">GitHub Repo URL</Label>
                  <Input
                    id="p-git"
                    value={projectFormData.githubClient}
                    onChange={(e) => setProjectFormData({ ...projectFormData, githubClient: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setShowProjectModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditingProject ? "Update Project" : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
