"use client";
import { ArrowUpRight, BarChart3, Bot, Brain, Building2, Cloud, Gamepad2, Globe2, LayoutTemplate, Smartphone, Tv, Wrench, Workflow, type LucideIcon } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

type Service = {
  title: string;
  icon: LucideIcon;
  blurb: string;
  offers: string[];
  /** project ids (or "hik-textiles") where this kind of work has already been delivered */
  proof: string[];
};

const SERVICES: Service[] = [
  {
    title: "Full-stack web apps & SaaS",
    icon: Globe2,
    blurb: "End-to-end web products: React or Next.js front end, Node, Python or serverless back end, database design, sign-in with roles, admin dashboards and deployment.",
    offers: ["SaaS & MVPs", "Admin dashboards", "REST & GraphQL APIs", "Auth & roles", "Database design", "Subscription billing", "Legacy modernization"],
    proof: ["al-noor", "event-nest", "code-spark", "fw-global"],
  },
  {
    title: "Websites, front end & UI",
    icon: LayoutTemplate,
    blurb: "Fast, responsive marketing, corporate and product sites, built from Figma or from scratch, with considered motion and accessibility.",
    offers: ["Landing pages", "Business & corporate sites", "Redesigns", "Figma to code", "React · Next.js · Tailwind", "Animation", "Speed & SEO"],
    proof: ["kalendra-website", "hik-textiles", "future-watch", "fw-global"],
  },
  {
    title: "Mobile apps (Android & iOS)",
    icon: Smartphone,
    blurb: "Apps from idea to store listing: Flutter, Firebase, offline-first data, subscriptions and ads, and Play Store or App Store publishing.",
    offers: ["Flutter", "React Native", "Offline-first", "In-app subscriptions & ads", "Push notifications", "Store publishing", "Redesign & maintenance"],
    proof: ["kalendra-ai", "hearthboard", "ledgerwise", "loan-emi", "doc-reader", "pulse-burnout"],
  },
  {
    title: "Android TV & large-screen apps",
    icon: Tv,
    blurb: "Lean-back apps and games for Android TV, Fire TV and Apple TV, designed around the remote and D-pad instead of touch.",
    offers: ["Android TV & Google TV", "Fire TV", "Apple TV (tvOS)", "D-pad navigation", "Mobile + TV from one design", "TV interface design", "TV app testing"],
    proof: ["tranquil", "hangman", "truth-or-lie", "would-you-rather", "world-clock", "minesweeper"],
  },
  {
    title: "AI apps, agents & chatbots",
    icon: Bot,
    blurb: "LLM-powered assistants, retrieval over your own documents, chatbots and voice interfaces, with a confirmation step wherever an action matters.",
    offers: ["LLM integration", "AI assistants & agents", "RAG & semantic search", "Chatbots", "Voice & speech", "Prompt & workflow design", "AI features for existing apps"],
    proof: ["kalendra-ai", "research-assistant-x", "ai-lms", "fluentta-ai", "ai-voice-assistant", "chatbotx"],
  },
  {
    title: "Machine learning, vision & NLP",
    icon: Brain,
    blurb: "Prediction, classification, anomaly detection, image analysis and document NLP, from data preparation to a working API endpoint.",
    offers: ["Classification & regression", "Forecasting & pricing", "Anomaly & fraud detection", "Image analysis & OCR", "Text classification", "Recommendations", "Model deployment"],
    proof: ["price-matic", "edul-insights", "docu-scan", "agro-scan", "fin-flow"],
  },
  {
    title: "Data, dashboards & pipelines",
    icon: BarChart3,
    blurb: "Analytics dashboards and data pipelines that turn raw numbers into decisions, in Streamlit, Dash, Plotly, React or your BI tool.",
    offers: ["KPI & executive dashboards", "Streamlit · Dash · Plotly", "Power BI · Tableau · Looker", "ETL & pipelines", "Kafka & Spark", "Data cleaning & extraction", "Database migration"],
    proof: ["modern-dashboard", "ai-metrics-visualizer", "edul-insights", "fin-flow", "research-assistant-x"],
  },
  {
    title: "Custom business software",
    icon: Building2,
    blurb: "ERP, ledgers, inventory, logistics, ticketing and internal tools that replace spreadsheets and manual workflows.",
    offers: ["ERP & accounting", "CRM", "Inventory & procurement", "Fleet & logistics", "Workflows & approvals", "Reports & CSV export", "Excel-to-system migration"],
    proof: ["al-noor", "fleet-track", "event-nest", "price-matic"],
  },
  {
    title: "Games",
    icon: Gamepad2,
    blurb: "Casual, party and racing games for phones, TVs and desktop, with progression, ads, in-app purchases and cloud-synced progress.",
    offers: ["Mobile games", "Android TV games", "Web & desktop games", "Game UI", "Ads & in-app purchases", "Leaderboards", "Game debugging"],
    proof: ["2d-turbo-racing", "minesweeper", "hangman", "heads-up-to-go", "would-you-rather", "2d-mario"],
  },
  {
    title: "Integrations, APIs & automation",
    icon: Workflow,
    blurb: "Connect your tools: third-party APIs, payments, OAuth sign-in, notifications and maps, plus scripts and workflows that remove repetitive work.",
    offers: ["API integration", "Stripe & payments", "Google / Apple sign-in", "Push, email & SMS", "Maps & GPS", "Python automation", "Scraping", "n8n · Zapier · Make"],
    proof: ["kalendra-ai", "event-nest", "hearthboard", "fleet-track", "al-noor"],
  },
  {
    title: "Cloud, DevOps & deployment",
    icon: Cloud,
    blurb: "Production setups on Cloudflare, Firebase, AWS or Google Cloud, with CI/CD, Docker, domains, SSL and monitoring.",
    offers: ["Cloudflare · Firebase · Supabase", "AWS & Google Cloud", "Serverless", "Docker & CI/CD", "Vercel & Netlify", "DNS & SSL", "Monitoring"],
    proof: ["al-noor", "future-watch", "fw-global", "kalendra-website"],
  },
  {
    title: "QA, rescue & maintenance",
    icon: Wrench,
    blurb: "Testing, bug fixing, performance work, code audits and ongoing support, including taking over and stabilising an existing codebase.",
    offers: ["Manual & automated testing", "Bug fixing", "Performance tuning", "Code review & audits", "Legacy upgrades", "Project rescue", "Monthly maintenance", "Technical docs"],
    proof: ["pulsebp", "kalendra-ai"],
  },
];

const ALSO = ["WordPress & Shopify", "WooCommerce & ecommerce", "Desktop apps (Electron, .NET, Flutter)", "Real-time chat & video", "Security reviews", "Git & GitHub setup"];

const nameOf = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

/** Flagships scroll to their Featured block; everything else opens in the project library. */
function openProject(id: string) {
  const featured = document.getElementById(`featured-${id}`);
  if (featured) featured.scrollIntoView({ behavior: "smooth", block: "center" });
  else window.dispatchEvent(new CustomEvent("open-project", { detail: id }));
}

export function Services() {
  return (
    <section id="services" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Services"
          title="What I can build for you."
          gradientFrom={3}
          blurb="Available for freelance and contract work on Upwork, Freelancer or direct. Each area lists what I offer and, under “Already delivered in”, the projects here where that work has been done."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <article className="glass flex h-full flex-col rounded-2xl p-6 transition hover:border-neon/40">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neon/20 to-violet/20 text-neon ring-1 ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold leading-tight text-white">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/65">{s.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {s.offers.map((o) => (
                      <li key={o} className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[0.6875rem] text-white/75 ring-1 ring-white/[0.08]">{o}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <h4 className="border-t border-white/10 pt-4 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-white/55">Already delivered in</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {s.proof.map((id) => (
                        <li key={id}>
                          <button
                            onClick={() => openProject(id)}
                            className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-neon hover:text-neon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon"
                          >
                            {nameOf(id)} <ArrowUpRight className="h-3 w-3" aria-hidden />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="glass mt-8 flex flex-col gap-6 rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h3 className="font-display text-lg font-bold text-white">Also available on request</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ALSO.map((a) => (
                  <li key={a} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/75">{a}</li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-void transition hover:bg-neon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon"
            >
              Send a brief <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
