/** Small flags as SVG (emoji flags don't render on Windows). */
export function FlagES({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  );
}

export function FlagUS({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#B22234" />
      {[1, 3, 5, 7, 9, 11].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#fff" />
      ))}
      <rect width="13" height={(20 / 13) * 7} fill="#3C3B6E" />
      {[2, 5.5, 9].map((x) =>
        [2, 5, 8].map((y) => <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.3} r="0.8" fill="#fff" />),
      )}
    </svg>
  );
}
