import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { AuroraBackground } from "./AuroraBackground";
import { StrawHat } from "./StrawHat";
import { prepareHomeIntro } from "@/lib/intro";
import { NAME_HERO_TITLE_CLASS } from "@/lib/site";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Phase = "typing" | "hat" | "hold" | "morph" | "exit";

type NameIntroProps = {
  targetRef: React.RefObject<HTMLHeadingElement>;
  onComplete: () => void;
};

export const NameIntro = ({ targetRef, onComplete }: NameIntroProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const introRef = useRef<HTMLDivElement>(null);
  const introTitleRef = useRef<HTMLHeadingElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("typing");
  const [writeDone, setWriteDone] = useState(false);
  const [morphStyle, setMorphStyle] = useState<React.CSSProperties>({});
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [hatLanded, setHatLanded] = useState(false);
  const [hatVisible, setHatVisible] = useState(false);
  const [hatPos, setHatPos] = useState<{ x: number; y: number } | null>(null);
  const finishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
  }, [onComplete]);

  const updateHatPosition = useCallback(() => {
    const first = firstNameRef.current;
    const intro = introRef.current;
    if (!first || !intro) return;

    const firstRect = first.getBoundingClientRect();
    const introRect = intro.getBoundingClientRect();

    setHatPos({
      x: firstRect.left - introRect.left + firstRect.width / 2,
      y: firstRect.top - introRect.top - 4,
    });
  }, []);

  useLayoutEffect(() => {
    prepareHomeIntro();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      finishIntro();
    }
  }, [prefersReducedMotion, finishIntro]);

  useEffect(() => {
    const safety = setTimeout(finishIntro, 9000);
    return () => clearTimeout(safety);
  }, [finishIntro]);

  useEffect(() => {
    if (phase !== "typing") return;
    const fallback = setTimeout(() => {
      setWriteDone((done) => {
        if (!done) setPhase("hat");
        return true;
      });
    }, 3200);
    return () => clearTimeout(fallback);
  }, [phase]);

  const handleWriteEnd = useCallback(() => {
    if (writeDone) return;
    setWriteDone(true);
    setTimeout(() => setPhase("hat"), 350);
  }, [writeDone]);

  useLayoutEffect(() => {
    if (!writeDone) return;
    updateHatPosition();
  }, [writeDone, updateHatPosition]);

  useEffect(() => {
    if (!hatVisible) return;
    updateHatPosition();
    window.addEventListener("resize", updateHatPosition);
    return () => window.removeEventListener("resize", updateHatPosition);
  }, [hatVisible, updateHatPosition]);

  useEffect(() => {
    if (phase !== "hat") return;

    updateHatPosition();
    setHatVisible(true);
    const dropFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setHatLanded(true));
    });

    const landTimer = setTimeout(() => setPhase("hold"), 950);

    return () => {
      cancelAnimationFrame(dropFrame);
      clearTimeout(landTimer);
    };
  }, [phase, updateHatPosition]);

  useEffect(() => {
    if (phase !== "hold") return;
    const timer = setTimeout(() => setPhase("morph"), 700);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "morph") return;
    setHatVisible(false);
  }, [phase]);

  const runMorph = useCallback(() => {
    const introTitle = introTitleRef.current;
    const target = targetRef.current;
    if (!introTitle || !target) {
      finishIntro();
      return;
    }

    const iRect = introTitle.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const introFont = parseFloat(getComputedStyle(introTitle).fontSize);
    const targetFont = parseFloat(getComputedStyle(target).fontSize);
    const scale = introFont > 0 ? targetFont / introFont : 1;

    const dx = tRect.left + tRect.width / 2 - (iRect.left + iRect.width / 2);
    const dy = tRect.top + tRect.height / 2 - (iRect.top + iRect.height / 2);

    setMorphStyle({
      transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
      transformOrigin: "center center",
      transition: "transform 1.35s cubic-bezier(0.22, 1, 0.36, 1)",
    });
  }, [targetRef, finishIntro]);

  useEffect(() => {
    if (phase !== "morph") return;

    let frame = 0;
    const startMorph = () => {
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(runMorph);
      });
    };
    startMorph();

    const completeTimer = setTimeout(() => {
      finishIntro();
      setPhase("exit");
      setOverlayOpacity(0);
    }, 1360);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(completeTimer);
    };
  }, [phase, runMorph, finishIntro]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none overflow-visible"
      style={{
        opacity: overlayOpacity,
        transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      aria-hidden={phase === "exit"}
    >
      <div className="absolute inset-0 bg-background overflow-hidden">
        <AuroraBackground />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--primary) / 0.1), transparent 70%)",
          }}
        />
      </div>

      <div
        ref={introRef}
        className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 sm:px-6 overflow-visible"
      >
        {hatVisible && hatPos && phase !== "morph" && phase !== "exit" && (
          <div
            className={`name-intro-hat ${!hatLanded ? "name-intro-hat--drop" : ""}`}
            style={{
              left: hatPos.x,
              top: hatLanded ? hatPos.y : "-120vh",
              opacity: 1,
              transition: hatLanded
                ? "top 0.8s cubic-bezier(0.34, 1.45, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.45, 0.64, 1), opacity 0.35s ease"
                : "top 0.05s linear, transform 0.05s linear, opacity 0.25s ease",
            }}
          >
            <StrawHat
              landed={hatLanded}
              className={`w-full h-full ${hatLanded && phase === "hold" ? "hat-wobble-anim" : ""}`}
            />
          </div>
        )}

        <h1
          ref={introTitleRef}
          className={`relative z-10 ${NAME_HERO_TITLE_CLASS} will-change-transform overflow-visible`}
          style={{
            ...morphStyle,
            visibility: phase === "exit" ? "hidden" : "visible",
          }}
        >
          <span
            className={`name-intro-reveal ${writeDone ? "name-intro-reveal--done" : ""}`}
            onAnimationEnd={handleWriteEnd}
          >
            <span ref={firstNameRef} className="text-foreground">
              Sriram
            </span>{" "}
            <span className="text-gradient">Kancherla</span>
            {phase === "typing" && !writeDone && (
              <span className="name-intro-cursor" aria-hidden="true" />
            )}
          </span>
        </h1>
      </div>
    </div>
  );
};
