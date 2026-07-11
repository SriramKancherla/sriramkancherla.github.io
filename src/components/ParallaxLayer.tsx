import type { CSSProperties, ReactNode } from "react";
import { useParallax } from "@/hooks/use-parallax";

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

export const ParallaxLayer = ({ children, speed = 0.12, className = "", style }: ParallaxLayerProps) => {
  const offset = useParallax(speed);

  return (
    <div
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        ...style,
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};
