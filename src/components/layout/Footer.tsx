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
  { label: "FB", href: "https://facebook.com/vijay.bandaru.75" },
  { label: "TW", href: "https://twitter.com/vkbandaru" },
  { label: "IG", href: "https://instagram.com/vijaybandaru74/" },
  { label: "LI", href: "https://linkedin.com/in/vijaybandaru" },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="VB Logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="text-white font-bold">Vijay Bandaru</div>
                <div className="text-blue-400 text-xs font-medium">Certified Scrum Trainer & Enterprise Agile Coach</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              CEO & Principal Trainer at Learnovative. 25+ years helping organizations improve their ability
              to improve through Agile transformation, Scrum training, and enterprise coaching.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {socials.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-xs font-bold text-slate-400 hover:text-white transition-all hover:scale-105">
                  {label}
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

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Vijay Bandaru | Learnovative. All rights reserved.</p>
          <p>Certified Scrum Trainer · CSM Training Hyderabad · Agile Coach India</p>
        </div>
      </div>
    </footer>
  )
}
