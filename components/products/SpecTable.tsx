type Row = { label: string; value: string };

export function SpecTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) return null;
  return (
    <dl className="grid grid-cols-1 border border-border-subtle bg-bg-elevated md:grid-cols-[max-content_1fr]">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`contents ${i > 0 ? "" : ""}`}
        >
          <dt
            className={`font-mono text-xs uppercase tracking-widest text-text-muted px-5 py-4 border-b border-border-subtle md:border-r md:border-b ${
              i === rows.length - 1 ? "md:border-b-0" : ""
            }`}
          >
            {row.label}
          </dt>
          <dd
            className={`font-mono text-sm text-text-primary px-5 py-4 border-b border-border-subtle ${
              i === rows.length - 1 ? "border-b-0 md:border-b-0" : ""
            }`}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

