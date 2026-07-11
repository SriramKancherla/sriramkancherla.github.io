import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { NUS_CREDENTIALS_URL } from "@/lib/site";

type Category = "All" | "ML" | "Analytics" | "AI" | "Full-Stack";

type Project = {
  title: string;
  period: string;
  category: Category[];
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  codeUrl?: string;
  liveUrl?: string;
  highlightLive?: boolean;
  detailsUrl?: string;
  detailsLabel?: string;
};

const projects: Project[] = [
  {
    title: "Image Based Wafer Map Pattern Intelligence",
    period: "Feb 2026 — Present",
    category: ["ML", "AI"] as Category[],
    description:
      "End-to-end computer vision pipeline classifying silicon semiconductor wafer defect patterns using a CNN. Handles variable wafer sizes, legacy dataset formats, and evaluates performance with confusion matrices — tackling real ML engineering challenges in semiconductor yield analysis.",
    tech: ["Python", "PyTorch", "OpenCV", "NumPy", "Pandas", "scikit-learn"],
    metrics: [
      { label: "Defect Classes", value: "8+" },
      { label: "Train/Test Split", value: "80/20" },
      { label: "Domain", value: "Semiconductor" },
    ],
    codeUrl: "https://github.com/SriramKancherla/Image-based-Wafer-Map-Pattern-intelligence",
  },
  {
    title: "Ainvestify — Stock Insights",
    period: "Dec 2025 — Present",
    category: ["ML", "Full-Stack", "Analytics"] as Category[],
    description:
      "Full-stack stock analysis platform with ML-driven fundamentals scoring, news sentiment, and interactive charts. Live on Render — try the website for stock insights, comparisons, and an AI chatbot backed by production FastAPI endpoints.",
    tech: ["Python", "FastAPI", "XGBoost", "TensorFlow", "Docker", "REST APIs"],
    metrics: [
      { label: "ML Models", value: "4+" },
      { label: "API Endpoints", value: "5" },
      { label: "Deployed", value: "Render" },
    ],
    codeUrl: "https://github.com/SriramKancherla/AInvestify",
    liveUrl: "https://ainvestify.onrender.com",
    highlightLive: true,
  },
  {
    title: "Shiksha Sahayak",
    period: "Feb 2026",
    category: ["AI", "Full-Stack"] as Category[],
    description:
      "Full-stack learning platform running entirely on local infrastructure with a locally hosted LLM. Teachers upload study material to auto-generate worksheets and assessments; students interact with a context-aware AI tutor powered by FAISS semantic search and embeddings.",
    tech: ["FastAPI", "Streamlit", "MySQL", "FAISS", "JWT", "Firebase"],
    metrics: [
      { label: "Auth", value: "JWT" },
      { label: "Search", value: "FAISS" },
      { label: "Privacy", value: "Local LLM" },
    ],
    codeUrl: "https://github.com/SriramKancherla/Shiksha-Sahayak",
  },
  {
    title: "Healthcare Analytics — IITK D&G Capstone",
    period: "Sep 2025 — Nov 2025",
    category: ["ML", "Analytics"] as Category[],
    description:
      "Healthcare analytics project predicting 30-day hospital readmission risk using patient demographics, medical history, admission details, procedures, and discharge outcomes — helping hospitals identify high-risk patients and reduce avoidable costs.",
    tech: ["Machine Learning", "Data Analytics", "Python", "scikit-learn"],
    metrics: [
      { label: "Risk Window", value: "30 days" },
      { label: "Data Sources", value: "6+" },
      { label: "Partner", value: "IITK D&G" },
    ],
    codeUrl: "https://github.com/SriramKancherla/Healthcare-Management---IITK-D-G-Capstone-Project",
    detailsUrl: "/documents/iitk-dg-professional-certificate.pdf",
    detailsLabel: "Certificate",
  },
  {
    title: "Insider Threat Detection",
    period: "Aug 2025 — Oct 2025",
    category: ["ML", "AI"] as Category[],
    description:
      "User Behavior Analytics (UBA) system using the CERT Insider Threat dataset. Fused logon, email, HTTP, file, and USB logs into a unified dataset, engineered behavioral features, and built a hybrid anomaly pipeline with Autoencoders, Isolation Forest, and LightGBM.",
    tech: ["Python", "LightGBM", "Autoencoders", "Isolation Forest", "UBA"],
    metrics: [
      { label: "Log Sources", value: "5" },
      { label: "Models", value: "3" },
      { label: "Features", value: "120+" },
    ],
    detailsUrl: NUS_CREDENTIALS_URL,
    detailsLabel: "NUS Certificate",
  },
];

const filters: Category[] = ["All", "ML", "AI", "Analytics", "Full-Stack"];

export const Projects = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category.includes(active));

  return (
    <section id="projects" className="section-fluid fluid-section pattern-section pattern-section--kolam relative">
      <div className="container max-w-4xl relative z-[1]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <SectionEyebrow index="03">Projects</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Things I've built.</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`text-sm transition-colors ${
                    active === f
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="divide-y divide-border/70 border-t border-border/70">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <article className="py-8 md:py-10">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mono text-xs text-muted-foreground mb-2">
                  <span>{p.period}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.category.join(", ")}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{p.title}</h3>
                {p.highlightLive && p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mb-3"
                  >
                    <ExternalLink size={14} />
                    ainvestify.onrender.com
                  </a>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">{p.description}</p>
                <p className="text-sm text-muted-foreground mb-2">
                  {p.metrics.map((m) => `${m.value} ${m.label}`).join(" · ")}
                </p>
                <p className="text-sm text-muted-foreground mb-5">{p.tech.join(" · ")}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      {p.highlightLive ? "Visit website" : "Live"}
                    </a>
                  )}
                  {p.codeUrl && (
                    <a
                      href={p.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  )}
                  {p.detailsUrl && (
                    <a
                      href={p.detailsUrl}
                      target={p.detailsUrl.startsWith("http") ? "_blank" : undefined}
                      rel={p.detailsUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      {p.detailsLabel ?? "Details"}
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
