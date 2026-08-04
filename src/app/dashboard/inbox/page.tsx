"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  RefreshCw,
  CheckCircle,
  Trash2,
  Inbox,
  Filter,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: "new" | "read";
}

export default function ContactInboxPage() {
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMsg | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "read">("all");

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact/messages");
      const json = await res.json();
      if (json.success) {
        setMessages(json.data);
        if (json.data.length > 0 && !selectedMsg) {
          setSelectedMsg(json.data[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleMsgStatus = async (msg: ContactMsg) => {
    const newStatus = msg.status === "new" ? "read" : "new";
    try {
      const res = await fetch("/api/contact/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg._id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, status: newStatus } : m))
        );
        if (selectedMsg?._id === msg._id) {
          setSelectedMsg({ ...selectedMsg, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update message status:", err);
    }
  };

  const handleDeleteMsg = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/messages?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updated = messages.filter((m) => m._id !== id);
        setMessages(updated);
        if (selectedMsg?._id === id) {
          setSelectedMsg(updated.length > 0 ? updated[0] : null);
        }
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "new") return m.status === "new";
    if (filter === "read") return m.status === "read";
    return true;
  });

  const unreadCount = messages.filter((m) => m.status === "new").length;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Mail className="size-6 text-amber-500" /> Contact Inquiries Inbox
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage user submissions from your portfolio contact page.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === "all" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground"
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter("new")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === "new" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground"
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter("read")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === "read" ? "bg-background text-foreground shadow-xs font-semibold" : "text-muted-foreground"
              }`}
            >
              Read
            </button>
          </div>

          <Button size="sm" variant="outline" onClick={loadMessages} className="flex items-center gap-1.5 text-xs">
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </div>

      {/* Main Inbox Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Messages List */}
        <div className="lg:col-span-1 border border-border rounded-xl overflow-hidden bg-card divide-y divide-border flex flex-col">
          <div className="p-3 bg-muted/40 text-xs font-semibold text-muted-foreground border-b border-border flex items-center justify-between">
            <span>Inquiries ({filteredMessages.length})</span>
            {unreadCount > 0 && (
              <Badge variant="default" className="text-[10px] px-1.5 py-0">
                {unreadCount} New
              </Badge>
            )}
          </div>

          <div className="overflow-y-auto flex-1 max-h-[600px] divide-y divide-border">
            {loading ? (
              <div className="p-8 text-center text-xs text-muted-foreground">Loading inbox messages...</div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
                <Inbox className="size-8 text-muted-foreground/60" />
                <span>No inquiries found for selected filter.</span>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => setSelectedMsg(msg)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedMsg?._id === msg._id ? "bg-muted border-l-4 border-l-primary" : ""
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
                  <p className="text-xs text-foreground/80 line-clamp-2 mt-1.5 leading-relaxed">{msg.message}</p>
                  <span className="text-[10px] text-muted-foreground mt-2 block font-mono">
                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail Reader */}
        <div className="lg:col-span-2 border border-border rounded-xl p-6 bg-card flex flex-col justify-between min-h-[400px]">
          {selectedMsg ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Reader Header */}
                <div className="flex items-start justify-between border-b border-border pb-4">
                  <div>
                    <h2 className="font-bold text-lg">{selectedMsg.name}</h2>
                    <a
                      href={`mailto:${selectedMsg.email}`}
                      className="text-xs text-primary hover:underline flex items-center gap-1.5 mt-1"
                    >
                      <Mail className="size-3.5" /> {selectedMsg.email}
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
                      <Trash2 className="size-3.5 mr-1" /> Delete
                    </Button>
                  </div>
                </div>

                {/* Message Content */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Message Body
                  </span>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap bg-muted/30 p-5 rounded-lg border border-border/60 text-foreground font-sans">
                    {selectedMsg.message}
                  </p>
                </div>
              </div>

              {/* Reader Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>Submission Date: {new Date(selectedMsg.createdAt).toLocaleString()}</span>
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: Portfolio Contact Inquiry`}
                  className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1"
                >
                  <Mail className="size-3.5" /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-xs text-muted-foreground py-16 gap-2">
              <Inbox className="size-10 text-muted-foreground/50" />
              <span>Select an inquiry from the left list to read details.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
