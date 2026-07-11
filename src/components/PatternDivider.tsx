type PatternDividerProps = {
  pattern?: "kolam" | "dots" | "grid" | "diagonal" | "hex" | "scan";
  flip?: boolean;
};

const PATTERN_CLASS = {
  kolam: "pattern-divider--kolam",
  dots: "pattern-divider--dots",
  grid: "pattern-divider--grid",
  diagonal: "pattern-divider--diagonal",
  hex: "pattern-divider--hex",
  scan: "pattern-divider--scan",
} as const;

/** Slim animated kolam band between sections. */
export const PatternDivider = ({ pattern = "kolam", flip = false }: PatternDividerProps) => (
  <div
    className={`pattern-divider ${PATTERN_CLASS[pattern]} ${flip ? "pattern-divider--flip" : ""}`}
    aria-hidden="true"
  />
);
