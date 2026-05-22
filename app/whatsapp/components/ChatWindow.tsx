"use client";

import { useEffect, useRef, useState } from "react";
import { ConversationCosts, ConversationSettings, Message, dashboardApi } from "@/app/lib/dashboard-api";
import SettingsToggles from "./SettingsToggles";

interface Props {
  phone: string;
  name: string | null;
  initialCosts: ConversationCosts;
  onBack: () => void;
}

function fmt(n: number) {
  return n > 0 ? `$${n.toFixed(6)}` : "-";
}

function CostRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs ${color}`}>{label}</span>
      <span className="text-xs text-[#7a7a7a] font-mono">{fmt(value)}</span>
    </div>
  );
}

function formatMsgTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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

export default function ChatWindow({ phone, name, initialCosts, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [costs, setCosts] = useState<ConversationCosts>(initialCosts);
  const [settings, setSettings] = useState<ConversationSettings>({
    bot_enabled: true,
    translate_in: false,
    translate_out: false,
    translate_in_cost_usd: 0,
    translate_out_cost_usd: 0,
    translate_in_tokens: 0,
    translate_out_tokens: 0,
    translate_provider: null,
    translate_model: null,
  });
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [translating, setTranslating] = useState<number | null>(null);
  const [showCosts, setShowCosts] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevMsgCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [msgs, cfg] = await Promise.all([
          dashboardApi.getMessages(phone),
          dashboardApi.getSettings(phone),
        ]);
        if (!cancelled) {
          setMessages(msgs);
          setSettings(cfg);
          setCosts((prev) => ({
            ...prev,
            translate_in_usd: cfg.translate_in_cost_usd,
            translate_out_usd: cfg.translate_out_cost_usd,
            total_usd: prev.bot_usd + prev.media_usd + cfg.translate_in_cost_usd + cfg.translate_out_cost_usd,
          }));
        }
      } catch {
        // keep stale data
      }
    }

    load();
    const interval = setInterval(load, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [phone]);

  useEffect(() => {
    if (messages.length > prevMsgCountRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMsgCountRef.current = messages.length;
  }, [messages]);

  async function handleTranslate(messageId: number) {
    setTranslating(messageId);
    try {
      const res = await dashboardApi.translateMessage(phone, messageId);
      setMessages((prev) =>
        prev.map((m) => m.id === messageId ? { ...m, content_translated: res.content_translated } : m)
      );
      if (!res.cached) {
        const cfg = await dashboardApi.getSettings(phone);
        setCosts((prev) => ({
          ...prev,
          translate_in_usd: cfg.translate_in_cost_usd,
          total_usd: prev.bot_usd + prev.media_usd + cfg.translate_in_cost_usd + prev.translate_out_usd,
        }));
      }
    } catch {
      // silently fail
    } finally {
      setTranslating(null);
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      await dashboardApi.sendMessage(phone, input.trim());
      setInput("");
      const msgs = await dashboardApi.getMessages(phone);
      setMessages(msgs);
    } catch {
      // silently fail
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#f5f5f7]">
      {/* Header */}
      <div className="px-3 py-2 bg-white border-b border-[#e0e0e0] shrink-0">
        {/* Row 1: back + avatar + name + cost (desktop toggles also here) */}
        <div className="flex items-center gap-3">
          {/* Back — mobile only */}
          <button
            onClick={onBack}
            className="md:hidden text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors p-1 -ml-1 shrink-0"
            aria-label="Back"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white font-semibold text-sm select-none"
            style={{ backgroundColor: getAvatarColor(phone) }}
          >
            {getInitials(name, phone)}
          </div>

          {/* Name — always visible, takes all remaining space */}
          <div className="flex-1 min-w-0">
            <p className="text-[#1d1d1f] font-semibold text-sm leading-tight truncate">
              {name ?? phone}
            </p>
            {name && (
              <p className="text-[#7a7a7a] text-xs truncate">{phone}</p>
            )}
          </div>

          {/* Cost chip — hidden on mobile */}
          {costs.total_usd > 0 && (
            <button
              onClick={() => setShowCosts((v) => !v)}
              className={`hidden md:block text-xs font-mono px-2 py-1 rounded-lg border transition-colors ${
                showCosts
                  ? "bg-[#FEF3DC] border-[#C8972A]/30 text-[#C8972A]"
                  : "border-[#e0e0e0] text-[#7a7a7a] hover:text-[#1d1d1f]"
              }`}
              title="Toggle cost breakdown"
            >
              ${costs.total_usd.toFixed(4)}
            </button>
          )}

          {/* Settings toggles — desktop only in this row */}
          <div className="hidden md:block">
            <SettingsToggles phone={phone} settings={settings} onChange={setSettings} />
          </div>
        </div>

        {/* Row 2: toggles — mobile only, shown below the name */}
        <div className="md:hidden flex items-center gap-2 mt-2 pt-2 border-t border-[#f0f0f0]">
          <SettingsToggles phone={phone} settings={settings} onChange={setSettings} />
          {costs.total_usd > 0 && (
            <button
              onClick={() => setShowCosts((v) => !v)}
              className={`ml-auto text-xs font-mono px-2 py-1 rounded-lg border transition-colors ${
                showCosts
                  ? "bg-[#FEF3DC] border-[#C8972A]/30 text-[#C8972A]"
                  : "border-[#e0e0e0] text-[#7a7a7a]"
              }`}
            >
              ${costs.total_usd.toFixed(4)}
            </button>
          )}
        </div>

        {/* Cost breakdown panel */}
        {showCosts && costs.total_usd > 0 && (
          <div className="mt-2 bg-[#fafafc] rounded-xl px-3 py-2 border border-[#e0e0e0]">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[#7a7a7a] text-[10px] uppercase tracking-wide">Cost breakdown</p>
              {settings.translate_model && (
                <span className="text-[#aaa] text-[10px] font-mono">
                  {settings.translate_provider ? `${settings.translate_provider}/` : ""}
                  {settings.translate_model}
                </span>
              )}
            </div>
            <CostRow label="Bot replies" value={costs.bot_usd} color="text-[#C8972A]" />
            {costs.media_usd > 0 && (
              <CostRow label="Transcription" value={costs.media_usd} color="text-amber-600" />
            )}
            {costs.translate_in_usd > 0 && (
              <CostRow label="Translations" value={costs.translate_in_usd} color="text-blue-600" />
            )}
            {costs.translate_out_usd > 0 && (
              <CostRow label="ES→EN" value={costs.translate_out_usd} color="text-purple-600" />
            )}
            <div className="border-t border-[#e0e0e0] mt-1.5 pt-1.5 flex items-center justify-between">
              <span className="text-xs text-[#7a7a7a] font-medium">Total</span>
              <span className="text-xs text-[#1d1d1f] font-mono font-semibold">
                ${costs.total_usd.toFixed(6)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.length === 0 && (
          <p className="text-[#7a7a7a] text-sm text-center mt-10">No messages yet</p>
        )}
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          const isTranslatingThis = translating === msg.id;

          return (
            <div key={msg.id} className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[75%] sm:max-w-[65%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  isUser
                    ? "bg-white text-[#1d1d1f] rounded-tl-sm"
                    : "bg-[#F5E6C8] text-[#1d1d1f] rounded-tr-sm"
                }`}
              >
                <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>

                {isUser && msg.content_translated && (
                  <p className="text-blue-500 text-xs mt-1.5 italic border-t border-[#e0e0e0] pt-1">
                    {msg.content_translated}
                  </p>
                )}

                <div className={`flex items-center mt-1 gap-2 ${isUser ? "justify-between" : "justify-end"}`}>
                  {isUser && !msg.content_translated && (
                    <button
                      onClick={() => handleTranslate(msg.id)}
                      disabled={isTranslatingThis}
                      className="text-[10px] text-[#7a7a7a] hover:text-blue-500 disabled:opacity-40 transition-colors"
                    >
                      {isTranslatingThis ? "translating…" : "translate"}
                    </button>
                  )}
                  {isUser && msg.content_translated && (
                    <span className="text-[10px] text-[#aaa]">ES</span>
                  )}
                  <p className={`text-[10px] ${isUser ? "text-[#aaa]" : "text-[#7a7a7a]"}`}>
                    {formatMsgTime(msg.created_at)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSend}
        className="px-3 py-2 bg-white border-t border-[#e0e0e0] flex items-center gap-2 shrink-0"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={settings.translate_out ? "Write in Spanish…" : "Type a message"}
          className="flex-1 bg-[#f5f5f7] border border-[#e0e0e0] text-[#1d1d1f] text-sm px-4 py-2.5 rounded-full placeholder:text-[#7a7a7a] focus:outline-none focus:border-[#C8972A]/50 transition-colors"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors bg-[#C8972A] hover:bg-[#D4A830] disabled:opacity-40 disabled:bg-[#e0e0e0]"
          aria-label="Send"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
