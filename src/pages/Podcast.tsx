import { motion } from "framer-motion"
import { Mic, Music } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const episodes = [
  { ep: "EP 01", title: "Learnovative Agile & Scrum Jingles Introduction", src: "/Podcast-episode-1.mp4" },
  { ep: "EP 02", title: "History of Agile", src: "/Podcast-Episode-2.mp4" },
  { ep: "EP 03", title: "Agile Manifesto Values", src: "/Podcast-Episode-3.mp4" },
  { ep: "EP 04", title: "Agile Manifesto Principles", src: "/Podcast-episode-4.mp4" },
  { ep: "EP 05", title: "History of Scrum", src: "/Podcast-episode-5.mp4" },
  { ep: "EP 06", title: "Scrum Overview", src: "/Podcast-episode-6.mp4" },
  { ep: "EP 07", title: "Elements of Scrum Framework", src: "/Podcast-Episode-7.mp4" },
]

export default function Podcast() {
  return (
    <div className="min-h-screen relative" style={{
      background: "linear-gradient(160deg, #f0f7ff 0%, #e8f0fe 40%, #f5f0ff 100%)",
    }}>
      {/* Decorative background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #93c5fd, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #a5b4fc, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #bfdbfe, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <PageHeader badge="Podcast" variant="podcast"
        title={<>Agile & Scrum <span className="text-blue-400">Jingles</span></>}
        subtitle="Deep dives on Agile, Scrum, organizational transformation, and building extraordinary teams — drawn from 28+ years as a Certified Scrum Trainer & Enterprise Agile Coach." />

      <section className="py-20 px-4 relative">
        <div className="max-w-2xl mx-auto">

          {/* Header row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8 p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-blue-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <Mic size={20} className="text-white" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-lg leading-none">Agile & Scrum Jingles</p>
              <p className="text-slate-500 text-sm mt-1">7 Episodes · Hosted by Vijay Bandaru</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              {[1,2,3,4,5].map(b => (
                <div key={b} className="w-1 rounded-full bg-blue-400 opacity-70"
                  style={{ height: `${8 + b * 4}px`, animation: `pulse ${0.6 + b * 0.15}s ease-in-out infinite alternate` }} />
              ))}
            </div>
          </motion.div>

          <Separator className="mb-8 bg-blue-100" />

          {/* Episodes */}
          <div className="space-y-4">
            {episodes.map((ep, i) => (
              <motion.div key={ep.ep}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}>
                <div className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-300 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="text-[11px] font-bold px-2.5 py-1 bg-blue-600 text-white shrink-0 rounded-lg">
                      {ep.ep}
                    </Badge>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Music size={13} className="text-blue-400 shrink-0" />
                      <h3 className="text-slate-900 font-semibold text-sm leading-snug truncate">{ep.title}</h3>
                    </div>
                  </div>
                  <audio controls className="w-full" style={{ height: "36px", borderRadius: "10px" }}>
                    <source src={ep.src} type="video/mp4" />
                  </audio>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
