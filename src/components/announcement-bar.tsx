import { useCms } from "@/lib/cms-store";

export function AnnouncementBar() {
  const { settings } = useCms();
  const messages = settings.announcements.length > 0 ? settings.announcements : [""];
  // Repeat enough times for seamless marquee
  const loop = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="bg-cocoa text-cocoa-foreground text-[11px] sm:text-xs">
      <div className="relative overflow-hidden h-7">
        <div className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap animate-marquee">
          {loop.map((m, idx) => (
            <span key={idx} className="px-8 font-medium tracking-wide flex items-center gap-2">
              {m}
              <span className="opacity-40">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
