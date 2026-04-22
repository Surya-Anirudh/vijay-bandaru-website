import { motion } from "framer-motion"
import { Mic, ExternalLink, Play } from "lucide-react"
import PageHeader from "@/components/PageHeader"

const topics = [
  "Agile Transformation in Enterprises",
  "Scrum Master Career Path",
  "Product Ownership Best Practices",
  "Lean and Kanban in Software",
  "Building High-Performing Agile Teams",
  "AI in Agile Development",
  "Engineering Culture in Agile Teams",
  "Coaching vs. Training — What's the Difference?",
]

const platforms = [
  { name: "Spotify", icon: "🎵" },
  { name: "Apple Podcasts", icon: "🎙" },
  { name: "Google Podcasts", icon: "🎧" },
  { name: "YouTube", icon: "▶" },
]

const episodes = [
  { ep: "EP 12", title: "From Programmer to Certified Scrum Trainer: My Journey", duration: "42 min" },
  { ep: "EP 11", title: "Why Most Agile Transformations Fail — and How to Fix Them", duration: "38 min" },
  { ep: "EP 10", title: "The Difference Between a Scrum Master and an Agile Coach", duration: "35 min" },
  { ep: "EP 09", title: "AI + Agile: What Scrum Masters Need to Know in 2024", duration: "44 min" },
  { ep: "EP 08", title: "Kanban vs Scrum: Which One Does Your Team Need?", duration: "29 min" },
  { ep: "EP 07", title: "Building Engineering Culture in Agile Teams", duration: "41 min" },
]

export default function Podcast() {
  return (
    <div className="bg-white">
      <PageHeader badge="Podcast"
        title={<>Agile <span className="text-blue-400">Conversations</span></>}
        subtitle="I host deep conversations on Agile, Scrum, organizational transformation, and building extraordinary teams — drawing from my 25+ years as a Certified Scrum Trainer & Enterprise Agile Coach." />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Host info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-slate-900 font-black text-xl">Agile Conversations</h2>
                    <p className="text-blue-600 text-sm font-semibold">Hosted by Me</p>
                  </div>
                </div>
                <p className="text-slate-500 leading-relaxed mb-6">
                  I bring my 25+ years of expertise in Agile transformation,
                  Scrum training, and enterprise coaching to each episode. Whether you're a
                  Scrum Master, Product Owner, or organizational leader — there's something
                  for everyone on this podcast.
                </p>
                <div>
                  <div className="text-slate-900 font-semibold text-sm mb-3">Topics Covered:</div>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Listen on */}
              <div className="mt-6">
                <h3 className="text-slate-900 font-bold mb-4">Listen On</h3>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((p) => (
                    <div key={p.name} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-blue-300 hover:shadow-md transition-all hover:scale-105">
                      <span className="text-xl">{p.icon}</span>
                      <span className="text-slate-700 text-sm font-medium">{p.name}</span>
                      <ExternalLink size={12} className="text-slate-400 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — Episodes */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Latest Episodes</h2>
              <div className="space-y-3">
                {episodes.map((ep, i) => (
                  <motion.div key={ep.ep} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all duration-300 group cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex flex-col items-center justify-center shrink-0 text-center group-hover:bg-blue-600 transition-colors">
                        <Mic size={14} className="text-blue-600 group-hover:text-white mb-0.5 transition-colors" />
                        <span className="text-[9px] text-blue-600 group-hover:text-white font-bold transition-colors">{ep.ep}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-slate-900 text-sm font-semibold leading-snug group-hover:text-blue-600 transition-colors truncate">{ep.title}</h3>
                        <span className="text-slate-400 text-xs">{ep.duration}</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                        <Play size={14} className="text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a href="https://vijaybandaru.com/podcast/" target="_blank" rel="noopener noreferrer">
                  <button className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all hover:shadow-xl hover:shadow-blue-600/25 hover:scale-105">
                    View All Episodes
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
