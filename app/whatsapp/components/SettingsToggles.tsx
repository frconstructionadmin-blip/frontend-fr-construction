"use client";

import { ConversationSettings, dashboardApi } from "@/app/lib/dashboard-api";

interface Props {
  phone: string;
  settings: ConversationSettings;
  onChange: (updated: ConversationSettings) => void;
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  activeColor?: string;
}

function Toggle({ label, checked, onToggle, activeColor = "bg-[#C8972A]" }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-[#f5f5f7] transition-colors text-xs"
    >
      <span
        className={`relative inline-flex w-8 h-4 rounded-full transition-colors ${checked ? activeColor : "bg-[#e0e0e0]"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`}
        />
      </span>
      <span className="text-[#7a7a7a] whitespace-nowrap">{label}</span>
    </button>
  );
}

export default function SettingsToggles({ phone, settings, onChange }: Props) {
  async function toggle(field: keyof ConversationSettings) {
    const updated = { ...settings, [field]: !settings[field] };
    onChange(updated);
    try {
      const result = await dashboardApi.patchSettings(phone, { [field]: updated[field] });
      onChange(result);
    } catch {
      onChange(settings);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Toggle
        label="Bot"
        checked={settings.bot_enabled}
        onToggle={() => toggle("bot_enabled")}
        activeColor="bg-[#C8972A]"
      />
      <Toggle
        label="ES→EN"
        checked={settings.translate_out}
        onToggle={() => toggle("translate_out")}
        activeColor="bg-[#7a7a7a]"
      />
    </div>
  );
}
