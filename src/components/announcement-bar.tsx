import { useCms } from "@/lib/cms-store";

export function AnnouncementBar() {
  const { settings } = useCms();
  const messages = settings.announcements.length > 0 ? settings.announcements : [""];
  const loop = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="bg-cocoa text-cocoa-foreground text-[10.5px] sm:text-xs">
      <div className="group relative overflow-hidden h-7 sm:h-8">
        <div className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((m, idx) => (
            <span key={idx} className="px-6 sm:px-12 font-medium tracking-wide flex items-center gap-2 sm:gap-3">
              {m}
              <span className="opacity-40">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
