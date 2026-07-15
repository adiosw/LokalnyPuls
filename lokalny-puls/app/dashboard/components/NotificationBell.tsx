"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Notification = {
  id: string;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
};

export default function NotificationBell({ businessId }: { businessId: string }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("notifications")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data }) => setNotifications(data ?? []));

    // Nasłuchujemy nowych powiadomień na żywo (Supabase Realtime)
    const channel = supabase
      .channel("notifications-" + businessId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `business_id=eq.${businessId}` },
        (payload) => setNotifications((prev) => [payload.new as Notification, ...prev])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [businessId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = async () => {
    const supabase = createClient();
    await supabase.from("notifications").update({ read: true }).eq("business_id", businessId);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          if (!open && unreadCount > 0) markAllRead();
        }}
        className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-white/10 font-bold text-sm">Powiadomienia</div>
          {notifications.length === 0 ? (
            <p className="p-6 text-center text-white/40 text-sm">Brak powiadomień</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-4 border-b border-white/5 last:border-0 text-sm text-white/80">
                {n.message}
                <p className="text-white/30 text-xs mt-1">
                  {new Date(n.created_at).toLocaleDateString("pl-PL")}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
