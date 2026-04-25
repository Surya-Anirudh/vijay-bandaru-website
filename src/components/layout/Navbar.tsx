import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Training", href: "/training" },
  { label: "Achievements", href: "/achievements" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [location.pathname])

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href)

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — wordmark */}
          <Link to="/" className="flex items-center gap-0 group shrink-0 select-none">
            <img src="/logo.png" alt="VB Logo" className="w-10 h-10 mr-2.5 transition-transform duration-300 group-hover:scale-110" />
            <div className="leading-none">
              <div className="font-black text-base tracking-tight text-slate-900">
                VIJAY <span className="text-blue-500">BANDARU</span>
              </div>
              <div className="text-[9px] font-semibold tracking-[0.18em] uppercase mt-0.5 text-slate-500">
                TRAINER · COACH · SPEAKER
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm rounded-lg font-medium transition-all duration-300",
                  isActive(link.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}>
                {link.label}
              </Link>
            ))}
          </nav>


          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg transition-all duration-300 text-slate-500 hover:bg-slate-100"
            onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-white/10 shadow-2xl"
            style={{ background: "#030d1e" }}>
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive(link.href) ? "text-white bg-white/15" : "text-white/65 hover:text-white hover:bg-white/10"
                  )}>
                  {link.label}
                  {isActive(link.href) && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Link to="/contact">
                  <button className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                    Book a Session
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
