import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
}) {
  const btn =
    "grid size-11 place-items-center text-purple transition-colors hover:bg-purple-tint disabled:text-subtle disabled:hover:bg-transparent";
  return (
    <div role="group" aria-label={`Quantity for ${label}`} className="inline-flex items-center rounded-md border border-subtle bg-surface">
      <button type="button" className={btn} aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(value - 1)}>
        <Minus className="size-4" />
      </button>
      <output aria-live="polite" className="w-8 text-center font-heading text-[0.9375rem] font-semibold tabular-nums">
        {value}
      </output>
      <button type="button" className={btn} aria-label="Increase quantity" onClick={() => onChange(value + 1)}>
        <Plus className="size-4" />
      </button>
    </div>
  );
}
