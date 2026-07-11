import { ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

const items = [
  {
    title: "Professional Certificate in Data Analytics and Generative AI",
    issuer: "E&ICT Academy, IIT Kanpur",
    date: "Dec 2025",
    url: "/documents/iitk-dg-professional-certificate.pdf",
  },
  {
    title: "Oracle Cloud Infrastructure Generative AI Professional",
    issuer: "Oracle",
    date: "Jul 2025",
    url: "/documents/oci-genai-professional.pdf",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI · Coursera",
    date: "May 2025",
    url: "/documents/supervised-ml-coursera.pdf",
  },
  {
    title: "NumPy",
    issuer: "CodeChef",
    date: "Mar 2025",
    url: "https://codechef.com/certificates/public/508d224",
  },
  {
    title: "Pandas",
    issuer: "CodeChef",
    date: "Mar 2025",
    url: "https://codechef.com/certificates/public/84eb5d2",
  },
  {
    title: "AWS AI Practitioner Challenge",
    issuer: "Amazon Web Services",
    date: "Jun 2025",
    url: "/documents/aws-ai-practitioner.pdf",
  },
  {
    title: "Docker Foundations Professional",
    issuer: "Docker",
    date: "Mar 2025",
    url: "/documents/docker-foundations.pdf",
  },
  {
    title: "Foundations of GenAI",
    issuer: "Udacity",
    date: "Dec 2024",
    url: "/documents/foundations-genai-udacity.pdf",
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="section-fluid fluid-section pattern-section pattern-section--kolam relative">
      <div className="container max-w-4xl relative z-[1]">
        <Reveal>
          <SectionEyebrow index="05">Certifications</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Certifications & achievements.</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-3xl">
            Verified credentials from IIT Kanpur, Oracle, AWS, and more.
          </p>
        </Reveal>

        <ul className="divide-y divide-border/70 border-t border-border/70">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 40}>
              <li className="py-5 md:py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-medium text-foreground leading-snug">{it.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{it.issuer}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 sm:text-right">
                  <span className="mono text-xs text-muted-foreground">{it.date}</span>
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View <ExternalLink size={12} />
                  </a>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
