import { cn } from "@/lib/utils";
import { CUSTOM_PRESET, PRESETS } from "./presets";

type DatasetSidebarProps = {
  selectedId: string;
  disabled: boolean;
  onSelect: (id: string) => void;
};

export function DatasetSidebar({
  selectedId,
  disabled,
  onSelect,
}: DatasetSidebarProps) {
  const all = [...PRESETS, CUSTOM_PRESET];
  return (
    <div className="flex w-48 shrink-0 flex-col gap-1">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Presets
      </p>
      {all.map((preset) => {
        const Icon = preset.icon;
        const active = selectedId === preset.id;
        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => !disabled && onSelect(preset.id)}
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors",
              active
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              disabled && "pointer-events-none opacity-50",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{preset.title}</span>
          </button>
        );
      })}
    </div>
  );
}
