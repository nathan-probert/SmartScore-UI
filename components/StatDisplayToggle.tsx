interface StatDisplayToggleProps {
  /** true = advanced mode (all stat columns), false = simple mode (summary) */
  advanced: boolean;
  onChange: (advanced: boolean) => void;
}

// Segmented Simple/Advanced control for the stats tables
export function StatDisplayToggle({ advanced, onChange }: StatDisplayToggleProps) {
  const buttonClass = (isActive: boolean) =>
    `px-4 py-1.5 text-sm md:text-base rounded-full transition-colors duration-200 ${
      isActive ? "bg-grey3 text-primary font-semibold" : "text-grey2 hover:text-grey"
    }`;

  return (
    <div
      className="inline-flex items-center gap-1 bg-background rounded-full border border-grey2 p-1"
      role="group"
      aria-label="Stat display mode"
    >
      <button type="button" className={buttonClass(!advanced)} onClick={() => onChange(false)}>
        Simple
      </button>
      <button type="button" className={buttonClass(advanced)} onClick={() => onChange(true)}>
        Advanced
      </button>
    </div>
  );
}
