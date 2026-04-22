import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Clock, Globe, Monitor, Users, ChevronRight } from "lucide-react"
import PageHeader from "@/components/PageHeader"

const programs = [
  {
    id: "csm", title: "Certified Scrum Master (CSM)", subtitle: "Scrum Alliance Certification",
    level: "Foundation", levelColor: "bg-blue-50 text-blue-700", accentColor: "#2563eb",
    duration: "2 days (16 hrs) or 3 days (5.5 hrs/day)", format: "Physical or Live Virtual", language: "English",
    href: "https://vijaybandaru.com/certified-scrum-master-csm-training-hyderabad/",
    tag: "Most Popular",
    description: "Master the fundamentals of Scrum. Earn the globally recognized CSM certification through 100% interactive, visual-based training with zero PowerPoint.",
    outcomes: ["Core Scrum concepts & Agile mindset","Scrum roles and accountabilities","Facilitating Scrum events effectively","Managing Scrum artifacts","Building high-performing teams","Effective communication strategies","Exam prep and practice tests","Hands-on role-playing exercises"],
    audience: ["Project Managers","Developers","Product Owners","Team Leads","Business Analysts","Stakeholders","Professionals transitioning to Agile"],
    benefits: ["Global industry recognition","Enhanced Agile career","Improved team collaboration","Scrum Alliance community access","Post-training career support"],
  },
  {
    id: "acsm", title: "Advanced Certified Scrum Master (A-CSM)", subtitle: "Scrum Alliance Advanced Certification",
    level: "Advanced", levelColor: "bg-indigo-50 text-indigo-700", accentColor: "#4f46e5",
    duration: "2 days intensive", format: "Physical or Live Virtual", language: "English",
    href: "https://vijaybandaru.com/advanced-certified-scrum-master-a-csm-certification-hyderabad/",
    tag: null,
    description: "Deepen your Scrum mastery with advanced facilitation, coaching, and servant leadership skills. Designed for experienced Scrum Masters ready to lead transformation.",
    outcomes: ["Advanced facilitation techniques","Servant leadership development","Coaching and mentoring skills","Complex team dynamics","Scaling Scrum across teams","Organizational change management","A-CSM credential"],
    audience: ["Experienced Scrum Masters","Agile Coaches","Team Leads","Engineering Managers"],
    benefits: ["A-CSM credential","Advanced coaching skills","Leadership development","Higher earning potential","Career differentiation"],
  },
  {
    id: "ai-sm", title: "AI for Scrum Masters", subtitle: "Modern Agile with Artificial Intelligence",
    level: "Emerging", levelColor: "bg-emerald-50 text-emerald-700", accentColor: "#059669",
    duration: "1 day intensive", format: "Physical or Live Virtual", language: "English",
    href: "https://vijaybandaru.com/ai-for-scrum-masters-training-hyderabad/",
    tag: "New",
    description: "Harness Artificial Intelligence to supercharge your Scrum practice. Learn how AI tools can enhance sprint planning, retrospectives, and team productivity.",
    outcomes: ["AI fundamentals for Agile","AI-powered sprint planning","Automated retrospective insights","AI-assisted backlog refinement","Using AI for impediment tracking","Practical AI tools for Scrum","Future-proofing your career"],
    audience: ["Scrum Masters","Agile Coaches","Tech Leads","Forward-thinking practitioners"],
    benefits: ["Future-ready skills","Competitive advantage","Improved team velocity","Data-driven decisions","Practical AI toolset"],
  },
  {
    id: "cspo", title: "Certified Scrum Product Owner (CSPO)", subtitle: "Scrum Alliance Certification",
    level: "Foundation", levelColor: "bg-blue-50 text-blue-700", accentColor: "#2563eb",
    duration: "2 days (16 hrs) or 3 days (5.5 hrs/day)", format: "Physical or Live Virtual", language: "English",
    href: "https://vijaybandaru.com/certified-scrum-product-owner-cspo-training-hyderabad/",
    tag: null,
    description: "Maximize product value, manage backlogs effectively, and align stakeholders to deliver outstanding products. Earn your CSPO certification from Scrum Alliance.",
    outcomes: ["Product vision and roadmap creation","Backlog management & prioritization","Stakeholder alignment techniques","Customer value maximization","Writing effective user stories","Release planning & forecasting","CSPO credential"],
    audience: ["Product Managers","Business Analysts","Entrepreneurs","Project Managers"],
    benefits: ["CSPO credential","Product strategy skills","Stakeholder communication","Better product outcomes","Career advancement"],
  },
  {
    id: "acspo", title: "Advanced Certified Scrum Product Owner (A-CSPO)", subtitle: "Scrum Alliance Advanced Certification",
    level: "Advanced", levelColor: "bg-indigo-50 text-indigo-700", accentColor: "#4f46e5",
    duration: "2 days intensive", format: "Physical or Live Virtual", language: "English",
    href: "https://vijaybandaru.com/advanced-certified-scrum-product-owner-a-cspo-certification-hyderabad/",
    tag: null,
    description: "Take your product ownership to the next level. Master advanced product strategy, customer research, and cross-functional leadership to drive organizational value.",
    outcomes: ["Advanced product strategy","Customer research & validation","Cross-functional leadership","Advanced prioritization frameworks","Product metrics & analytics","Scaling product ownership","A-CSPO credential"],
    audience: ["Senior Product Owners","Product Leaders","Business Executives"],
    benefits: ["A-CSPO credential","Strategic thinking","Leadership skills","Advanced career positioning","High-impact delivery"],
  },
  {
    id: "ai-po", title: "AI for Product Owners", subtitle: "Future-Forward Product Ownership",
    level: "Emerging", levelColor: "bg-emerald-50 text-emerald-700", accentColor: "#059669",
    duration: "1 day intensive", format: "Physical or Live Virtual", language: "English",
    href: "https://vijaybandaru.com/ai-for-product-owners-training-hyderabad/",
    tag: "New",
    description: "Integrate AI capabilities into product ownership workflows. From AI-driven prioritization to automated user story generation — build better products faster.",
    outcomes: ["AI for product discovery","AI-driven backlog prioritization","Automated user story generation","AI competitive analysis","Data-driven product decisions","AI roadmapping tools","Future-ready skills"],
    audience: ["Product Owners","Product Managers","Entrepreneurs","Digital transformation leaders"],
    benefits: ["Competitive advantage","Faster product discovery","Better decisions","Reduced manual effort","Innovation leadership"],
  },
]


export default function Training() {
  return (
    <div className="bg-white">
      <PageHeader badge="Training Programs"
        title={<>Agile <span className="text-blue-400">Certifications</span></>}
        subtitle="I deliver globally recognized Scrum Alliance certifications with zero PowerPoint — 100% interactive, practical, and engaging training that actually transforms the way you work.">
        <div className="flex flex-wrap gap-6">
          {[{ icon: Clock, text: "2–3 Day Workshops" },{ icon: Monitor, text: "Physical & Virtual" },{ icon: Globe, text: "English" },{ icon: Users, text: "25,000+ Trained" }].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-blue-200/80 text-sm"><Icon size={15} /> {text}</div>
          ))}
        </div>
      </PageHeader>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {programs.map((p, i) => (
            <motion.div key={p.id} id={p.id} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                {/* Top accent */}
                <div className="h-1" style={{ background: p.accentColor }} />
                <div className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${p.levelColor}`}>{p.level}</span>
                        {p.tag && <span className="text-xs px-2.5 py-1 rounded-full bg-blue-600 text-white font-semibold">{p.tag}</span>}
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 mb-1">{p.title}</h2>
                      <p className="text-blue-600 text-sm font-semibold mb-4">{p.subtitle}</p>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{p.description}</p>
                      <div className="space-y-2 mb-6 text-sm">
                        <div className="flex items-center gap-2 text-slate-600"><Clock size={13} className="text-blue-500 shrink-0" />{p.duration}</div>
                        <div className="flex items-center gap-2 text-slate-600"><Monitor size={13} className="text-blue-500 shrink-0" />{p.format}</div>
                        <div className="flex items-center gap-2 text-slate-600"><Globe size={13} className="text-blue-500 shrink-0" />{p.language}</div>
                      </div>
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        <button className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-105 hover:shadow-lg"
                          style={{ background: p.accentColor }}>
                          Enroll Now <ArrowRight size={15} />
                        </button>
                      </a>
                    </div>
                    {/* Middle */}
                    <div>
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 rounded-full inline-block" style={{ background: p.accentColor }} />
                        What You'll Learn
                      </h3>
                      <ul className="space-y-2">
                        {p.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2 text-sm text-slate-500">
                            <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: p.accentColor }} />{o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Right */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <span className="w-1 h-5 rounded-full inline-block" style={{ background: p.accentColor }} />
                          Who Should Attend
                        </h3>
                        <ul className="space-y-1.5">
                          {p.audience.map((a) => (
                            <li key={a} className="text-sm text-slate-500 flex items-center gap-2">
                              <ChevronRight size={12} style={{ color: p.accentColor }} />{a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <span className="w-1 h-5 rounded-full inline-block" style={{ background: p.accentColor }} />
                          Key Benefits
                        </h3>
                        <ul className="space-y-1.5">
                          {p.benefits.map((b) => (
                            <li key={b} className="text-sm text-slate-500 flex items-center gap-2">
                              <CheckCircle size={12} className="shrink-0" style={{ color: p.accentColor }} />{b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Calendar CTA */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-3">View the Training Calendar</h2>
          <p className="text-slate-400 mb-2">Workshops at 9AM–5PM IST and 6PM–11PM IST — accommodating Asia, Europe & US timezones.</p>
          <p className="text-slate-500 mb-8 text-sm">Physical and Live Virtual sessions available across India and globally.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.learnovative.com/training-calendar/" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all hover:shadow-xl hover:shadow-blue-600/25 hover:scale-105">
                See Upcoming Dates <ArrowRight className="inline w-4 h-4 ml-1" />
              </button>
            </a>
            <Link to="/contact">
              <button className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all">
                Enquire for Corporate Training
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
