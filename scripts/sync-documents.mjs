import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const personal = join(root, "personal");
const outDir = join(root, "public", "documents");

const copies = [
  ["Sriram Kancherla Resume 4.pdf", "sriram-kancherla-resume.pdf"],
  ["IITK D&G Professional Certificate.pdf", "iitk-dg-professional-certificate.pdf"],
  ["23BCE0972_OCI_GENAI_PROFESSIONAL.pdf", "oci-genai-professional.pdf"],
  ["Supervised ML - Coursera.pdf", "supervised-ml-coursera.pdf"],
  ["AWS AI Practitioner Challenge.pdf", "aws-ai-practitioner.pdf"],
  ["Docker Foundations Professional.pdf", "docker-foundations.pdf"],
  ["Foundations of GenAI - Udacity.pdf", "foundations-genai-udacity.pdf"],
];

mkdirSync(outDir, { recursive: true });

for (const [srcName, destName] of copies) {
  const candidates = [
    join(personal, srcName),
    join(personal, "OCI", srcName),
  ];

  const src = candidates.find((path) => existsSync(path));
  if (!src) {
    const dest = join(outDir, destName);
    if (existsSync(dest)) {
      console.log(`→ ${destName} (kept existing)`);
      continue;
    }
    console.warn(`Skip (missing): ${srcName}`);
    continue;
  }

  const dest = join(outDir, destName);
  copyFileSync(src, dest);
  console.log(`→ ${destName}`);
}

console.log("Documents synced to public/documents/");
