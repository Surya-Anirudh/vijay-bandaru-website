import { motion } from "framer-motion"
import { Mic } from "lucide-react"
import { Link } from "react-router-dom"
import PageHeader from "@/components/PageHeader"

export default function Podcast() {
  return (
    <div className="bg-white">
      <PageHeader badge="Podcast"
        title={<>Agile & Scrum <span className="text-pink-400">Jingles</span></>}
        subtitle="I host deep conversations on Agile, Scrum, organizational transformation, and building extraordinary teams — drawing from my 28+ years as a Certified Scrum Trainer & Enterprise Agile Coach." />

      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Episodes Coming Soon</h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              New episodes are being recorded and will be available here shortly. Stay tuned for in-depth conversations on Agile, Scrum, AI, coaching, and career growth.
            </p>
            <Link to="/contact">
              <button className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg">
                Get Notified When We Launch
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
