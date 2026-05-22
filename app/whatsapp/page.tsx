import { Conversation } from "@/app/lib/dashboard-api";
import DashboardShell from "./components/DashboardShell";

async function fetchConversations(): Promise<Conversation[]> {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  try {
    // Server-side fetch — cookies are forwarded by the middleware layer;
    // for the initial SSR fetch we pass no auth cookie (client will hydrate and poll).
    const res = await fetch(`${base}/dashboard/conversations`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function WhatsAppPage() {
  const conversations = await fetchConversations();

  return <DashboardShell initialConversations={conversations} />;
}
