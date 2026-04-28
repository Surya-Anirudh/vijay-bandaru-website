import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import { useRef } from "react"

type JourneyItem = { year: string; period: string; company: string; logo: string; role: string; story: string; color: string }

/* ─── Journey card (needs own component for hooks) ─── */
function JourneyCard({ j, i }: { j: JourneyItem; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} key={j.year}
      initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08 }}
      className="group grid sm:grid-cols-12 gap-4 sm:gap-8 p-6 sm:p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 cursor-default bg-white">
      <div className="sm:col-span-1 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
        <div className="font-black text-2xl sm:text-3xl leading-none group-hover:text-blue-600 transition-colors" style={{ color: j.color }}>{j.year}</div>
        <div className="sm:mt-3 w-px sm:w-1 h-1 sm:h-full rounded-full" style={{ background: j.color, opacity: 0.3 }} />
      </div>
      <div className="sm:col-span-3">
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-2">{j.period}</div>
        <img src={j.logo} alt={j.company} className="h-8 object-contain object-left mb-2" />
        <div className="font-semibold text-xs" style={{ color: j.color }}>{j.role}</div>
      </div>
      <div className="sm:col-span-7 flex items-center">
        <p className="text-slate-500 text-sm leading-relaxed">{j.story}</p>
      </div>
      <div className="hidden sm:col-span-1 sm:flex items-center justify-end">
        <ArrowRight size={16} className="text-slate-200 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  )
}

/* ─── Data ─── */
const journey = [
  {
    year: "2018", period: "2018 – Present", company: "Learnovative", logo: "/logo-learnovative.png",
    role: "Founder & CEO · Principal Trainer",
    story: "I founded Learnovative to dedicate 100% of my focus to training. Zero PowerPoint. Real stories. 25,000+ professionals trained. 4.9★ rated. NPS consistently above 90.",
    color: "#2563eb",
  },
  {
    year: "2016", period: "2016 – 2018", company: "Pega Systems", logo: "/logo-pega.png",
    role: "Sr. Product Manager & Agile Trainer",
    story: "I balanced two roles simultaneously — driving product strategy while coaching Agile practices across engineering teams at one of the world's leading enterprise software firms.",
    color: "#4f46e5",
  },
  {
    year: "2012", period: "2012 – 2016", company: "IVY Comptech", logo: "/logo-ivy.png",
    role: "Enterprise Agile Coach",
    story: "I led my first full-scale Agile transformation — embedding Scrum and Kanban across engineering teams, improving sprint predictability from under 60% to over 90%.",
    color: "#0891b2",
  },
  {
    year: "1998", period: "1998 – 2012", company: "ValueLabs", logo: "/logo-valuelabs.png",
    role: "Programmer → Technology & Leadership",
    story: "I began as a programmer and spent 14 formative years growing through technology and leadership roles — learning firsthand how teams succeed and fail under pressure.",
    color: "#059669",
  },
]


const education = [
  { year: "2021", degree: "Product Strategy", inst: "IIM Kozhikode",    type: "Executive Program", logo: "/logo-iim.png" },
  { year: "2006", degree: "PG Diploma in IT", inst: "Symbiosis University", type: "Post Graduate", logo: "/logo-symbosis.png" },
  { year: "1998", degree: "MCA",              inst: "Andhra University", type: "Masters",           logo: "/logo-AU.png" },
  { year: "1994", degree: "BSC",              inst: "Andhra University", type: "Bachelor's",        logo: "/logo-AU.png" },
]

const marqueeItems = [
  "World's First Certified Team Coach", "Certified Scrum Trainer", "Certified Enterprise Coach",
  "SAFe Practice Consultant", "Certified Agile Leader (CAL1)", "Marshall Goldsmith Executive & Team Coach",
  "Global Coach Group Leadership Coach", "ICF - ACC", "28+ Years of Experience",
  "25,000+ People Trained", "850+ Workshops", ">90 NPS", "4.9/5.0 Average Feedback",
]

export default function About() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const imgScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.08]), { stiffness: 60, damping: 20 })
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), { stiffness: 60, damping: 20 })

  return (
    <div className="overflow-x-hidden" style={{ background: "#030d1e" }}>

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">

        {/* BG grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }} />

        {/* Orbs */}
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.2) 0%,transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)", filter: "blur(60px)" }} />

        {/* Content */}
        <div className="relative flex-1 max-w-7xl mx-auto px-6 sm:px-10 w-full grid lg:grid-cols-2 gap-8 pt-28">

          {/* LEFT — Photo */}
          <motion.div className="relative flex items-end pb-0 lg:pb-0" style={{ minHeight: "70vh" }}>
            <motion.div style={{ scale: imgScale, opacity: imgOpacity }}
              className="absolute inset-0 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}>
              <img src="/about%20me%20photo.jpeg" alt="Vijay Bandaru"
                className="w-full h-full object-cover object-top" />
              {/* Photo overlays */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,13,30,0.9) 0%, rgba(3,13,30,0.3) 40%, transparent 70%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(3,13,30,0.8) 100%)" }} />
            </motion.div>

            {/* Name overlay on photo */}
            <motion.div style={{ y: textY }} className="relative z-10 p-8 lg:p-12">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Organizational Transformation Coach
                </div>
                <h1 className="font-black text-white leading-[0.88] mb-6 select-none"
                  style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", letterSpacing: "-0.04em" }}>
                  VIJAY<br />
                  <span style={{
                    background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                  }}>BANDARU</span>
                </h1>
                <p className="text-slate-400 font-medium text-xs leading-loose tracking-wide whitespace-nowrap">
                  Agile Coach · Scrum Trainer · Lifelong Learner · Story Teller
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Identity */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-col justify-start py-20 px-0 lg:px-14">

            {/* Big quote */}
            <div className="mb-14">
              <p className="font-black text-white leading-snug" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                I turn Agile, Scrum, and AI from concepts into <span style={{ color: "#60a5fa" }}>culture.</span>
              </p>
            </div>

            {/* Core Skills */}
            <div className="mb-14">
              <p className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">My Core Skills</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Agile, Scrum, AI Training",
                  "Organizational Transformation",
                  "Leadership Coaching",
                  "Change Management",
                  "AI Adoption",
                  "Business Strategy",
                  "Product Management",
                  "Technology",
                  "Mentoring",
                ].map((skill, i) => (
                  <motion.span key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
                    className="px-4 py-2 rounded-full text-sm font-semibold text-center text-blue-300 cursor-default transition-all duration-300"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.2)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.5)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.25)" }}>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Contact & CTA */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: Mail, label: "vijaybandaru@learnovative.com", href: "mailto:vijaybandaru@learnovative.com" },
                  { icon: Phone, label: "+91-98480-32144", href: "tel:+919848032144" },
                  { icon: MapPin, label: "Hyderabad, India", href: "#" },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Icon size={12} className="text-blue-400 shrink-0" /> {label}
                  </a>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Link to="/contact">
                  <button className="px-7 py-3 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center gap-2 transition-all hover:scale-105"
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 35px rgba(59,130,246,0.55)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}>
                    Let's Connect <ArrowRight size={14} />
                  </button>
                </Link>
                <a href="https://linkedin.com/in/vijaybandaru" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.instagram.com/vijaybandaru74" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </a>
                <a href="https://www.facebook.com/vijay.bandaru.75" target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #030d1e)" }} />
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div className="overflow-hidden py-4 border-y" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
        <div className="flex" style={{ animation: "marquee-scroll 35s linear infinite" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-blue-400/40 text-[10px] font-mono font-bold whitespace-nowrap flex items-center gap-6 px-6 tracking-[0.2em] uppercase">
              {item} <span className="text-blue-800/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ MY STORY ══════════════ */}
      <section className="py-24 px-4" style={{ background: "#030d1e" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Label col */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-3">
              <div className="font-mono text-blue-500/50 text-xs tracking-[0.3em] uppercase mb-3 lg:pt-3">My Story</div>
              <div className="hidden lg:block w-12 h-px bg-blue-500/30 mt-4" />
            </motion.div>
            {/* Content col */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }} className="lg:col-span-9">
              <h2 className="font-black text-white leading-tight mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
                From programmer<br />to India's <span style={{
                  background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
                }}>top Scrum Trainer.</span>
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed text-base">
                <p>I started my career as a programmer with a passion for software development in 1998 with a software services company. I grew through technology, management and leadership roles — watching teams struggle not because of lack of talent, but because of they do not know how they work together effectively.</p>

                <p>That insight drove me towards Agile. I focused on deepdiving into Agile, Scrum, professional coaching areas and achieved relevant certifications and experience and led transformation at IVY Comptech using LeSS (LArge Scale Scrum) and Pega Systems (SAFe). I founded <strong className="text-slate-200">Learnovative</strong> — to dedicate my entire focus to train, mentor, and coach individuals, teams and organizations in delivering value to their customers, and not just managing processes or tools.</p>

                <p>My approach has always been very clear: <strong className="text-slate-200">Balance the theory and practical hands-on</strong>, covering real-time case studies to deepen the understanding, create a collaborative and creative learning environment, help participants to apply the concepts immediately in their work place, focus on learner centric teaching methods with absolutely zero PowerPoint.</p>

                <p className="text-blue-300 font-semibold">The results speak: NPS consistently above 90, 4.9★ Google rating across 9,000+ verified reviews, and 25,000+ professionals trained across 100+ organisations within India and abroad including: Dubai, Qatar, Singapore, Malaysia, HongKong, USA, Australia, Philippines, and UK.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ PHILOSOPHY SECTION ══════════════ */}
      <section className="py-0 px-4" style={{ background: "#020810" }}>
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-b py-16" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <motion.p initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-black text-white text-center leading-tight select-none"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
              "Every team has the capacity to be{" "}
              <span style={{ color: "#3b82f6" }}>extraordinary.</span>"<br />
              <span className="text-slate-500" style={{ fontSize: "0.55em", fontWeight: 700, letterSpacing: "-0.01em" }}>
                They just need the right environment to discover it.
              </span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════ WHAT I DO DIFFERENTLY ══════════════ */}
      <section className="relative overflow-hidden py-24 px-4">
        {/* Background video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            autoPlay muted loop playsInline
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              minWidth: "100%", minHeight: "100%",
              width: "auto", height: "auto",
              objectFit: "cover",
            }}
          >
            <source src="/about-bg.mp4" type="video/mp4" />
          </video>
          {/* Lighter overlay — video person visible, text still readable */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(2,8,16,0.52)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="font-mono text-blue-500/50 text-xs tracking-[0.3em] uppercase mb-3">My Vision</div>
              <h2 className="font-black text-white leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
                Make Learning<br /><span className="text-blue-400">SPECIAL.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              { letter: "S", word: "Simple",       body: "" },
              { letter: "P", word: "Practical",    body: "" },
              { letter: "E", word: "Effective",    body: "" },
              { letter: "C", word: "Collaborative",body: "" },
              { letter: "I", word: "Innovative",   body: "" },
              { letter: "A", word: "Adaptive",     body: "" },
              { letter: "L", word: "Long-lasting", body: "" },
            ].map((d, i) => (
              <motion.div key={d.letter} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center text-center p-6 cursor-default transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.2)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.5)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)" }}>
                <div className="font-black text-white leading-none mb-3" style={{ fontSize: "clamp(3rem, 5vw, 4rem)", color: "#60a5fa" }}>{d.letter}</div>
                <div className="font-bold text-white text-sm mb-2">{d.word}</div>
                {d.body && <p className="text-white/50 text-xs leading-relaxed">{d.body}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CAREER JOURNEY ══════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="font-mono text-blue-500 text-xs tracking-[0.3em] uppercase mb-3">28+ Years</div>
            <h2 className="font-black text-slate-900 leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}>
              My career<br /><span className="text-blue-600">journey.</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {journey.map((j, i) => <JourneyCard key={j.year} j={j} i={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════════ CERTIFICATIONS ══════════════ */}
      <section className="py-24 px-4" style={{ background: "#030d1e" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-4 flex flex-col justify-center">
              <div className="font-mono text-blue-500/50 text-xs tracking-[0.3em] uppercase mb-4">Credentials</div>
              <h2 className="font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em" }}>
                My<br /><span className="text-blue-400">certifications.</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Every certification I hold, I teach. I don't just train for the exam — I train for the transformation that happens after.
              </p>
              <img src="/certifications.png" alt="Certifications" className="rounded-2xl opacity-80 hover:opacity-100 transition-opacity" />
            </motion.div>

            <div className="lg:col-span-8 flex items-center">
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {[
                  { val: "25,000+", label: "People Trained" },
                  { val: "9,000+",  label: "Google Reviews" },
                  { val: "4.9/5.0", label: "Average Feedback" },
                  { val: "850+",    label: "Workshops Conducted" },
                  { val: "NPS 90+", label: "Net Promoter Score" },
                  { val: "8",       label: "Countries Reached" },
                  { val: "28+",     label: "Years of Experience" },
                  { val: "16+",     label: "Certifications Held" },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="group p-6 rounded-2xl cursor-default transition-all duration-300 text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,99,235,0.12)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.35)" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)" }}>
                    <div className="font-black text-white text-2xl mb-1">{s.val}</div>
                    <div className="text-slate-500 text-xs font-semibold tracking-widest uppercase">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ EDUCATION ══════════════ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="font-mono text-blue-500 text-xs tracking-[0.3em] uppercase mb-3">Academic</div>
            <h2 className="font-black text-slate-900 leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}>
              Education.
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {education.map((e, i) => (
              <motion.div key={e.year} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-3xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 cursor-default group bg-white">
                {/* Large year bg */}
                <div className="absolute right-3 top-3 font-black text-slate-50 leading-none select-none pointer-events-none group-hover:text-blue-50 transition-colors"
                  style={{ fontSize: "5rem" }}>{e.year}</div>
                <div className="relative">
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">{e.type}</span>
                  <img src={e.logo} alt={e.inst} className="h-10 object-contain object-left mb-4" />
                  <h3 className="font-black text-slate-900 text-xl mb-1 leading-tight">{e.degree}</h3>
                  <p className="text-slate-400 text-xs font-medium">{e.inst}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="relative py-28 px-4 overflow-hidden" style={{ background: "#030d1e" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.05) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.15) 0%,transparent 65%)", filter: "blur(80px)" }} />

        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center">
          <div className="font-mono text-blue-500/50 text-xs tracking-[0.3em] uppercase mb-6">Let's Connect</div>
          <h2 className="font-black text-white leading-tight mb-6 select-none"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)", letterSpacing: "-0.04em" }}>
            READY TO<br /><span style={{
              background: "linear-gradient(90deg, #2563eb, #60a5fa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>TRANSFORM?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
            Whether it's a public workshop, corporate training, coaching, or a speaking engagement — I'd love to connect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center gap-2 transition-all hover:scale-105"
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 50px rgba(59,130,246,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}>
                Book Appointment <ArrowRight size={15} />
              </button>
            </Link>
            <Link to="/training">
              <button className="px-10 py-4 rounded-2xl border border-white/15 text-white font-black text-sm hover:border-blue-400/40 hover:bg-white/5 transition-all">
                View My Programs
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
