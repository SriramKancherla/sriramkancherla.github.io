import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowRight, FileText, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TechBackground } from "./TechBackground";
import { CinematicBackdrop } from "./CinematicBackdrop";
import { NameIntro } from "./NameIntro";
import { FluidMarquee } from "./FluidMarquee";
import { LINKEDIN_URL, RESUME_PAGE_PATH, NAME_HERO_TITLE_CLASS, ROLE_LINE, ROLES_LINE } from "@/lib/site";
import { prepareHomeIntro, hasIntroCompleted, markIntroCompleted } from "@/lib/intro";

function shouldPlayIntro() {
  if (hasIntroCompleted()) return false;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  return true;
}

export const Hero = ({ onIntroComplete }: { onIntroComplete?: () => void }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro());
  const [showIntro, setShowIntro] = useState(() => shouldPlayIntro());

  const handleIntroComplete = useCallback(() => {
    markIntroCompleted();
    prepareHomeIntro();
    setIntroDone(true);
    onIntroComplete?.();
    setShowIntro(false);
  }, [onIntroComplete]);

  useEffect(() => {
    if (!shouldPlayIntro()) {
      markIntroCompleted();
      onIntroComplete?.();
    }
  }, [onIntroComplete]);

  useEffect(() => {
    if (introDone) return;
    const fallback = setTimeout(handleIntroComplete, 9000);
    return () => clearTimeout(fallback);
  }, [introDone, handleIntroComplete]);

  return (
    <section id="hero" className="relative z-10 min-h-[100dvh] flex flex-col justify-center pt-24 sm:pt-28 pb-0 overflow-hidden pattern-section pattern-section--kolam">
      {showIntro && (
        <NameIntro targetRef={titleRef} onComplete={handleIntroComplete} />
      )}

      <CinematicBackdrop />

      <div className="absolute inset-0 opacity-20">
        <TechBackground />
      </div>

      <div className="container relative z-10 flex-1 flex items-center pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <h1
              ref={titleRef}
              className={`${NAME_HERO_TITLE_CLASS} mb-4`}
              style={{
                opacity: introDone ? 1 : 0,
              }}
            >
              <span className="text-foreground">Sriram</span>{" "}
              <span className="text-gradient">Kancherla</span>
            </h1>

            <p
              className="mono text-sm text-muted-foreground mb-4"
              style={{
                opacity: introDone ? 1 : 0,
                transform: introDone ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
            >
              {ROLE_LINE}
            </p>
          </div>

          <p
            className="text-sm md:text-base text-muted-foreground mb-4"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {ROLES_LINE}
          </p>

          <div
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.28s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.28s",
            }}
          >
            <MapPin size={14} className="text-primary" />
            <span>Vellore, Tamil Nadu, India</span>
          </div>

          <p
            className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.36s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.36s",
            }}
          >
            Computer Science student at VIT Vellore. I build machine learning pipelines,
            analytics workflows, and deployed applications — with work spanning finance, healthcare,
            and cybersecurity.
          </p>

          <div
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto px-2 sm:px-0"
            style={{
              opacity: introDone ? 1 : 0,
              transform: introDone ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.44s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.44s",
            }}
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#projects">
                View Projects <ArrowRight size={16} className="ml-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to={RESUME_PAGE_PATH}>
                <FileText size={16} className="mr-1" /> View Resume
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Mail size={16} className="mr-1" /> Connect on LinkedIn
              </a>
            </Button>
          </div>

        </div>
      </div>

      <FluidMarquee
        className="relative z-10 mt-auto"
        items={["Portfolio", ROLE_LINE, ROLES_LINE, "Vellore, India", "Open to opportunities", "ML · Analytics · Full-Stack"]}
        speed="slow"
      />
    </section>
  );
};
