import { getAdminSession } from "@/lib/auth";
import { ShieldCheck, Lock, Activity, Server, FileText, Settings, Sparkles, CheckCircle2, Terminal } from "lucide-react";

export default async function DashboardPage() {
  const session = await getAdminSession();

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2b2b2c] to-[#1e1e1f] border border-white/10 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#ffdb70]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdb70]/10 border border-[#ffdb70]/20 text-[#ffdb70] text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Private Route Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Welcome back, {session?.username || "Admin"} 👋
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              This is your private admin dashboard. Access is restricted exclusively to you. You can build and add custom features, content management modules, or analytics here whenever you are ready.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#252525] border border-white/10 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-400">Authenticated</div>
              <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 justify-center mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#1e1e1f] border border-white/10 rounded-xl p-5 hover:border-[#ffdb70]/30 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Security Level
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdb70]/10 text-[#ffdb70] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-100 mt-3">High (Protected)</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Middleware Enforced
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1e1e1f] border border-white/10 rounded-xl p-5 hover:border-[#ffdb70]/30 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Session Type
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-100 mt-3">HttpOnly Cookie</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-400" /> Encrypted WebCrypto
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1e1e1f] border border-white/10 rounded-xl p-5 hover:border-[#ffdb70]/30 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              User Access
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-100 mt-3">Single User</div>
          <div className="text-xs text-slate-500 mt-1">Exclusive Admin Access</div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#1e1e1f] border border-white/10 rounded-xl p-5 hover:border-[#ffdb70]/30 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Status
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-100 mt-3">Ready</div>
          <div className="text-xs text-slate-500 mt-1">Awaiting your modules</div>
        </div>
      </div>

      {/* Workspace Placeholder Banner */}
      <div className="bg-[#1e1e1f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#252525] border border-white/10 flex items-center justify-center text-[#ffdb70]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Dashboard Modules & Future Features
            </h2>
            <p className="text-xs text-slate-400">
              Tell me what you want inside this dashboard whenever you're ready.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#252525]/60 border border-white/5 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
              <FileText className="w-4 h-4 text-[#ffdb70]" /> Content Manager
            </div>
            <p className="text-xs text-slate-400">
              Create, edit, or remove portfolio projects, posts, and resume details directly.
            </p>
          </div>

          <div className="bg-[#252525]/60 border border-white/5 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
              <Activity className="w-4 h-4 text-[#ffdb70]" /> Messages & Leads
            </div>
            <p className="text-xs text-slate-400">
              View contact form submissions and inquiry messages sent by visitors.
            </p>
          </div>

          <div className="bg-[#252525]/60 border border-white/5 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
              <Settings className="w-4 h-4 text-[#ffdb70]" /> Analytics & System
            </div>
            <p className="text-xs text-slate-400">
              Track site traffic, visitor statistics, and system environment status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
