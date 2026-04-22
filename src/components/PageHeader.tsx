import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PageHeaderProps {
  badge: string
  title: ReactNode
  subtitle: string
  children?: ReactNode
}

export default function PageHeader({ badge, title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-24 px-4 overflow-hidden" style={{ background: "#030d1e" }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.28) 0%, transparent 70%)", filter: "blur(70px)", animation: "glow-pulse 5s ease-in-out infinite" }} />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)", filter: "blur(55px)", animation: "glow-pulse 7s ease-in-out infinite 2s" }} />
      <div className="absolute top-1/2 -left-10 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(45px)" }} />

      {/* Decorative horizontal line */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.3) 30%, rgba(59,130,246,0.5) 50%, rgba(59,130,246,0.3) 70%, transparent 100%)" }} />

      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: "easeOut" }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold mb-7 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {badge}
          </div>

          {/* Title */}
          <h1 className="font-black text-white leading-none mb-6" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">{subtitle}</p>

          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </div>
  )
}
