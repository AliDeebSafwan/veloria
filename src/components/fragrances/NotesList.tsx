import { cn } from "@/lib/utils";

interface NotesListProps {
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  className?: string;
}

export function NotesList({
  topNotes,
  heartNotes,
  baseNotes,
  className,
}: NotesListProps) {
  const rows = [
    { label: "TOP", notes: topNotes },
    { label: "HEART", notes: heartNotes },
    { label: "BASE", notes: baseNotes },
  ];

  return (
    <dl
      className={cn(
        "flex flex-col divide-y divide-gold-core/15 border-t border-gold-core/15",
        className,
      )}
    >
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline gap-6 py-3">
          <dt className="w-14 shrink-0 text-[10px] font-medium tracking-[0.3em] text-gold-deep">
            {row.label}
          </dt>
          <dd className="font-serif text-[15px] italic leading-relaxed text-ink/80">
            {row.notes.join(" · ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
