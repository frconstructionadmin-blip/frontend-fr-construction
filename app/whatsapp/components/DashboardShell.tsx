"use client";

import { useEffect, useState } from "react";
import { Conversation, ConversationCosts } from "@/app/lib/dashboard-api";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

async function subscribeToPush() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const reg = await navigator.serviceWorker.ready;

  const vapidRes = await fetch("/api/backend/dashboard/push/vapid-public-key");
  if (!vapidRes.ok) return;
  const { publicKey } = await vapidRes.json();
  if (!publicKey) return;

  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  const { endpoint, keys } = subscription.toJSON() as {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  };

  await fetch("/api/backend/dashboard/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint, p256dh: keys.p256dh, auth: keys.auth }),
  });
}

interface Props {
  initialConversations: Conversation[];
}

const ZERO_COSTS: ConversationCosts = {
  bot_usd: 0, media_usd: 0, translate_in_usd: 0, translate_out_usd: 0, total_usd: 0,
};

export default function DashboardShell({ initialConversations }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    subscribeToPush().catch(() => {});
  }, []);

  const selectedConv = conversations.find((c) => c.phone === selectedPhone) ?? null;

  function handleSelect(phone: string) {
    setSelectedPhone(phone);
    setChatOpen(true);
  }

  return (
    <div className="flex h-screen bg-[#f5f5f7] overflow-hidden">
      {/* Sidebar — full width on mobile (when chat closed), fixed width on desktop */}
      <div
        className={`flex flex-col w-full md:w-[360px] lg:w-[420px] shrink-0 border-r border-[#e0e0e0] ${
          chatOpen ? "hidden md:flex" : "flex"
        }`}
      >
        <ConversationList
          initialConversations={conversations}
          onConversationsUpdate={setConversations}
          selectedPhone={selectedPhone}
          onSelect={handleSelect}
        />
      </div>

      {/* Chat area */}
      <div
        className={`flex-col flex-1 min-w-0 ${
          chatOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {selectedPhone ? (
          <ChatWindow
            phone={selectedPhone}
            name={selectedConv?.name ?? null}
            initialCosts={selectedConv?.costs ?? ZERO_COSTS}
            onBack={() => setChatOpen(false)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-[#fafafc]">
            <p className="text-[#7a7a7a] text-sm">Select a conversation to start</p>
          </div>
        )}
      </div>
    </div>
  );
}
