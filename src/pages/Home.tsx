import { motion, useInView, useScroll, useTransform, useSpring, useMotionValueEvent, type MotionValue } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Star, Users, Globe, BookOpen, Quote, CheckCircle, Lightbulb, Heart, Rocket } from "lucide-react"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"

/* ── wodniack-style: floating binary background ── */
function BinaryBackground() {
  const cols = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${3 + i * 5.3}%`,
    chars: Array.from({ length: 10 }, (_, j) => ((i * 7 + j * 13) % 3 === 0 ? "1" : "0")),
    delay: (i * 0.55) % 9,
    duration: 10 + (i % 6) * 2.5,
  })), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ zIndex: 0 }}>
      {cols.map(col => (
        <div key={col.id} className="absolute bottom-0 flex flex-col"
          style={{ left: col.left, gap: 6, animation: `binary-rise ${col.duration}s linear infinite ${col.delay}s`, opacity: 0 }}>
          {col.chars.map((c, j) => (
            <span key={j} className="font-mono text-blue-400/35" style={{ fontSize: 10 }}>{c}</span>
          ))}
        </div>
      ))}
    </div>
  )
}


/* ── wodniack-style: animated line divider ── */
function LineDivider({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="h-px origin-left"
        style={{
          background: "linear-gradient(90deg, rgba(59,130,246,0.6) 0%, rgba(96,165,250,0.3) 60%, transparent 100%)",
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1s ease",
        }} />
    </div>
  )
}

/* ── wodniack-style: floating star decoration ── */
function Star6({ size = 32, color = "rgba(96,165,250,0.25)", delay = 0 }: { size?: number; color?: string; delay?: number }) {
  return (
    <span className="select-none pointer-events-none font-black leading-none"
      style={{ fontSize: size, color, animation: `star-float 4s ease-in-out infinite ${delay}s`, display: "inline-block" }}>
      ✦
    </span>
  )
}

/* ── Film grain overlay ── */
function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 9990, opacity: 0.028, mixBlendMode: "screen" }}>
      <div style={{
        position: "absolute", inset: "-50%", width: "200%", height: "200%",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        animation: "grain 0.4s steps(1) infinite",
      }} />
    </div>
  )
}

/* ── Custom cursor (dot + lagging ring) ── */

/* ── Text scramble on hover ── */
function ScrambleText({ text, className = "", style = {}, tag: Tag = "span" }: { text: string; className?: string; style?: React.CSSProperties; tag?: string }) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&"

  const scramble = () => {
    let iter = 0
    clearInterval(frameRef.current)
    frameRef.current = setInterval(() => {
      setDisplay(
        text.split("").map((ch, i) => {
          if (ch === " ") return " "
          if (i < iter) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join("")
      )
      iter += 0.6
      if (iter >= text.length) { clearInterval(frameRef.current); setDisplay(text) }
    }, 30)
  }
  return (
    // @ts-expect-error dynamic tag
    <Tag className={className} style={style} onMouseEnter={scramble}>{display}</Tag>
  )
}

/* ── Magnetic wrapper ── */
function MagneticWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [off, setOff] = useState({ x: 0, y: 0 })
  return (
    <div ref={ref} className={`inline-block ${className}`}
      style={{ transform: `translate(${off.x}px,${off.y}px)`, transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)" }}
      onMouseMove={e => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        setOff({ x: (e.clientX - (r.left + r.width / 2)) * 0.28, y: (e.clientY - (r.top + r.height / 2)) * 0.28 })
      }}
      onMouseLeave={() => setOff({ x: 0, y: 0 })}>
      {children}
    </div>
  )
}

/* ── Word-by-word reveal ── */
function WordReveal({ text, className = "", style = {}, delay = 0 }: { text: string; className?: string; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <span ref={ref} className={className} style={style}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em", verticalAlign: "bottom" }}>
          <span style={{
            display: "inline-block",
            transform: inView ? "translateY(0)" : "translateY(110%)",
            opacity: inView ? 1 : 0,
            transition: `transform 0.7s cubic-bezier(0.215,0.61,0.355,1) ${delay + i * 0.1}s, opacity 0.5s ease ${delay + i * 0.1}s`,
          }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

/* ── Floating particles background ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let W = 0, H = 0
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const COUNT = 55
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 800,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.5 ? "59,130,246" : "99,102,241",
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x % W, p.y % H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()
      })
      // draw faint lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(59,130,246,${0.07 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ── Wavy interactive line grid (wodniack.dev-style) ── */
function WavyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    let W = 0, H = 0
    const setSize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    let mx = -999, my = -999
    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mx = e.clientX - r.left; my = e.clientY - r.top
    }
    window.addEventListener("mousemove", onMouse)

    let t = 0
    const ROWS = 38
    const MOUSE_R = 200
    const STRENGTH = 58

    let raf: number
    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.007
      const COLS = Math.ceil(W / 7)

      for (let r = 0; r < ROWS; r++) {
        const baseY = H * 0.04 + (r / (ROWS - 1)) * (H * 0.92)
        ctx.beginPath()
        for (let c = 0; c <= COLS; c++) {
          const x = (c / COLS) * W
          const wave =
            Math.sin(x * 0.006 + t * 0.9 + r * 0.22) * 11 +
            Math.sin(x * 0.014 - t * 1.3 + r * 0.12) * 5 +
            Math.sin(x * 0.023 + t * 0.55) * 2.5
          const dx = x - mx, dy = baseY + wave - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const inf = Math.max(0, 1 - dist / MOUSE_R)
          const ripple = inf * inf * STRENGTH * Math.sin(dist * 0.038 - t * 4.5)
          const y = baseY + wave + ripple
          c === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        const progress = r / ROWS
        ctx.strokeStyle = `rgba(59,130,246,${0.07 + progress * 0.13})`
        ctx.lineWidth = 0.75
        ctx.stroke()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("mousemove", onMouse) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
}

/* ── Bruno Simon-inspired: 3D card tilt ── */
function Tilt3D({ children, className = "", maxTilt = 10 }: { children: React.ReactNode; className?: string; maxTilt?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const rx = -((e.clientY - r.top - r.height / 2) / (r.height / 2)) * maxTilt
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * maxTilt
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
    ref.current.style.transition = "transform 0.08s ease"
  }
  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    ref.current.style.transition = "transform 0.7s cubic-bezier(0.23,1,0.32,1)"
  }
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
      {children}
    </div>
  )
}

const marqueeItems = [
  "CSM · A-CSM · CSPO · A-CSPO", "Scrum Alliance Certified", "Enterprise Agile Coach",
  "25,000+ Professionals Trained", "500+ Organizations", "4.9★ Google Rated",
  "Zero PowerPoint Training", "25 Years Experience", "Physical & Virtual",
  "Hyderabad · India · Global", "NPS Score 90+", "Post-Training Career Support",
]

const programs = [
  { id: "csm",       title: "Certified Scrum Master",                short: "CSM",   level: "Foundation", accent: "#2563eb", href: "/training#csm",   tag: "Most Popular", badge: "/badge-csm.png" },
  { id: "acsm",      title: "Advanced Certified Scrum Master",       short: "A-CSM", level: "Advanced",   accent: "#4f46e5", href: "/training#acsm",  tag: null,           badge: "/badge-acsm.png" },
  { id: "ai-sm",     title: "AI for Scrum Masters",                  short: "AI-SM", level: "Emerging",   accent: "#059669", href: "/training#ai-sm", tag: "New",          badge: "/badge-aism.png" },
  { id: "cspo",      title: "Certified Scrum Product Owner",         short: "CSPO",  level: "Foundation", accent: "#0891b2", href: "/training#cspo",  tag: null,           badge: "/badge-cspo.png" },
  { id: "acspo",     title: "Advanced Certified Scrum Product Owner",short: "A-CSPO",level: "Advanced",   accent: "#0e7490", href: "/training#acspo", tag: null,           badge: "/badge-acspo.png" },
  { id: "ai-po",     title: "AI for Product Owners",                 short: "AI-PO", level: "Emerging",   accent: "#0d9488", href: "/training#ai-po", tag: "New",          badge: "/badge-aipo.png" },
  { id: "safe-sa",   title: "SAFe Agilist",                         short: "SA",     level: "SAFe",       accent: "#7c3aed", href: "/training#safe",  tag: null,           badge: "/badge-saFeaglist.png" },
  { id: "safe-ssm",  title: "SAFe Scrum Master",                    short: "SSM",    level: "SAFe",       accent: "#a855f7", href: "/training#safe",  tag: null,           badge: "/badge-saFesrcummaster.png" },
  { id: "safe-popm", title: "SAFe Product Owner / Product Manager",  short: "POPM",  level: "SAFe",       accent: "#9333ea", href: "/training#safe",  tag: null,           badge: "/badge-saFeproductowner.png" },
]

const testimonials = [
  {
    text: "The CSM training by Vijay sir was an eye-opener. His no-PowerPoint, completely interactive approach makes the concepts stick. I cleared my exam on the first attempt and got a promotion within 3 months. Highly recommended!",
    name: "Sakkaria S", role: "Scrum Master", company: "Google Review ★★★★★",
  },
  {
    text: "Vijay Bandaru is an exceptional trainer. His depth of knowledge in Agile and Scrum is unmatched. The way he connects real-world scenarios to Scrum principles is truly inspiring. One of the best investments in my career.",
    name: "Sachin Jha", role: "Senior Project Manager", company: "Google Review ★★★★★",
  },
  {
    text: "Attended the A-CSM workshop — Vijay's energy and passion for teaching Agile is infectious. The workshop was intense, practical, and full of real-world case studies. I walked away with frameworks I could apply on Monday morning.",
    name: "Raghu Ram", role: "Agile Coach", company: "Google Review ★★★★★",
  },
  {
    text: "Best Scrum training I have ever attended. Vijay sir's teaching style is very engaging and the group activities made every concept crystal clear. He also helped with resume coaching after the training. Truly goes above and beyond.",
    name: "Saumya Dhaundiyal", role: "Business Analyst → Product Owner", company: "Google Review ★★★★★",
  },
  {
    text: "Vijay's CSPO course completely changed how I approach product ownership. He has an incredible ability to simplify complex concepts. Our team's sprint predictability improved significantly after I applied what I learned.",
    name: "Priyakshi Chauhan", role: "Product Owner", company: "Google Review ★★★★★",
  },
  {
    text: "Excellent facilitator and a genuinely humble person. The CSM class was engaging from start to finish — no slides, just real conversations, exercises, and deep dives. Cleared the exam comfortably. Thank you Vijay sir!",
    name: "Ankit Katiyar", role: "Scrum Master", company: "Google Review ★★★★★",
  },
]

const faqItems = [
  {
    q: "Do you provide only Live Virtual Trainings?",
    a: "I provide both Physical and Live Virtual trainings.",
  },
  {
    q: "Do you conduct only public training programs?",
    a: "I also conduct private training programs for my clients as and when needed.",
  },
  {
    q: "How can I register for any of your training programs?",
    a: "You can check my training schedule at my company website: https://www.learnovative.com/training-calendar/ for next 3 months training programs.",
  },
  {
    q: "How do I know your training and teaching style?",
    a: "You can go through my video https://www.youtube.com/watch?v=1oLVkWgVupM where I explained how I conduct my live virtual trainings more effective, engaging and interactive.",
  },
  {
    q: "Do you provide any post training support?",
    a: "That is my USP — you join my training and that is the relationship building starting point. You can get any support for resume review, mock interview support, and career guidance anytime as and when needed.",
  },
  {
    q: "Do you provide any other services other than trainings?",
    a: "Yes, I provide organizational Agile and AI transformation, Leadership coaching, and a special program called \"PROPEL\" aimed to help business analysts, product owners, and product managers to get high salary jobs through personal training, mentoring, and coaching.",
  },
  {
    q: "Where can I get more details about the \"PROPEL\" program?",
    a: "You can check complete details of PROPEL program at my website: https://www.learnovative.com/product-owner-mentoring-propel/",
  },
]

const companiesRow1 = [
  { name: "TCS", logo: "/logos/tcs.svg" },
  { name: "Wipro", logo: "/logos/wipro.svg" },
  { name: "Infosys", logo: "/logos/infosys.svg" },
  { name: "Cognizant", logo: "/logos/cognizant.svg" },
  { name: "HCL", logo: "/logos/hcl.svg" },
  { name: "Tech Mahindra", logo: "/logos/techmahindra.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Deloitte", logo: "/logos/deloitte.svg" },
  { name: "Capgemini", logo: "/logos/capgemini.svg" },
  { name: "Accenture", logo: "/logos/accenture.svg" },
  { name: "IBM", logo: "/logos/ibm.svg" },
]
const companiesRow2 = [
  { name: "Oracle", logo: "/logos/oracle.svg" },
  { name: "SAP", logo: "/logos/sap.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "Adobe", logo: "/logos/adobe.svg" },
  { name: "Cisco", logo: "/logos/cisco.svg" },
  { name: "Intel", logo: "/logos/intel.svg" },
  { name: "HSBC", logo: "/logos/hsbc.svg" },
  { name: "JP Morgan", logo: "/logos/jpmorgan.svg" },
  { name: "Goldman Sachs", logo: "/logos/goldmansachs.svg" },
  { name: "Mindtree", logo: "/logos/mindtree.svg" },
  { name: "Mphasis", logo: "/logos/mphasis.svg" },
  { name: "Hexaware", logo: "/logos/hexaware.svg" },
]

const vijayDifference = [
  {
    num: "01", icon: Lightbulb, color: "#3b82f6",
    tagline: "Visual-First Learning",
    title: "Zero PowerPoint",
    desc: "Every class I run uses physical objects, live drawings, and real-time collaboration. You learn by doing — not by watching slides. Retention is 3× higher.",
  },
  {
    num: "02", icon: Heart, color: "#6366f1",
    tagline: "25 Years, Distilled",
    title: "Real-World War Stories",
    desc: "I anchor every concept in stories from actual enterprise transformations I've led — messy, real, and immediately applicable. No textbook theory.",
  },
  {
    num: "03", icon: Rocket, color: "#0891b2",
    tagline: "TBR Certified",
    title: "Training from the Back of the Room",
    desc: "Certified in Training from the Back of the Room — enhancing adult learning through 4C concepts for deeper understanding and real retention.",
  },
  {
    num: "04", icon: BookOpen, color: "#10b981",
    tagline: "High Quality Materials",
    title: "Curiosity-Driven Learning",
    desc: "My materials create curiosity and lead to an interactive and engaging learning experience that inspires participants long after the session ends.",
  },
]

function AnimatedCounter({ to, suffix, label, decimal = false, delay = 0 }: {
  to: number; suffix: string; label: string; decimal?: boolean; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2200
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const t = setTimeout(() => { raf = requestAnimationFrame(tick) }, delay)
    return () => { clearTimeout(t); cancelAnimationFrame(raf) }
  }, [inView, to, delay])

  const display = decimal ? (val / 10).toFixed(1) : val.toLocaleString()

  return (
    <div ref={ref} className="text-center">
      <div className="font-black text-white leading-none mb-3" style={{ fontSize: "clamp(2.2rem, 4vw, 4rem)" }}>
        {display}<span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-slate-500 text-xs font-semibold tracking-widest uppercase">{label}</div>
    </div>
  )
}

/* ── FAQ Accordion ── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border-b border-white/08"
      style={{ borderBottomColor: "rgba(255,255,255,0.08)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="text-white font-semibold text-base leading-snug group-hover:text-blue-300 transition-colors">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-white/15 text-white/50 group-hover:border-blue-400/50 group-hover:text-blue-400 transition-all text-lg leading-none"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>+</span>
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ overflow: "hidden" }}>
        <p className="text-slate-400 text-sm leading-relaxed pb-5">{a}</p>
      </motion.div>
    </motion.div>
  )
}

/* ── Sticky mobile CTA ── */
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }} animate={{ x: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-4 pt-2"
      style={{ background: "linear-gradient(to top, rgba(3,13,30,0.98) 70%, transparent)" }}>
      <Link to="/contact">
        <button className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-black text-sm tracking-wide"
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(59,130,246,0.5)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}>
          Book a Session →
        </button>
      </Link>
    </motion.div>
  )
}

/* ── Scrub-reveal: clips text up into view as you scroll ── */
function ScrubReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.35"] })
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 80, damping: 22 })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [60, 0]), { stiffness: 80, damping: 22 })
  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ═══════════════════ PORTFOLIO — WODNIACK SCROLL STYLE ═══════════════════ */
const portfolioItems = [
  { id: 1,  label: "CSM",      title: "CSM Training — Hyderabad",          sub: "Scrum Alliance Certified",   year: "2023", img: "/work/csm-hyderabad.jpg" },
  { id: 2,  label: "CSM",      title: "CSM Training — Kuala Lumpur",       sub: "Scrum Alliance Certified",   year: "2023", img: "/work/csm-kualalumpur.jpg" },
  { id: 3,  label: "Coaching", title: "Coaching Workshop — Chennai",        sub: "Enterprise Coaching",        year: "2023", img: "/work/coaching-chennai.jpg" },
  { id: 4,  label: "A-CSPO",   title: "A-CSPO — Virtual",                  sub: "Advanced Certification",     year: "2026", img: "/work/acspo-virtual.jpg" },
  { id: 5,  label: "A-CSM",    title: "A-CSM — Virtual",                   sub: "Advanced Certification",     year: "2025", img: "/work/acsm-virtual.jpg" },
  { id: 6,  label: "AI-SM",    title: "AI For Scrum Masters — Virtual",     sub: "Emerging Skills",            year: "2025", img: "/work/aism-virtual.jpg" },
  { id: 7,  label: "CSM",      title: "CSM Training — Bengaluru",          sub: "Scrum Alliance Certified",   year: "2026", img: "/work/csm-bengaluru.jpg" },
  { id: 8,  label: "AI-PO",    title: "AI For Product Owners — Virtual",   sub: "Emerging Skills",            year: "2025", img: "/work/aipo-virtual.jpg" },
  { id: 9,  label: "CSM",      title: "CSM Training — Qatar",              sub: "Scrum Alliance Certified",   year: "2025", img: "/work/csm-qatar.jpg" },
  { id: 10, label: "CSPO",     title: "CSPO — Virtual",                    sub: "Scrum Alliance Certified",   year: "2025", img: "/work/cspo-virtual.jpg" },
  { id: 11, label: "SAFe",     title: "Leading SAFe — Virtual",            sub: "SAFe Practice Consultant",   year: "2026", img: "/work/safe-virtual.png" },
]

/* ── Letter row: hook at top level, no rotation, clean ── */
function LetterRow({ letter, direction, progress }: {
  letter: string; direction: 1 | -1; progress: MotionValue<number>
}) {
  const amt = 300
  const x = useTransform(progress, [0, 1], direction === 1 ? [amt, -amt] : [-amt, amt])
  return (
    <motion.div style={{ x, height: "25vh", display: "flex", alignItems: "center", overflow: "hidden", whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none" }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} style={{
          fontWeight: 900,
          fontSize: "clamp(5rem, 19vw, 18rem)",
          color: "#1e3a8a",
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          flexShrink: 0,
        }}>{letter}</span>
      ))}
    </motion.div>
  )
}

/* ── Pure card UI (no hooks) ── */
function WorkCardUI({ item, big }: { item: typeof portfolioItems[number]; big: boolean }) {
  return (
    <div style={{
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: big
        ? "0 32px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.09)"
        : "0 16px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07)",
      width: "100%",
    }}>
      {/* Browser bar */}
      <div style={{ background: "#1a1a1a", display: "flex", alignItems: "center", gap: 6, padding: "8px 12px" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, flexShrink: 0 }} />
        ))}
        <div style={{
          flex: 1, marginLeft: 8, background: "#0d0d0d", borderRadius: 4,
          padding: "2px 8px", fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.2)",
          overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
        }}>
          vijaybandaru.com/{item.label.toLowerCase()}
        </div>
      </div>
      {/* Content */}
      <div style={{ aspectRatio: "16/9", position: "relative" }}>
        {item.img
          ? <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : (
            <div style={{
              width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(140deg, #050d1f 0%, #1a3480 60%, #1d4ed8 100%)",
            }}>
              <div style={{ textAlign: "center", padding: "0 24px" }}>
                <div style={{ fontFamily: "monospace", color: "rgba(96,165,250,0.35)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>{item.label}</div>
                <div style={{ fontWeight: 900, color: "#fff", lineHeight: 1.2, fontSize: big ? "clamp(0.95rem,2vw,1.4rem)" : "clamp(0.7rem,1.4vw,1rem)", marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: "rgba(147,197,253,0.45)", fontSize: big ? 13 : 11 }}>{item.sub}</div>
              </div>
            </div>
          )
        }
      </div>
      {/* Caption */}
      <div style={{ background: "#111", padding: big ? "12px 16px" : "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "rgba(255,255,255,0.82)", fontWeight: 700, fontSize: big ? 13 : 11 }}>{item.title}</div>
          <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, marginTop: 2 }}>{item.sub} · {item.year}</div>
        </div>
        <div style={{
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 99,
          padding: "3px 8px", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.28)",
        }}>{item.label}</div>
      </div>
    </div>
  )
}

/* ── Individual slide: hook at top level, one card per slide ── */
function WorkSlide({ item, index, total, progress }: {
  item: typeof portfolioItems[number]; index: number; total: number; progress: MotionValue<number>
}) {
  const PX = 2400
  // Negative → positive: cards enter from LEFT, slide off to RIGHT as you scroll
  const x = useTransform(progress, [0, 1], [-index * PX, (total - index) * PX])
  // Alternate: even items bottom-left (large), odd items top-right (smaller)
  const isEven = index % 2 === 0
  return (
    <motion.div style={{ x, position: "absolute", inset: 0 }}>
      <div style={{
        position: "absolute",
        ...(isEven
          ? { left: "7vw", bottom: "11vh", width: "clamp(300px, 45vw, 620px)" }
          : { right: "7vw", top: "10vh",  width: "clamp(300px, 45vw, 620px)" }),
      }}>
        <WorkCardUI item={item} big={true} />
      </div>
    </motion.div>
  )
}

function PortfolioCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const N = portfolioItems.length
  const [active, setActive] = useState(0)
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  useMotionValueEvent(scrollYProgress, "change", v => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))))
  })

  return (
    /* 10 items × 200vh = 2000vh total */
    <div ref={ref} style={{ height: `${N * 200}vh` }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        background: "#020b18", overflow: "hidden",
      }}>

        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(59,130,246,0.13) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }} />

        {/* WORK letters — 4 rows, alternating direction */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", pointerEvents: "none" }}>
          <LetterRow letter="W" direction={-1} progress={scrollYProgress} />
          <LetterRow letter="O" direction={ 1} progress={scrollYProgress} />
          <LetterRow letter="R" direction={-1} progress={scrollYProgress} />
          <LetterRow letter="K" direction={ 1} progress={scrollYProgress} />
        </div>

        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(2,11,24,0.52)", pointerEvents: "none" }} />

        {/* Individual slides */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
          {portfolioItems.map((item, i) => (
            <WorkSlide key={item.id} item={item} index={i} total={N} progress={scrollYProgress} />
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
          padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <motion.div key={active} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.28)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 3 }}>
              {portfolioItems[active]?.label}
            </div>
            <div style={{ fontWeight: 900, color: "rgba(255,255,255,0.78)", letterSpacing: "0.06em", fontSize: 13 }}>
              {portfolioItems[active]?.title?.toUpperCase()}
            </div>
          </motion.div>
          <div style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.22)", fontSize: 11, letterSpacing: "0.2em" }}>
            {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={() => document.getElementById("after-carousel")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            position: "absolute", bottom: 72, right: 32, zIndex: 30,
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 16px", borderRadius: 99,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
            cursor: "pointer", backdropFilter: "blur(8px)",
            transition: "background 0.2s, color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(59,130,246,0.25)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(59,130,246,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff" }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)" }}
        >
          Skip to Next Section ››
        </button>

        {/* Scroll hint */}
        <motion.div style={{ opacity: 1, position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.5)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 700 }}>Scroll</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            {[0, 1].map(i => (
              <motion.div key={i}
                style={{ width: 8, height: 8, borderRight: "2px solid rgba(255,255,255,0.5)", borderBottom: "2px solid rgba(255,255,255,0.5)", rotate: "45deg" }}
                animate={{ opacity: [0.2, 0.8, 0.2], y: [0, 4, 0] }}
                transition={{ duration: 1.3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }} />
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default function Home() {
  const [cursor, setCursor] = useState({ x: -1000, y: -1000 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }, [])

  return (
    <div>
      <GrainOverlay />
      <StickyMobileCTA />

      {/* ═══════════════════ HERO — wodniack style ═══════════════════ */}
      <section onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#030d1e" }}>

        {/* Cursor glow */}
        <div className="absolute pointer-events-none rounded-full" style={{
          width: 700, height: 700, left: cursor.x - 350, top: cursor.y - 350,
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)",
          filter: "blur(40px)", transition: "left 0.06s linear, top 0.06s linear", zIndex: 1,
        }} />

        {/* Wavy interactive line grid — the main visual */}
        <WavyCanvas />

        {/* Binary columns rising */}
        <BinaryBackground />

        {/* ── FULL WIDTH PHOTO — fills entire canvas area ── */}
        <div className="flex-1 relative overflow-hidden" style={{ zIndex: 5, marginTop: "64px" }}>
          <motion.img
            src="/homepage-photo.png"
            onError={e => { (e.currentTarget as HTMLImageElement).src = "/vijay-profile.png" }}
            alt="Vijay Bandaru"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          {/* Subtle dark gradient at bottom so name text stays readable */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(3,13,30,0.85))" }} />
          {/* Side vignettes */}
          <div className="absolute inset-y-0 left-0 w-16 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(3,13,30,0.4), transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-16 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(3,13,30,0.4), transparent)" }} />
        </div>

        {/* ── BOTTOM — info strip + HUGE NAME + CTAs + marquee ── */}
        <div className="relative shrink-0" style={{ zIndex: 10 }}>

          {/* Info strip */}
          <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ x: "100%" }} animate={{ x: "0%" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex items-center justify-between px-4 sm:px-8 py-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(3,13,30,0.75)", backdropFilter: "blur(10px)" }}>
            <span className="font-mono text-[9px] text-white/30 tracking-[0.28em] uppercase hidden sm:block">Founder &amp; CEO @ Learnovative</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[9px] text-green-400/60 tracking-[0.22em] uppercase">CERTIFIED SCRUM TRAINER</span>
            </div>
            <span className="font-mono text-[9px] text-white/30 tracking-[0.28em] uppercase hidden sm:block">Hyderabad · India · Global</span>
          </motion.div>
          </div>

          {/* HUGE NAME */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(3,13,30,0.92)", backdropFilter: "blur(16px)", overflow: "hidden" }}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex items-baseline justify-center select-none px-4 sm:px-8 gap-[3vw]"
              style={{ letterSpacing: "-0.045em", lineHeight: 0.88 }}>
              <span className="font-black" style={{ fontSize: "clamp(2.8rem, 10.5vw, 14rem)",
                background: "linear-gradient(90deg, #ffffff 0%, #93c5fd 30%, #60a5fa 50%, #ffffff 70%, #93c5fd 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "text-shimmer 5s linear infinite",
              }}>VIJAY</span>
              <span className="font-black" style={{ fontSize: "clamp(2.8rem, 10.5vw, 14rem)",
                background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #3b82f6 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "text-shimmer 4s linear infinite",
              }}>BANDARU</span>
            </motion.div>
            {/* Subtitle row */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.75, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex items-center justify-center px-4 sm:px-8 pb-3">
              <span className="font-mono font-semibold tracking-[0.22em] uppercase text-[10px] sm:text-xs" style={{ color: "rgba(147,197,253,0.7)" }}>
                TRAINER · COACH · SPEAKER
              </span>
            </motion.div>
          </div>

          {/* Philosophy strip */}
          <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ x: "100%" }} animate={{ x: "0%" }}
            transition={{ duration: 0.75, delay: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
            className="px-4 sm:px-8 py-4 flex items-center justify-center gap-4"
            style={{ borderTop: "1px solid rgba(59,130,246,0.3)", background: "linear-gradient(90deg, rgba(37,99,235,0.12) 0%, rgba(3,13,30,0.95) 40%, rgba(3,13,30,0.95) 60%, rgba(37,99,235,0.12) 100%)", backdropFilter: "blur(16px)" }}>
            <span className="text-blue-500/50 text-2xl font-black leading-none select-none">"</span>
            <p className="text-center"
              style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(1rem, 2vw, 1.35rem)", fontWeight: 800, letterSpacing: "0.01em", fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}>
              Training and coaching is not just my profession,{" "}
              <span style={{
                background: "linear-gradient(90deg, #60a5fa, #93c5fd, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
                fontWeight: 900,
              }}>it is my passion</span>
            </p>
            <span className="text-blue-500/50 text-2xl font-black leading-none select-none">"</span>
          </motion.div>
          </div>

          {/* Marquee strip */}
          <div style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ x: "-100%" }} animate={{ x: "0%" }}
            transition={{ duration: 0.75, delay: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.015)" }}>
            <div className="py-3 overflow-hidden">
              <div className="flex" style={{ animation: "marquee-reverse 40s linear infinite" }}>
                {[...marqueeItems, ...marqueeItems].map((item, i) => (
                  <span key={i} className="text-blue-300/40 text-[10px] font-mono font-semibold whitespace-nowrap flex items-center px-7 gap-7 tracking-widest">
                    {item} <span className="text-blue-800">·</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ AUTHORIZED TRAINER ═══════════════════ */}
      <section className="py-12 px-4 bg-white border-b border-slate-100">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-center text-slate-400 text-[10px] font-bold tracking-[0.35em] uppercase mb-10">Authorized Trainer For</p>
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto w-full">
            {[
              { logo: "/logo-scrumalliance.svg", sub: "Certified Scrum Trainer" },
              { logo: "/logo-safe.png",           sub: "SAFe Practice Consultant" },
              { logo: "/logo-learnovative.png",  sub: "Founder & CEO" },
            ].map(({ logo, sub }) => (
              <div key={sub} className="flex flex-col items-center justify-between gap-4 group cursor-default px-6 py-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all h-40">
                <div className="flex-1 flex items-center justify-center w-full">
                  <img src={logo} alt={sub} className="max-h-14 w-full object-contain" />
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-blue-500 transition-colors font-semibold tracking-widest uppercase text-center">{sub}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ PHILOSOPHY ═══════════════════ */}
      <section className="relative py-28 px-4 overflow-hidden">
        {/* ── Background video ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            autoPlay muted loop playsInline
            className="absolute"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "cover",
            }}
          >
            <source src="/philosophy-bg.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay — dark at edges for text legibility, lighter in center so the person shows through */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(5,10,25,0.82) 0%, rgba(5,10,25,0.38) 45%, rgba(5,10,25,0.52) 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 70% 80% at 50% 60%, transparent 0%, rgba(5,10,25,0.55) 100%)"
          }} />
          {/* Blue accent gradient at top & bottom edges */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }} />
        </div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto text-center">
          <ScrubReveal>
            <p className="font-black text-white leading-tight mb-8" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}>
              <WordReveal text="I help improve your" delay={0} /><br />
              <WordReveal text="ability to improve." delay={0.3} style={{ color: "#60a5fa" }} />
            </p>

            <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              My passion is to help individuals, teams and organizations to relentlessly improve the way they think, work, behave, communicate through training, consulting and coaching, so that they will become better in what they are doing for their customers.
            </p>

            <div className="mt-10 max-w-4xl mx-auto">
              <p className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Certifications &amp; Credentials</p>
              <img src="/certifications.png" alt="Certifications" className="w-full object-contain rounded-xl" style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))" }} />
            </div>
          </ScrubReveal>
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: "#050f1e" }}>
        <LineDivider className="absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(rgba(59,130,246,0.09) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.13) 0%,transparent 70%)", filter: "blur(70px)" }} />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold tracking-[0.2em] uppercase">
              My Track Record
            </span>
          </div>
          <LineDivider className="max-w-xs mx-auto mb-12" />

          {/* World's First badge — full width highlight */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="mb-10 text-center px-4 py-5 rounded-2xl mx-auto max-w-2xl"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
            <div className="text-blue-400 text-xs font-mono tracking-[0.3em] uppercase mb-1">World's First</div>
            <div className="text-white font-black text-xl md:text-2xl">Certified Team Coach</div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-4">
            {[
              { to: 28, suffix: "+", label: "Years of Experience", delay: 0 },
              { to: 13, suffix: "+", label: "Years Agile / Scrum Coaching", delay: 80 },
              { to: 16, suffix: "+", label: "Certifications", delay: 160 },
              { to: 850, suffix: "+", label: "Workshops Conducted", delay: 240 },
              { to: 25000, suffix: "+", label: "People Trained", delay: 0 },
              { to: 9000, suffix: "+", label: "Google Reviews", delay: 80 },
              { to: 90, suffix: "+", label: "Net Promoter Score", delay: 160 },
              { to: 49, suffix: "/5.0", label: "Avg Feedback", decimal: true, delay: 240 },
            ].map(({ to, suffix, label, decimal, delay }, i) => (
              <div key={label} className="relative">
                <AnimatedCounter to={to} suffix={suffix} label={label} decimal={decimal} delay={delay} />
                {(i + 1) % 4 !== 0 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-px h-16 -translate-y-1/2"
                    style={{ background: "linear-gradient(transparent, rgba(59,130,246,0.3), transparent)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROGRAMS — dark glass cards ═══════════════════ */}
      <section className="py-16 px-4 relative overflow-hidden" style={{ background: "#030d1e" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.05) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 70%)", filter: "blur(80px)" }} />

        <div className="relative max-w-7xl mx-auto">
          <ScrubReveal className="mb-16">
            <div className="font-mono text-blue-500/40 text-xs tracking-[0.3em] uppercase mb-4">MY PORTFOLIO</div>
            <LineDivider className="max-w-xs mb-6" />
            <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}>
              <ScrambleText text="My Trainings That" className="block" /><span style={{
                background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Transform YOU</span>
            </h2>
            <p className="text-slate-500 mt-4 text-lg max-w-2xl leading-relaxed">
              Globally recognized certifications. Zero PowerPoint. Hands-on workshops delivered physically and virtually across India and globally.
            </p>
          </ScrubReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programs.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Tilt3D className="h-full">
                <Link to={p.href}>
                  <div
                    className="group relative rounded-3xl overflow-hidden h-full cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${p.accent}18`
                      e.currentTarget.style.borderColor = `${p.accent}45`
                      e.currentTarget.style.boxShadow = `0 24px 60px ${p.accent}25, inset 0 1px 0 rgba(255,255,255,0.08)`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                      e.currentTarget.style.boxShadow = "none"
                    }}>
                    {/* Top color line */}
                    <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

                    <div className="p-7">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-black leading-none transition-all duration-300"
                          style={{ fontSize: "3rem", color: `${p.accent}60` }}>
                          {p.short}
                        </div>
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center p-1" style={{ background: p.badge ? "rgba(255,255,255,0.92)" : `${p.accent}20`, border: p.badge ? "none" : `1px solid ${p.accent}50` }}>
                          {p.badge
                            ? <img src={p.badge} alt={p.short} className="w-full h-full object-contain" />
                            : <span className="font-black text-sm text-center leading-tight" style={{ color: p.accent }}>{p.short}</span>
                          }
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}>{p.level}</span>
                        {p.tag && <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-white text-slate-900">{p.tag}</span>}
                      </div>

                      <h3 className="text-white font-black text-lg mb-10 leading-snug">{p.title}</h3>

                      <div className="flex items-center gap-2 text-sm font-bold transition-all duration-300 group-hover:gap-3"
                        style={{ color: "rgba(255,255,255,0.35)" }}>
                        Explore <ArrowRight size={14} />
                      </div>
                    </div>

                    {/* Corner glow */}
                    <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${p.accent}35 0%, transparent 70%)`, filter: "blur(20px)", transform: "translate(35%, 35%)" }} />
                  </div>
                </Link>
                </Tilt3D>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="https://www.learnovative.com/training-calendar/" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 border border-white/15 hover:border-blue-400/40 text-white font-black rounded-2xl text-sm transition-all hover:bg-white/5">
                Training Calendar
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PORTFOLIO / WORK CAROUSEL ═══════════════════ */}
      <PortfolioCarousel />

      {/* ═══════════════════ THE VIJAY DIFFERENCE ═══════════════════ */}
      <section id="after-carousel" className="py-16 px-4 relative overflow-hidden" style={{ background: "#020810" }}>
        <LineDivider className="absolute top-0 left-0 right-0" />
        <ParticleCanvas />

        <div className="relative max-w-7xl mx-auto">
          <ScrubReveal className="text-center mb-16">
            <div className="font-mono text-blue-500/40 text-xs tracking-[0.3em] uppercase mb-4">MY TEACHING APPROACH</div>
            <LineDivider className="max-w-xs mx-auto mb-6" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold mb-5">
              How Do I Create Impact
            </div>
            <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              <WordReveal text='"Learning is precious,' className="block" delay={0.1} />
              <WordReveal text='I create it responsibly and impactfully"' className="text-blue-400 block" delay={0.4} />
            </h2>
          </ScrubReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {vijayDifference.map((d, i) => (
              <motion.div key={d.num}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl p-7 cursor-default overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", transition: "border-color 0.3s, background 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${d.color}50`; (e.currentTarget as HTMLElement).style.background = `${d.color}0a` }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)" }}>

                {/* Big background number */}
                <span className="absolute top-3 right-4 font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: "5.5rem", color: `${d.color}12` }}>
                  {d.num}
                </span>

                {/* Icon */}
                <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${d.color}18`, border: `1px solid ${d.color}40`, boxShadow: `0 0 20px ${d.color}20` }}>
                  <d.icon size={22} style={{ color: d.color }} />
                </div>

                {/* Tagline + Title */}
                <div className="text-[9px] font-black tracking-[0.28em] uppercase mb-2" style={{ color: d.color }}>{d.tagline}</div>
                <h3 className="text-white font-black text-xl leading-tight mb-3">{d.title}</h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">{d.desc}</p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full"
                  style={{ background: `linear-gradient(90deg, ${d.color}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="py-16 px-4 relative overflow-hidden" style={{ background: "#030d1e" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="relative max-w-3xl mx-auto">
          <ScrubReveal>
            <div className="text-center mb-14">
              <div className="font-mono text-blue-500/40 text-xs tracking-[0.3em] uppercase mb-4">Got Questions?</div>
              <h2 className="font-black text-white text-3xl sm:text-4xl">Frequently Asked</h2>
            </div>
          </ScrubReveal>
          <div>
            {faqItems.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} index={i} />)}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-10 text-center">
            <p className="text-slate-500 text-sm mb-4">Still have questions?</p>
            <Link to="/contact">
              <button className="px-7 py-3 rounded-2xl border border-white/15 text-white text-sm font-bold hover:border-blue-400/40 hover:bg-white/5 transition-all">
                Book an appointment →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS — dark cinematic ═══════════════════ */}
      <section className="py-16 px-4 relative overflow-hidden" style={{ background: "#030d1e" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(rgba(59,130,246,0.07) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 70%)", filter: "blur(70px)" }} />

        <div className="relative max-w-7xl mx-auto">
          <ScrubReveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold mb-5">
              What Participants Say
            </div>
            <h2 className="font-black text-white mb-5" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              Trusted by <span className="text-blue-400">25,000+</span> Professionals
            </h2>
            <div className="flex justify-center items-center gap-1.5">
              {[1,2,3,4,5].map(s => <Star key={s} size={18} className="fill-yellow-400 text-yellow-400" />)}
              <span className="text-slate-400 text-sm ml-2">4.9 / 5.0 &nbsp;·&nbsp; 9,000+ Google Reviews</span>
            </div>
          </ScrubReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12 }}>
                <Tilt3D className="h-full" maxTilt={7}>
                <div
                  className="h-full rounded-3xl p-8 flex flex-col transition-colors duration-300 cursor-default"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"
                    e.currentTarget.style.background = "rgba(59,130,246,0.06)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                  }}>
                  <Quote size={26} className="text-blue-400/30 mb-4 shrink-0" />
                  <div className="flex gap-1 mb-5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm flex-1 mb-8">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/80 flex items-center justify-center text-white font-black text-sm shrink-0">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                    <div className="ml-auto shrink-0">
                      <span className="text-[10px] px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-semibold">{t.company}</span>
                    </div>
                  </div>
                </div>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUSTED BY — two-row infinite scroll ═══════════════════ */}
      <section className="py-20 overflow-hidden" style={{ background: "#050f1e" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-10 px-4">
          <p className="text-slate-600 text-xs uppercase tracking-[0.3em] font-semibold">Trusted by professionals from</p>
        </motion.div>

        {/* Row 1 — scroll left */}
        <div className="relative overflow-hidden mb-3">
          <div className="flex items-center" style={{ animation: "marquee-scroll 28s linear infinite" }}>
            {[...companiesRow1, ...companiesRow1].map((c, i) => (
              <div key={i} className="mx-2.5 flex-shrink-0 flex items-center justify-center px-5 py-3 rounded-xl transition-all cursor-default"
                style={{ background: "rgba(255,255,255,0.93)", border: "1px solid rgba(255,255,255,0.15)", minWidth: "130px", height: "56px", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.93)"; e.currentTarget.style.boxShadow = "" }}>
                <img src={c.logo} alt={c.name} className="max-h-8 max-w-[110px] object-contain" style={{ opacity: 1 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scroll right */}
        <div className="relative overflow-hidden">
          <div className="flex items-center" style={{ animation: "marquee-reverse 34s linear infinite" }}>
            {[...companiesRow2, ...companiesRow2].map((c, i) => (
              <div key={i} className="mx-2.5 flex-shrink-0 flex items-center justify-center px-5 py-3 rounded-xl transition-all cursor-default"
                style={{ background: "rgba(255,255,255,0.93)", border: "1px solid rgba(255,255,255,0.15)", minWidth: "130px", height: "56px", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.93)"; e.currentTarget.style.boxShadow = "" }}>
                <img src={c.logo} alt={c.name} className="max-h-8 max-w-[110px] object-contain" style={{ opacity: 1 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Mini stats row */}
        <div className="max-w-4xl mx-auto px-4 mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { icon: Globe, val: "8 Countries", label: "Global Reach" },
              { icon: CheckCircle, val: "NPS 90+", label: "Satisfaction" },
              { icon: Star, val: "4.9/5.0", label: "Average Feedback" },
              { icon: Star, val: "9,000+", label: "Google Reviews" },
              { icon: Users, val: "25,000+", label: "People Trained" },
            ].map(({ icon: Icon, val, label }) => (
              <div key={label}
                className="rounded-2xl p-5 text-center transition-all duration-300 cursor-default"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)" }}>
                <Icon size={18} className="text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-black text-white mb-0.5">{val}</div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-20 px-4 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,255,255,0.18) 0%,transparent 70%)", filter: "blur(70px)" }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%)", filter: "blur(60px)" }} />

        {/* Star decorations */}
        <div className="absolute top-16 left-[12%] pointer-events-none select-none"><Star6 size={22} color="rgba(255,255,255,0.2)" delay={0} /></div>
        <div className="absolute bottom-16 right-[12%] pointer-events-none select-none"><Star6 size={16} color="rgba(255,255,255,0.15)" delay={1} /></div>
        <div className="absolute top-1/2 left-[5%] pointer-events-none select-none"><Star6 size={12} color="rgba(255,255,255,0.1)" delay={2} /></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Now Taking Bookings
            </div>
            <h2 className="font-black text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}>
              Decided to <span className="text-blue-300">Improve<br />Your Career?</span>
            </h2>
            <p className="text-blue-100 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Join 25,000+ professionals I've trained. Book your seat in my next CSM, A-CSM, CSPO, or AI for Scrum Masters workshop.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticWrapper>
                <a href="https://www.learnovative.com/training-calendar/" target="_blank" rel="noopener noreferrer">
                  <button
                    className="group px-10 py-4 bg-white text-blue-700 font-black rounded-2xl text-sm transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/30 inline-flex items-center gap-2"
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 50px rgba(255,255,255,0.35)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}>
                    See Upcoming Dates <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
              </MagneticWrapper>
              <MagneticWrapper>
                <Link to="/contact">
                  <button className="px-10 py-4 border-2 border-white/40 hover:border-white text-white font-black rounded-2xl text-sm transition-all hover:bg-white/10">
                    Corporate Training Enquiry
                  </button>
                </Link>
              </MagneticWrapper>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
