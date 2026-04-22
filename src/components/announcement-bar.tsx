import { useEffect, useState } from "react";
import { useCms } from "@/lib/cms-store";

export function AnnouncementBar() {
  const { settings } = useCms();
  const messages = settings.announcements.length > 0 ? settings.announcements : [""];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (messages.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % messages.length), 3500);
    return () => clearInterval(t);
  }, [messages.length]);
  return (
    <div className="bg-cocoa text-cocoa-foreground text-xs sm:text-sm">
      <div className="container mx-auto px-4 py-2.5 text-center font-medium tracking-wide overflow-hidden h-9 relative">
        {messages.map((m, idx) => (
          <div
            key={`${idx}-${m}`}
            className="absolute inset-0 flex items-center justify-center transition-all duration-700"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: `translateY(${i === idx ? 0 : 12}px)`,
            }}
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  );
}
