"use client";
import { motion } from "framer-motion";
import { BrainCircuit, Cloud, Layers, Server, Smartphone } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { TiltCard } from "./TiltCard";

const GROUPS = [
  {
    title: "Mobile & TV",
    icon: Smartphone,
    color: "#22d3ee",
    items: ["Flutter", "Dart", "Swift", "SwiftUI", "tvOS", "Android TV", "React Native", "Expo", "App Store Connect", "Google Play Console"],
  },
  {
    title: "Frontend & Design",
    icon: Layers,
    color: "#a78bfa",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Figma", "Motion design", "Design systems"],
  },
  {
    title: "Backend & Data",
    icon: Server,
    color: "#f0abfc",
    items: ["Node.js", "Express", "FastAPI", "Django", "PostgreSQL", "MongoDB", "Supabase", "Firebase", "BigQuery", "Kafka"],
  },
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    color: "#a3e635",
    items: ["Python", "RAG", "Whisper", "spaCy", "scikit-learn", "CNNs", "Rasa", "Apache Spark", "Streamlit", "Plotly"],
  },
  {
    title: "Cloud & Delivery",
    icon: Cloud,
    color: "#fbbf24",
    items: ["Docker", "Nginx", "Cloudflare", "Netlify", "GitHub Actions", "AdMob", "Unity Ads", "Analytics pipelines"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="06"
          eyebrow="Skills"
          title="A full-stack toolkit, from pixels to pipelines."
          gradientFrom={3}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.07} className={gi === GROUPS.length - 1 ? "lg:col-span-2" : ""}>
              <TiltCard max={5} glow={`${g.color}30`} className="glass beam h-full rounded-3xl p-7">
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-white/15" style={{ background: `${g.color}1f`, color: g.color }}>
                      <g.icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it, k) => (
                      <motion.span
                        key={it}
                        initial={{ opacity: 0, scale: 0.7, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.25 + k * 0.045, type: "spring", stiffness: 260, damping: 18 }}
                        whileHover={{ y: -3, color: g.color, borderColor: g.color }}
                        className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-white/75"
                      >
                        {it}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
