import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import { useState } from "react"

const courses = [
  "Certified Scrum Master (CSM®)",
  "Advanced Certified Scrum Master (A-CSM®)",
  "Certified Scrum Product Owner (CSPO®)",
  "Advanced Certified Scrum Product Owner (A-CSPO®)",
  "AI for Scrum Masters",
  "AI for Product Owners",
  "Agile Coaching (ICP-ACC)",
  "PMI ACP Certification Training",
  "Professional Scrum Master (PSM1)",
  "Professional Scrum Product Owner (PSPO1)",
  "Corporate Agile Training",
  "Other Course",
]

const socials = [
  {
    label: "Facebook", href: "https://www.facebook.com/vijay.bandaru.75", color: "#1877f2",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: "Instagram", href: "https://www.instagram.com/vijaybandaru74/", color: "#e1306c",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    label: "LinkedIn", href: "https://linkedin.com/in/vijaybandaru", color: "#0077b5",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "Learnovative", href: "https://www.learnovative.com", color: "#2563eb",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", course: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `${form.firstName} ${form.lastName}`, email: form.email, subject: form.course, message: `Phone: ${form.phone}\n\n${form.message}` }),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      window.open(`mailto:vijaybandaru@learnovative.com?subject=${encodeURIComponent(form.course || "Inquiry")}&body=${encodeURIComponent(`Name: ${form.firstName} ${form.lastName}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`)}`)
      setSubmitted(true)
    }
    setLoading(false)
  }

  const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"

  return (
    <div className="bg-white">
      <PageHeader badge="Get in Touch"
        title={<>Contact <span className="text-blue-400">Vijay</span></>}
        subtitle="Ready to transform your team or organization? Get in touch for training, coaching, speaking engagements, or any queries." />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Left — Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: "vijaybandaru@learnovative.com", href: "mailto:vijaybandaru@learnovative.com" },
              { icon: Phone, label: "Phone / WhatsApp", value: "+91-98480-32144", href: "tel:+919848032144" },
              { icon: MapPin, label: "Location", value: "Hyderabad, India", href: undefined as string | undefined },
              { icon: ExternalLink, label: "Website", value: "learnovative.com", href: "https://learnovative.com" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-slate-900 text-sm font-semibold hover:text-blue-600 transition-colors">{value}</a>
                  ) : (
                    <div className="text-slate-900 text-sm font-semibold">{value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-slate-700 text-sm font-semibold mb-4">Connect on Social Media</div>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ label, icon, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all hover:scale-105">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: color }}>{icon}</span>
                    <span className="text-slate-600 text-xs font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-900 text-sm font-semibold">Available for Bookings</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Corporate training, workshops (9AM–5PM IST or 6PM–11PM IST), speaking engagements, and executive coaching sessions.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <Send size={36} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-6">Thank you for reaching out. I will respond within 24–48 hours.</p>
                  <button onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-all">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-black text-slate-900 mb-6">Send a Message</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-700 font-medium block mb-1.5">First Name *</label>
                      <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="First name" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 font-medium block mb-1.5">Last Name *</label>
                      <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Last name" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-700 font-medium block mb-1.5">Phone Number *</label>
                      <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 font-medium block mb-1.5">Email Address *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 font-medium block mb-1.5">Course / Inquiry *</label>
                    <select name="course" required value={form.course} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-slate-900 outline-none border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                      <option value="">Select a course or topic</option>
                      {courses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 font-medium block mb-1.5">Message *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      placeholder="Tell us about your requirements, team size, training goals..."
                      className={`${inputCls} resize-none`} />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 text-sm font-semibold text-white rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 hover:shadow-xl hover:shadow-blue-600/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                    {loading ? "Sending..." : "Submit Enquiry"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
