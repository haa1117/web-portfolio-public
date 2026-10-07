const ITEMS = [
  "Flutter", "SwiftUI", "tvOS", "Android TV", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Node.js", "FastAPI", "Django", "PostgreSQL", "MongoDB", "Supabase", "Firebase", "Cloudflare", "Docker",
  "Kafka", "Apache Spark", "scikit-learn", "RAG", "Whisper", "spaCy", "Streamlit",
];

export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="mask-fade-x relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-5">
      <div className={`flex w-max animate-marquee gap-12 whitespace-nowrap ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-xl font-semibold uppercase tracking-wide text-white/25 transition hover:text-white md:text-2xl">
            {t}
            <span className="h-1.5 w-1.5 rotate-45 bg-neon/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
