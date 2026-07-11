import { ParallaxLayer } from "./ParallaxLayer";
import { AuroraBackground } from "./AuroraBackground";
import { FluidBackground } from "./FluidBackground";

/** Layered site backdrop — teal/orange mesh + scroll parallax + fluid blobs. */
export const SiteBackground = () => (
  <>
    <ParallaxLayer speed={0.06} className="z-0">
      <AuroraBackground />
    </ParallaxLayer>
    <ParallaxLayer speed={0.1} className="z-[1]">
      <FluidBackground />
    </ParallaxLayer>
  </>
);
