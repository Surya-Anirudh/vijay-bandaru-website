import { motion } from "framer-motion"
import { Mic } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
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
    <div className="bg-slate-50 min-h-screen">
      <PageHeader badge="Podcast"
        title={<>Agile & Scrum <span className="text-pink-400">Jingles</span></>}
        subtitle="Deep dives on Agile, Scrum, organizational transformation, and building extraordinary teams — drawn from 28+ years as a Certified Scrum Trainer & Enterprise Agile Coach." />

      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Header row */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <Mic size={18} className="text-white" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-lg leading-none">Agile & Scrum Jingles</p>
              <p className="text-slate-500 text-sm mt-0.5">7 Episodes · Hosted by Vijay Bandaru</p>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Episodes */}
          <div className="space-y-4">
            {episodes.map((ep, i) => (
              <motion.div key={ep.ep}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}>
                <Card className="border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 bg-white rounded-2xl">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <Badge variant="secondary" className="text-[11px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 shrink-0 mt-0.5 rounded-lg">
                        {ep.ep}
                      </Badge>
                      <h3 className="text-slate-900 font-semibold text-sm leading-snug">{ep.title}</h3>
                    </div>
                    <audio controls className="w-full" style={{ height: "36px", borderRadius: "10px" }}>
                      <source src={ep.src} type="video/mp4" />
                    </audio>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
