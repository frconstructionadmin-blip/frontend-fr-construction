const BASE = "/api/backend";

export interface ConversationCosts {
  bot_usd: number;
  media_usd: number;
  translate_in_usd: number;
  translate_out_usd: number;
  total_usd: number;
}

export interface Conversation {
  phone: string;
  name: string | null;
  last_message: string | null;
  last_message_role: string | null;
  last_message_at: string | null;
  bot_enabled: boolean;
  costs: ConversationCosts;
}

export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  content_translated?: string;
  created_at: string;
  media_type: string | null;
  media_url: string | null;
}

export interface ConversationSettings {
  bot_enabled: boolean;
  translate_in: boolean;
  translate_out: boolean;
  translate_in_cost_usd: number;
  translate_out_cost_usd: number;
  translate_in_tokens: number;
  translate_out_tokens: number;
  translate_provider: string | null;
  translate_model: string | null;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export const dashboardApi = {
  listConversations: () =>
    apiFetch<Conversation[]>("/dashboard/conversations"),

  getMessages: (phone: string) =>
    apiFetch<Message[]>(`/dashboard/conversations/${encodeURIComponent(phone)}/messages`),

  getSettings: (phone: string) =>
    apiFetch<ConversationSettings>(`/dashboard/conversations/${encodeURIComponent(phone)}/settings`),

  patchSettings: (phone: string, patch: Partial<ConversationSettings>) =>
    apiFetch<ConversationSettings>(`/dashboard/conversations/${encodeURIComponent(phone)}/settings`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }),

  sendMessage: (phone: string, text: string) =>
    apiFetch<{ sent: string; original: string }>(`/dashboard/conversations/${encodeURIComponent(phone)}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }),

  translateMessage: (phone: string, messageId: number) =>
    apiFetch<{ content_translated: string; cached: boolean }>(
      `/dashboard/conversations/${encodeURIComponent(phone)}/messages/${messageId}/translate`,
      { method: "POST" }
    ),
};
