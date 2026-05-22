"use client";

import { useState } from "react";
import { Conversation, ConversationCosts } from "@/app/lib/dashboard-api";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

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
