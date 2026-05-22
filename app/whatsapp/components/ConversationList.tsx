"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Conversation, dashboardApi } from "@/app/lib/dashboard-api";

interface Props {
  initialConversations: Conversation[];
  onConversationsUpdate: (convs: Conversation[]) => void;
  selectedPhone: string | null;
  onSelect: (phone: string) => void;
}

function formatTime(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString([], { day: "numeric", month: "short" });
}

function getInitials(name: string | null, phone: string): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name[0].toUpperCase();
  }
  return phone.replace(/\D/g, "").slice(-2);
}

const AVATAR_COLORS = [
  "#C2185B", "#7B1FA2", "#512DA8", "#1976D2",
  "#0288D1", "#00796B", "#388E3C", "#F57C00",
  "#D32F2F", "#5D4037",
];

function getAvatarColor(phone: string): string {
  let hash = 0;
  for (const c of phone) hash = ((hash * 31) + c.charCodeAt(0)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ConversationList({
  initialConversations,
  onConversationsUpdate,
  selectedPhone,
  onSelect,
}: Props) {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [search, setSearch] = useState("");

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
    router.push("/login");
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await dashboardApi.listConversations();
        setConversations(data);
        onConversationsUpdate(data);
      } catch {
        // keep stale data on error
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [onConversationsUpdate]);

  const filtered = search
    ? conversations.filter((c) => {
        const q = search.toLowerCase();
        return (c.name ?? "").toLowerCase().includes(q) || c.phone.includes(q);
      })
    : conversations;

  return (
    <aside className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 bg-[#fafafc] border-b border-[#e0e0e0] shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[#1d1d1f] font-bold text-xl tracking-tight">Chats</h1>
          <div className="flex items-center gap-2">
            <span className="text-[#7a7a7a] text-xs">{conversations.length} total</span>
            <button
              onClick={handleLogout}
              title="Log out"
              className="p-1.5 rounded-lg text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f0f0f0] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7a7a] pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className="w-full bg-white border border-[#e0e0e0] text-[#1d1d1f] text-sm pl-9 pr-3 py-2 rounded-lg placeholder:text-[#7a7a7a] focus:outline-none focus:border-[#C8972A]/60 transition-colors"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filtered.length === 0 && (
          <p className="text-[#7a7a7a] text-sm text-center mt-10 px-4">No conversations found</p>
        )}
        {filtered.map((conv) => (
          <button
            key={conv.phone}
            onClick={() => onSelect(conv.phone)}
            className={`w-full text-left border-b border-[#f0f0f0] transition-colors ${
              selectedPhone === conv.phone
                ? "bg-[#FEF3DC]"
                : "hover:bg-[#f5f5f7]"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-semibold text-base select-none"
                style={{ backgroundColor: getAvatarColor(conv.phone) }}
              >
                {getInitials(conv.name, conv.phone)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#1d1d1f] text-sm font-semibold truncate">
                    {conv.name ?? conv.phone}
                  </span>
                  <span className="text-[#7a7a7a] text-xs shrink-0">
                    {formatTime(conv.last_message_at)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-0.5 gap-2">
                  <p className="text-[#7a7a7a] text-xs truncate flex-1">
                    {conv.last_message_role === "assistant" && (
                      <span className="text-[#C8972A] mr-1">You:</span>
                    )}
                    {conv.last_message ?? ""}
                  </p>
                  {!conv.bot_enabled && (
                    <span className="text-[9px] border border-[#e0e0e0] text-[#7a7a7a] rounded px-1.5 py-0.5 shrink-0">
                      bot off
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
