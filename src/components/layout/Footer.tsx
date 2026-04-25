import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"

const links = {
  pages: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Training Programs", href: "/training" },
    { label: "Achievements", href: "/achievements" },
    { label: "Gallery", href: "/gallery" },
  ],
  more: [
    { label: "Blog", href: "/blog" },
    { label: "Podcast", href: "/podcast" },
    { label: "Contact", href: "/contact" },
    { label: "Learnovative", href: "https://learnovative.com", external: true },
    { label: "Training Calendar", href: "https://www.learnovative.com/training-calendar/", external: true },
  ],
}

const socials = [
  {
    label: "Facebook", href: "https://facebook.com/vijay.bandaru.75",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram", href: "https://instagram.com/vijaybandaru74/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn", href: "https://linkedin.com/in/vijaybandaru",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Learnovative", href: "https://www.learnovative.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <img src="/logo.png" alt="VB Logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="text-white font-bold text-base">VIJAY <span className="text-blue-500">BANDARU</span></div>
                <div className="text-[8px] font-semibold tracking-[0.04em] uppercase mt-0.5 text-slate-500">TRAINER · COACH · SPEAKER</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm mt-4">
              CEO & Principal Trainer at Learnovative. For 28+ years, I've helped organizations build the capability to continuously improve through Agile transformation, Scrum training, and enterprise coaching.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {socials.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105">
                  {icon}
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <a href="mailto:vijaybandaru@learnovative.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Mail size={13} className="text-blue-500 shrink-0" />
                vijaybandaru@learnovative.com
              </a>
              <a href="tel:+919848032144" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Phone size={13} className="text-blue-500 shrink-0" />
                +91-98480-32144
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-blue-500 shrink-0" />
                Hyderabad, India
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Pages</h4>
            <ul className="space-y-2.5">
              {links.pages.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm hover:text-blue-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">More</h4>
            <ul className="space-y-2.5">
              {links.more.map((l) => (
                <li key={l.href}>
                  {"external" in l && l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer"
                      className="text-sm hover:text-blue-400 transition-colors flex items-center gap-1">
                      {l.label} <ExternalLink size={10} />
                    </a>
                  ) : (
                    <Link to={l.href} className="text-sm hover:text-blue-400 transition-colors">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Vijay Bandaru | Learnovative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
