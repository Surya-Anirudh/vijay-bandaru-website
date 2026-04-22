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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — wordmark */}
          <Link to="/" className="flex items-center gap-0 group shrink-0 select-none">
            {/* Blue left accent bar */}
            <div className="w-1 h-8 rounded-full bg-blue-500 mr-3 group-hover:h-9 transition-all duration-300" />
            <div className="leading-none">
              <div className={cn("font-black text-base tracking-tight transition-colors duration-500", scrolled ? "text-slate-900" : "text-white")}>
                VIJAY <span className="text-blue-500">BANDARU</span>
              </div>
              <div className={cn("text-[9px] font-semibold tracking-[0.18em] uppercase transition-colors duration-500 mt-0.5", scrolled ? "text-slate-400" : "text-white/45")}>
                Enterprise Agile Coach
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
                    ? scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/15"
                    : scrolled ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-white/70 hover:text-white hover:bg-white/10"
                )}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919848032144"
              className={cn("text-sm font-medium hidden xl:block transition-colors duration-500", scrolled ? "text-slate-500 hover:text-blue-600" : "text-white/55 hover:text-white")}>
              +91-98480-32144
            </a>
            <Link to="/contact">
              <button
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-100 relative overflow-hidden"
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(59,130,246,0.6), 0 0 0 1px rgba(96,165,250,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}>
                Book a Session
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn("lg:hidden p-2 rounded-lg transition-all duration-300", scrolled ? "text-slate-500 hover:bg-slate-100" : "text-white/80 hover:bg-white/10")}
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
