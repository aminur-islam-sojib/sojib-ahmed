"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Eye,
  MessageSquare,
  FolderGit2,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  ExternalLink,
  Github,
  Mail,
  ArrowUpRight,
  TrendingUp,
  Globe,
  RefreshCw,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Project, ProjectCategory } from "@/types/project.types";
import { AnalyticsStats } from "@/types/analytics";

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "new" | "read";
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "messages">("overview");

  // Analytics State
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
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


  // Messages State
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMsg | null>(null);

  // Load Data
  const loadAnalytics = async () => {
    setStatsLoading(true);
    try {
      const res = await fetch("/api/analytics/stats");
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch analytics stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  const loadProjects = async () => {
    setProjectsLoading(true);
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (json.success) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setProjectsLoading(false);
    }
  };

  const loadMessages = async () => {
    setMessagesLoading(true);
    try {
      const res = await fetch("/api/contact/messages");
      const json = await res.json();
      if (json.success) {
        setMessages(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    loadProjects();
    loadMessages();
  }, []);

  // Save / Update Project
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
          loadAnalytics();
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
          loadAnalytics();
        }
      }
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadProjects();
        loadAnalytics();
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  // Open edit modal
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

  // Open create modal
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

  // Toggle Message Status
  const handleToggleMsgStatus = async (msg: ContactMsg) => {
    const newStatus = msg.status === "new" ? "read" : "new";
    try {
      const res = await fetch("/api/contact/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg._id, status: newStatus }),
      });
      if (res.ok) {
        loadMessages();
      }
    } catch (err) {
      console.error("Failed to update message status:", err);
    }
  };

  // Delete Message
  const handleDeleteMsg = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/messages?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedMsg?._id === id) setSelectedMsg(null);
        loadMessages();
        loadAnalytics();
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6 text-foreground">
      {/* Top Header & View Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Real-time analytics, portfolio project management, and user inquiry inbox.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-lg border border-border">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              activeTab === "overview"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Overview & Analytics
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              activeTab === "projects"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === "messages"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Inbox ({messages.length})
            {messages.some((m) => m.status === "new") && (
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* OVERVIEW & ANALYTICS TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-xs uppercase font-semibold">Total Unique Visitors</CardDescription>
                <Users className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? "..." : stats?.totalVisitors || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="size-3 text-emerald-500" /> Distinct IP addresses
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-xs uppercase font-semibold">Total Page Views</CardDescription>
                <Eye className="size-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? "..." : stats?.totalPageViews || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Across all public routes</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-xs uppercase font-semibold">Contact Messages</CardDescription>
                <MessageSquare className="size-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? "..." : stats?.totalMessages || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Inquiries submitted by users</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-xs uppercase font-semibold">Active Projects</CardDescription>
                <FolderGit2 className="size-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? "..." : stats?.totalProjects || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Showcased in database</p>
              </CardContent>
            </Card>
          </div>

          {/* Views Chart over time */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Visitor Traffic (Last 14 Days)</CardTitle>
                <CardDescription className="text-xs">
                  Daily page views tracked in real-time
                </CardDescription>
              </div>
              <Button size="sm" variant="ghost" onClick={loadAnalytics} title="Refresh data">
                <RefreshCw className={`size-4 ${statsLoading ? "animate-spin" : ""}`} />
              </Button>
            </CardHeader>
            <CardContent className="h-[280px] w-full pt-4">
              {stats?.dailyViews && stats.dailyViews.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.dailyViews}>
                    <defs>
                      <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary, #3b82f6)" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="var(--primary, #3b82f6)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis tickLine={false} allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1e1e1f", borderColor: "#383838", borderRadius: "8px" }}
                      labelStyle={{ color: "#aaa" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="var(--primary, #3b82f6)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#viewGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  {statsLoading ? "Loading chart data..." : "No visit logs captured yet. Visit your public website routes to start recording visits!"}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Route Breakdown & Referrers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Route Popularity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Globe className="size-4 text-primary" /> Most Visited Routes
                </CardTitle>
                <CardDescription className="text-xs">Which pages your visitors are exploring</CardDescription>
              </CardHeader>
              <CardContent>
                {stats?.topRoutes && stats.topRoutes.length > 0 ? (
                  <div className="space-y-3">
                    {stats.topRoutes.map((r, i) => (
                      <div key={i} className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
                        <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-foreground">{r.route}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{r.count} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No route traffic recorded yet.</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Live Visitors */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Clock className="size-4 text-blue-500" /> Recent Live Visitor Log
                </CardTitle>
                <CardDescription className="text-xs">Latest recorded activity across the site</CardDescription>
              </CardHeader>
              <CardContent>
                {stats?.recentViews && stats.recentViews.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recentViews.slice(0, 6).map((v, i) => (
                      <div key={i} className="flex items-center justify-between text-xs border-b border-border/50 pb-2">
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{v.path}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">IP: {v.ip}</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No recent visitors logged yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* PROJECTS MANAGEMENT TAB */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Portfolio Projects</h2>
              <p className="text-xs text-muted-foreground">
                Manage the real projects stored in your MongoDB database.
              </p>
            </div>
            <Button onClick={openCreateModal} size="sm" className="flex items-center gap-1.5">
              <Plus className="size-4" /> Add New Project
            </Button>
          </div>

          {projectsLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">Loading projects from MongoDB...</div>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-border rounded-lg p-8">
              <p className="text-sm text-muted-foreground mb-3">No projects found in database.</p>
              <Button onClick={openCreateModal} size="sm">Create First Project</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <Card key={proj._id || proj.id} className="bg-card border-border flex flex-col justify-between overflow-hidden">
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Badge variant="outline" className="text-[10px] font-normal mb-1">
                          {proj.category}
                        </Badge>
                        <h3 className="font-semibold text-base leading-tight">{proj.name}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.techStack?.map((tech, i) => (
                        <span key={i} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-foreground/80 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-border flex items-center justify-between bg-muted/20">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-primary flex items-center gap-0.5">
                          <ExternalLink className="size-3" /> Live
                        </a>
                      )}
                      {proj.githubClient && (
                        <a href={proj.githubClient} target="_blank" rel="noreferrer" className="hover:text-primary flex items-center gap-0.5">
                          <Github className="size-3" /> Code
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="size-7" onClick={() => openEditModal(proj)}>
                        <Edit className="size-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="size-7 text-destructive hover:text-destructive" onClick={() => handleDeleteProject(proj._id || proj.id)}>
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CONTACT MESSAGES TAB */}
      {activeTab === "messages" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Contact Inquiries Inbox</h2>
              <p className="text-xs text-muted-foreground">
                View and respond to messages submitted via your portfolio contact form.
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={loadMessages} className="flex items-center gap-1.5">
              <RefreshCw className={`size-3.5 ${messagesLoading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 border border-border rounded-lg overflow-hidden bg-card divide-y divide-border">
              {messagesLoading ? (
                <div className="p-6 text-center text-xs text-muted-foreground">Loading inbox...</div>
              ) : messages.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground">No contact messages received yet.</div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    onClick={() => setSelectedMsg(msg)}
                    className={`p-3.5 cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedMsg?._id === msg._id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-foreground truncate">{msg.name}</span>
                      <Badge
                        variant={msg.status === "new" ? "default" : "secondary"}
                        className="text-[9px] px-1.5 py-0 uppercase"
                      >
                        {msg.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                    <p className="text-xs text-foreground/80 line-clamp-2 mt-1">{msg.message}</p>
                    <span className="text-[10px] text-muted-foreground mt-1.5 block">
                      {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Selected Message Detail View */}
            <div className="lg:col-span-2 border border-border rounded-lg p-5 bg-card flex flex-col justify-between min-h-[300px]">
              {selectedMsg ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-border pb-3">
                    <div>
                      <h3 className="font-bold text-base">{selectedMsg.name}</h3>
                      <a href={`mailto:${selectedMsg.email}`} className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5">
                        <Mail className="size-3" /> {selectedMsg.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleMsgStatus(selectedMsg)}
                        className="text-xs h-8"
                      >
                        <CheckCircle className="size-3.5 mr-1" />
                        Mark as {selectedMsg.status === "new" ? "Read" : "Unread"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteMsg(selectedMsg._id)}
                        className="text-xs h-8"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Message Body:</span>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap bg-muted/40 p-4 rounded-md border border-border/50 text-foreground">
                      {selectedMsg.message}
                    </p>
                  </div>

                  <div className="pt-2 text-xs text-muted-foreground">
                    Received on: {new Date(selectedMsg.createdAt).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-muted-foreground py-12">
                  Select a message from the left list to read details.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold">
              {isEditingProject ? "Edit Portfolio Project" : "Add New Project"}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-3">
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
              <div className="space-y-2 border border-border/80 p-3 rounded-lg bg-muted/20">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  Project Cover Image (ImgBB)
                </Label>

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
                  <Label htmlFor="p-git" className="text-xs">GitHub Client Repo URL</Label>
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
