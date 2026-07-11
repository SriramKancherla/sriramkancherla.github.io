import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Cloud,
  Container,
  Database,
  GitBranch,
  Globe,
  Layout,
  Server,
  Sheet,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

type CategoryId = "frontend" | "backend" | "devops" | "databases" | "cloud" | "other";

type Category = {
  id: CategoryId;
  icon: typeof Layout;
  label: string;
  skills: string[];
};

type StackItem = {
  name: string;
  categories: CategoryId[];
  icon?: string;
  IconFallback?: typeof Globe;
};

const categories: Category[] = [
  {
    id: "frontend",
    icon: Layout,
    label: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "React Native"],
  },
  {
    id: "backend",
    icon: Server,
    label: "Backend",
    skills: ["JavaScript", "Node.js", "Firebase", "Python", "FastAPI", "REST APIs", "Postman API"],
  },
  {
    id: "devops",
    icon: Container,
    label: "DevOps",
    skills: ["Docker", "Git", "GitHub", "CI/CD"],
  },
  {
    id: "databases",
    icon: Database,
    label: "Databases",
    skills: ["MySQL", "SQL", "FAISS"],
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "Cloud",
    skills: ["AWS", "OCI", "AWS Glue", "Amazon S3"],
  },
  {
    id: "other",
    icon: Boxes,
    label: "Other",
    skills: [
      "Python",
      "MATLAB",
      "C/C++",
      "Tableau",
      "Excel",
      "TensorFlow",
      "PyTorch",
      "Java",
      "scikit-learn",
    ],
  },
];

const SKILL_ICONS = "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons";
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

const stackMeta: Record<string, Pick<StackItem, "icon" | "IconFallback">> = {
  HTML: { icon: SI("html5") },
  CSS: { icon: SI("css") },
  "React.js": { icon: SI("react") },
  "React Native": { icon: `${DEVICON}/reactnative/reactnative-original.svg` },
  JavaScript: { icon: SI("javascript") },
  "Node.js": { icon: SI("nodedotjs") },
  Firebase: { icon: SI("firebase") },
  Python: { icon: SI("python") },
  FastAPI: { icon: SI("fastapi") },
  "REST APIs": { IconFallback: Globe },
  "Postman API": { icon: SI("postman") },
  Docker: { icon: SI("docker") },
  Git: { icon: SI("git") },
  GitHub: { icon: SI("github") },
  "CI/CD": { IconFallback: GitBranch },
  MySQL: { icon: SI("mysql") },
  SQL: { icon: SI("postgresql") },
  FAISS: { IconFallback: Database },
  AWS: { icon: `${SKILL_ICONS}/AWS-Dark.svg` },
  OCI: { icon: `${DEVICON}/oracle/oracle-original.svg` },
  "AWS Glue": { icon: `${SKILL_ICONS}/AWS-Dark.svg` },
  "Amazon S3": { icon: `${SKILL_ICONS}/AWS-Dark.svg` },
  MATLAB: { icon: `${DEVICON}/matlab/matlab-original.svg` },
  "C/C++": { icon: SI("cplusplus") },
  Tableau: { IconFallback: BarChart3 },
  Excel: { IconFallback: Sheet },
  TensorFlow: { icon: SI("tensorflow") },
  PyTorch: { icon: SI("pytorch") },
  Java: { icon: SI("openjdk") },
  "scikit-learn": { icon: SI("scikitlearn") },
};

const workStack = (() => {
  const seen = new Set<string>();
  const items: StackItem[] = [];

  for (const cat of categories) {
    for (const skill of cat.skills) {
      const existing = items.find((item) => item.name === skill);
      if (existing) {
        if (!existing.categories.includes(cat.id)) {
          existing.categories.push(cat.id);
        }
      } else if (!seen.has(skill)) {
        seen.add(skill);
        items.push({
          name: skill,
          categories: [cat.id],
          ...stackMeta[skill],
        });
      }
    }
  }

  return items;
})();

function shuffleStack<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function StackBadge({
  item,
  highlighted,
  active,
}: {
  item: StackItem;
  highlighted: boolean;
  active: boolean;
}) {
  const [iconFailed, setIconFailed] = useState(false);
  const Fallback = item.IconFallback ?? Boxes;
  const showFallback = !item.icon || iconFailed;

  return (
    <span
      className={`inline-flex items-center gap-2 mono text-xs px-3 py-2 rounded-xl border transition-all duration-300 cursor-default ${
        highlighted
          ? active
            ? "border-primary/50 bg-primary/15 text-foreground scale-105 shadow-[0_0_20px_-8px_hsl(var(--primary)/0.6)]"
            : "border-border bg-secondary/50 text-foreground/90"
          : "border-border/40 bg-secondary/20 text-muted-foreground/40 scale-[0.97] blur-[0.3px]"
      }`}
    >
      {showFallback ? (
        <Fallback
          size={14}
          className={`shrink-0 transition-opacity duration-300 ${
            highlighted ? "text-primary opacity-100" : "opacity-40"
          }`}
        />
      ) : (
        <img
          src={item.icon}
          alt=""
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 object-contain transition-opacity duration-300 ${
            highlighted ? "opacity-100" : "opacity-40"
          }`}
          loading="lazy"
          onError={() => setIconFailed(true)}
        />
      )}
      <span>{item.name}</span>
    </span>
  );
}

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const shuffledStack = useMemo(() => shuffleStack(workStack), []);

  return (
    <section id="skills" className="section-fluid fluid-section pattern-section pattern-section--kolam relative">
      <div className="container relative z-[1]">
        <Reveal>
          <div className="mb-14 max-w-3xl">
            <SectionEyebrow index="04">Skills</SectionEyebrow>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & technologies.</h2>
            <p className="text-lg text-muted-foreground">
              Hover a skill area to see the tools and technologies I use in that domain.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.4fr)] gap-8 lg:gap-6 items-start">
            <div className="glass rounded-3xl p-6 md:p-8 fluid-glow">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                Skills
              </h3>
              <ul className="space-y-2" role="list">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const Icon = cat.icon;

                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
                          isActive
                            ? "border-primary/50 bg-primary/10 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.45)]"
                            : "border-border/60 bg-card/30 hover:border-primary/30 hover:bg-card/50"
                        }`}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        onMouseLeave={() => setActiveCategory(null)}
                        onFocus={() => setActiveCategory(cat.id)}
                        onBlur={() => setActiveCategory(null)}
                      >
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${
                            isActive
                              ? "border-primary/40 bg-gradient-to-br from-primary/25 to-accent/25"
                              : "border-border bg-secondary/40 group-hover:border-primary/30"
                          }`}
                        >
                          <Icon size={18} className={isActive ? "text-primary" : "text-muted-foreground"} />
                        </span>
                        <span className="flex-1">
                          <span className={`block font-semibold ${isActive ? "text-gradient" : "text-foreground"}`}>
                            {cat.label}
                          </span>
                          <span className="mono text-[11px] text-muted-foreground">
                            {cat.skills.length} tools
                          </span>
                        </span>
                        <ArrowRight
                          size={16}
                          className={`shrink-0 transition-all duration-300 ${
                            isActive ? "translate-x-0.5 text-primary opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-60"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="hidden lg:flex items-center justify-center self-center pt-10" aria-hidden="true">
              <ArrowRight
                size={22}
                className={`text-primary transition-all duration-300 ${
                  activeCategory ? "opacity-100 translate-x-1" : "opacity-25"
                }`}
              />
            </div>

            <div className="glass rounded-3xl p-6 md:p-8 fluid-glow min-h-[320px]">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                Work Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {shuffledStack.map((item) => {
                  const isHighlighted =
                    activeCategory === null || item.categories.includes(activeCategory);

                  return (
                    <StackBadge
                      key={item.name}
                      item={item}
                      highlighted={isHighlighted}
                      active={activeCategory !== null}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
