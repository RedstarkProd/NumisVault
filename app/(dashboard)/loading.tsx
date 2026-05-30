import { Panel } from "@/components/ui/panel";

export default function Loading() {
  return (
    <div className="grid gap-4">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-white/10" />
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Panel key={item} className="h-32 animate-pulse" />
        ))}
      </div>
      <Panel className="h-80 animate-pulse" />
    </div>
  );
}
