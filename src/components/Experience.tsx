import { Briefcase, FileText, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { NUS_CREDENTIALS_URL } from "@/lib/site";

const experiences = [
  {
    role: "Machine Learning Engineering Intern",
    company: "FlyRank AI (FlyRank Corp.)",
    period: "Jul 2026 — Aug 2026",
    location: "Remote · 8 weeks",
    description:
      "Accepted into the FlyRank AI Internship program as a Machine Learning Engineering Intern. An 8-week program (Jul 1 – Aug 26, 2026) focused on real-world ML engineering workflows, experimentation, and production-grade pipelines.",
    tags: ["Machine Learning", "ML Engineering", "FlyRank AI"],
    documents: [] as { label: string; href: string; external?: boolean }[],
  },
  {
    role: "Academic Intern",
    company: "National University of Singapore (NUS)",
    period: "Jun 2025",
    location: "Singapore",
    description:
      "Conducted exploratory data analysis on large-scale user activity and system log data to identify behavioral patterns and insider threat indicators. Built and evaluated a machine learning model for insider threat detection using Big Data Analytics and Deep Learning concepts, presenting findings under faculty supervision.",
    tags: ["EDA", "Insider Threat Detection", "Deep Learning", "Research"],
    documents: [
      {
        label: "NUS Digital Certificate",
        href: NUS_CREDENTIALS_URL,
        external: true,
      },
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="section-fluid fluid-section pattern-section pattern-section--kolam relative">
      <div className="container relative z-[1]">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <SectionEyebrow index="02">Experience</SectionEyebrow>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Where I've been building.</h2>
            <p className="text-lg text-muted-foreground">
              Academic research at NUS and an upcoming ML engineering internship at FlyRank AI — with verified credentials where available.
            </p>
          </div>
        </Reveal>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/30 to-transparent" aria-hidden="true" />

          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 100}>
              <div className={`relative grid md:grid-cols-2 gap-6 mb-14 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                <div className={`md:pr-12 ${i % 2 === 1 ? "md:pl-12 md:pr-0 md:[direction:ltr]" : ""}`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 grid place-items-center h-9 w-9 rounded-full glass-strong border-2 border-primary/50 z-10">
                    <Briefcase size={14} className="text-primary" />
                  </div>
                  <div className="pl-14 md:pl-0 md:[direction:ltr]">
                    <div className="glass rounded-2xl p-6 hover-lift fluid-glow">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mono text-xs text-primary mb-2">
                        <span>{exp.period}</span>
                        <span>·</span>
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                      <p className="text-accent font-medium mb-3">{exp.company}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.tags.map((t) => (
                          <span key={t} className="mono text-[11px] px-2 py-1 rounded-md bg-secondary/60 border border-border text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                      {exp.documents.length > 0 && (
                        <div className="pt-4 border-t border-border/50 space-y-2">
                          <p className="mono text-[10px] uppercase tracking-wider text-muted-foreground">Verification</p>
                          {exp.documents.map((doc) => (
                            <a
                              key={doc.label}
                              href={doc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs text-primary hover:underline transition-colors"
                            >
                              <FileText size={13} />
                              {doc.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
