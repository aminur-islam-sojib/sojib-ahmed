"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, ShieldCheck, User, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to log out", error);
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-slate-100 flex flex-col font-sans">
      {/* Admin Navigation Bar */}
      <header className="border-b border-white/10 bg-[#1e1e1f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ffdb70] to-[#ffbb5c] text-[#1a1a1a] flex items-center justify-center font-bold shadow-md">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-100">
                  Admin Dashboard
                </span>
                <span className="bg-[#ffdb70]/10 text-[#ffdb70] border border-[#ffdb70]/20 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Private Route
                </span>
              </div>
              <p className="text-xs text-slate-400">Single-User Portal</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-[#252525] border border-white/10 px-3 py-1.5 rounded-xl text-xs text-slate-300">
              <User className="w-3.5 h-3.5 text-[#ffdb70]" />
              <span>Owner Access</span>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer disabled:opacity-50"
              title="Sign out of admin portal"
            >
              {loggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 px-6 text-center text-xs text-slate-500 bg-[#1e1e1f]/40">
        Protected Admin Route • Accessible only by authenticated owner
      </footer>
    </div>
  );
}
