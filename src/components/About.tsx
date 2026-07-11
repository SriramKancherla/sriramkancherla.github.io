import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

const highlights = [
  {
    title: "Education",
    body: "B.Tech in Computer Science & Engineering at VIT Vellore (Aug 2023 – Aug 2027). Coursework in DSA, OOP, NLP, and AI/ML.",
  },
  {
    title: "Focus Areas",
    body: "Machine learning, data analytics, and finance — plus computer vision, NLP, anomaly detection, and full-stack ML apps with FastAPI and Docker.",
  },
  {
    title: "Goal",
    body: "Ship impactful AI products in industry — combining rigorous ML engineering with clean, scalable software design.",
  },
  {
    title: "Languages",
    body: "English, Telugu & Tamil (native). Hindi & French (elementary).",
  },
];

export const About = () => {
  return (
    <section id="about" className="section-fluid fluid-section pattern-section pattern-section--kolam relative">
      <div className="container relative z-[1]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionEyebrow index="01">About</SectionEyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
                CS undergrad at VIT.{" "}
                <span className="text-gradient">ML & data analytics.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                I study Computer Science at VIT Vellore (2023–2027) and focus on turning raw data into
                models and tools people can actually use — from training and evaluation through APIs,
                dashboards, and deployment.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <article className="glass rounded-2xl p-5 md:p-6 h-full hover-lift fluid-glow">
                  <h3 className="text-sm font-semibold text-primary mono uppercase tracking-widest mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
