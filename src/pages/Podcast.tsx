import { motion } from "framer-motion"
import { Mic } from "lucide-react"
import PageHeader from "@/components/PageHeader"

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
    <div className="bg-white">
      <PageHeader badge="Podcast"
        title={<>Agile & Scrum <span className="text-pink-400">Jingles</span></>}
        subtitle="I host deep conversations on Agile, Scrum, organizational transformation, and building extraordinary teams — drawing from my 28+ years as a Certified Scrum Trainer & Enterprise Agile Coach." />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {episodes.map((ep, i) => (
            <motion.div key={ep.ep} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 flex flex-col items-center justify-center shrink-0">
                    <Mic size={14} className="text-white mb-0.5" />
                    <span className="text-[8px] text-white font-bold">{ep.ep}</span>
                  </div>
                  <h3 className="text-slate-900 font-bold text-base leading-snug">{ep.title}</h3>
                </div>
                <audio controls className="w-full rounded-xl" style={{ height: "40px" }}>
                  <source src={ep.src} type="video/mp4" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
