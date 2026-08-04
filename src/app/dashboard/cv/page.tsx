"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  Save,
  RefreshCw,
  CheckCircle2,
  Upload,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ManageCVPage() {
  const [cvUrl, setCvUrl] = useState("/Sojib_Ahmed_Resume.pdf");
  const [title, setTitle] = useState("Sojib Ahmed - Full Stack Web Developer Resume");
  const [description, setDescription] = useState(
    "Preview my resume below. You can also download a copy to review in your own time or open it in fullscreen for a better viewing experience."
  );
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const loadCvSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cv");
      const json = await res.json();
      if (json.success && json.data) {
        setCvUrl(json.data.cvUrl || "/Sojib_Ahmed_Resume.pdf");
        setTitle(json.data.title || "Sojib Ahmed - Full Stack Web Developer Resume");
        setDescription(
          json.data.description ||
            "Preview my resume below. You can also download a copy to review in your own time or open it in fullscreen for a better viewing experience."
        );
        if (json.data.updatedAt) {
          setUpdatedAt(new Date(json.data.updatedAt).toLocaleString());
        }
      }
    } catch (err) {
      console.error("Failed to load CV settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCvSettings();
  }, []);

  const handleSaveCv = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvUrl, title, description }),
      });

      const json = await res.json();
      if (json.success) {
        setSavedSuccess(true);
        if (json.data?.updatedAt) {
          setUpdatedAt(new Date(json.data.updatedAt).toLocaleString());
        }
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert("Failed to save CV settings: " + json.message);
      }
    } catch (err) {
      console.error("Error saving CV settings:", err);
      alert("Error saving CV settings");
    } finally {
      setSaving(false);
    }
  };

  // Upload file helper via /api/upload (ImgBB / server upload)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        setCvUrl(json.url);
      } else {
        alert("Upload error: " + (json.message || "Could not upload file"));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="size-6 text-primary" /> Manage CV / Resume
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your public resume link, PDF file URL, and download configuration for the <code className="text-primary font-mono">/download-cv</code> route.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={loadCvSettings} className="flex items-center gap-1.5 text-xs">
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <a href={cvUrl} target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary" className="flex items-center gap-1.5 text-xs">
              <ExternalLink className="size-3.5" /> Test PDF
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: CV Settings Form */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">CV Settings & URL</CardTitle>
            <CardDescription className="text-xs">
              Configure the PDF file path or external link served to portfolio visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveCv} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="cv-title" className="text-xs font-medium">CV Document Title</Label>
                <Input
                  id="cv-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Sojib Ahmed - Full Stack Developer Resume"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cv-desc" className="text-xs font-medium">Public Page Description</Label>
                <textarea
                  id="cv-desc"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-background border border-input rounded-md p-2 text-sm focus:outline-hidden focus:ring-1 focus:ring-ring"
                  placeholder="Text displayed on the download-cv page..."
                />
              </div>

              {/* Upload or Input PDF Link */}
              <div className="space-y-3 border border-border p-4 rounded-lg bg-muted/20">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <Upload className="size-3.5 text-primary" /> Upload New File / Image Document
                </Label>

                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="text-xs cursor-pointer file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {uploading && (
                    <span className="text-xs text-primary animate-pulse whitespace-nowrap">
                      Uploading...
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="cv-url" className="text-xs font-medium text-muted-foreground">
                    Or Enter PDF / Image URL Directly
                  </Label>
                  <Input
                    id="cv-url"
                    value={cvUrl}
                    onChange={(e) => setCvUrl(e.target.value)}
                    placeholder="/Sojib_Ahmed_Resume.pdf or https://..."
                    className="font-mono text-xs"
                    required
                  />
                </div>
              </div>

              {updatedAt && (
                <p className="text-[11px] text-muted-foreground italic">
                  Last published: {updatedAt}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                {savedSuccess ? (
                  <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="size-4" /> Saved & Published Live!
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Changes apply immediately to <code className="text-foreground">/download-cv</code>
                  </span>
                )}

                <Button type="submit" disabled={saving} className="flex items-center gap-1.5 text-xs">
                  <Save className="size-3.5" /> {saving ? "Publishing..." : "Save & Publish CV"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Live PDF / Document Preview */}
        <Card className="bg-card border-border flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Live CV Document Preview</CardTitle>
              <CardDescription className="text-xs">Real-time preview of the active resume document</CardDescription>
            </div>
            <a href={cvUrl} download className="shrink-0">
              <Button size="sm" variant="outline" className="text-xs h-8 flex items-center gap-1">
                <Download className="size-3.5" /> Download
              </Button>
            </a>
          </CardHeader>
          <CardContent className="flex-1 min-h-[420px] p-0 overflow-hidden relative rounded-b-xl bg-[#1e1e1f]">
            {cvUrl ? (
              <iframe
                src={cvUrl}
                title="CV Document Preview"
                className="w-full h-full min-h-[420px] border-none"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                No CV document link provided.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
