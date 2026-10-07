"use client";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Briefcase, CheckCircle2, Copy, Download, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { stats } from "@/lib/data";
import { site } from "@/lib/site";
import { Magnetic } from "./Magnetic";
import { SOCIALS } from "./SocialLinks";
import { Reveal, SectionHeading } from "./Reveal";
import { toast } from "./Toaster";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-neon/70 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]";

  // EmailJS credentials are the same service/template/key used by the Future Watch site contact form.
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (form.company) { setStatus("sent"); return; } // honeypot: bots fill the hidden field
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const subject = `[Portfolio] ${form.subject}`;

    if (!serviceId || !templateId || !publicKey) {
      // Not configured in this build: fall back to the visitor's mail app.
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      toast("Opening your mail app…");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(serviceId, templateId, { name: form.name, email: form.email, subject, message: form.message }, { publicKey });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
      toast("Message sent — I'll get back to you soon");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("idle");
      toast(`Couldn't send — please email ${site.email}`);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="09" eyebrow="Contact" title="Let's build something remarkable." gradientFrom={2} blurb="Have a product idea, an app to ship or a site to elevate? I'd love to hear about it." />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-4">
              <button
                onClick={() => { navigator.clipboard?.writeText(site.email); toast("Email copied to clipboard"); }}
                data-cursor="Copy"
                className="glass beam group flex w-full items-center gap-5 rounded-2xl p-6 text-left"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon/25 to-violet/25 text-neon ring-1 ring-white/15">
                  <Mail className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Email</span>
                  <span className="mt-1 block font-display text-lg font-semibold text-white">{site.email}</span>
                </span>
                <Copy className="h-4 w-4 text-white/40 transition group-hover:text-neon" />
              </button>

              <a href={site.cv} download="Hassan-Ali-Alvi-CV.pdf" className="glass beam group flex items-center gap-5 rounded-2xl p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] text-white ring-1 ring-white/15">
                  <Download className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Résumé</span>
                  <span className="mt-1 block font-display text-lg font-semibold text-white">Download CV (PDF)</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:rotate-45 group-hover:text-neon" />
              </a>

              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="glass beam group flex items-center gap-5 rounded-2xl p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] text-white ring-1 ring-white/15">
                  <Briefcase className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Projects</span>
                  <span className="mt-1 block font-display text-lg font-semibold text-white">{stats.projects} projects · {stats.play} on Google Play</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:rotate-45 group-hover:text-neon" />
              </a>

              <div className="glass rounded-2xl p-3">
                <span className="mb-1 block px-3 pt-2 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-white/55">Find me online</span>
                <ul>
                  {SOCIALS.map(({ name, handle, href, Icon }) => (
                    <li key={name}>
                      <a href={href} target="_blank" rel="noreferrer me" className="group flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neon">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white ring-1 ring-white/15"><Icon className="h-5 w-5" /></span>
                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-white">{name}</span>
                          <span className="block font-mono text-xs text-white/60">{handle}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-white/50 transition group-hover:rotate-45 group-hover:text-neon" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass flex items-center gap-3 rounded-2xl p-5 text-sm text-white/55">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-lime" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-lime" />
                </span>
                Open to project enquiries and collaborations
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} x={30} y={0}>
            {status === "sent" ? (
              <div role="status" className="glass beam beam-on flex min-h-[26rem] flex-col items-center justify-center rounded-3xl p-9 text-center">
                <CheckCircle2 className="h-14 w-14 text-lime" aria-hidden />
                <h3 className="mt-5 font-display text-2xl font-bold text-white">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm text-white/65">Thanks for reaching out. I&apos;ll reply to the email address you provided.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-neon hover:text-neon">Send another message</button>
              </div>
            ) : (
            <form onSubmit={submit} className="glass beam beam-on relative space-y-4 rounded-3xl p-7 sm:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Name</span>
                  <input required className={input} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Email</span>
                  <input required type="email" className={input} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Subject</span>
                <input required className={input} placeholder="What is this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </label>
              <label aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
                Company
                <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">Message</span>
                <textarea required rows={6} className={`${input} resize-none`} placeholder="Tell me about your project…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </label>
              <Magnetic strength={0.2}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-neon to-violet px-8 py-4 text-sm font-bold text-void"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full [transform:skewX(-20deg)_translateX(-120%)] group-hover:[transform:skewX(-20deg)_translateX(120%)]" />
                  <span className="relative">{status === "sending" ? "Sending…" : "Send message"}</span>
                  {status === "sending" ? <Loader2 className="relative h-4 w-4 animate-spin" aria-hidden /> : <Send className="relative h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />}
                </motion.button>
              </Magnetic>
            </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
