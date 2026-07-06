export const RESUME_PDF_URL = "/documents/sriram-kancherla-resume.pdf";
export const RESUME_PAGE_PATH = "/resume";
export const EMAIL = "kancherlasriram2006@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sriram-kancherla-80a7b028a/";
export const GITHUB_URL = "https://github.com/sriramkancherla";
export const NUS_CREDENTIALS_URL = "https://credentials.nus.edu.sg/profile/sriramkancherla155324/wallet";

/** Current role — keep hero, footer, meta, and OG image in sync. */
export const ROLE_LINE = "ML Intern @ FlyRank AI";

/** Role titles shown in hero (from experience). */
export const ROLES_LINE = "ML Engineer · Data Analyst · Student";

/** Set VITE_SITE_URL at build time for absolute canonical / OG URLs. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

/** Shared title styling — intro morph must match hero exactly on all breakpoints. */
export const NAME_TITLE_CLASS =
  "name-script text-[clamp(2.35rem,8.2vw,5.5rem)] leading-[1.2] tracking-normal";

/** Hero + intro name markup must stay identical so the morph lands at 1:1 size. */
export const NAME_HERO_TITLE_CLASS = `${NAME_TITLE_CLASS} inline-flex flex-wrap justify-center items-end gap-x-[0.15em] max-w-full`;
