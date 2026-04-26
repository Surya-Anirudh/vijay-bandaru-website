import { motion } from "framer-motion"
import { useState } from "react"
import { X, Images } from "lucide-react"
import PageHeader from "@/components/PageHeader"

const photos = [
  { src: "/gallery-zuzi.jpg", alt: "Facilitated Coaches Clinic at Global Scrum Gathering with Zuzi (CST)", caption: "Coaches Clinic at Global Scrum Gathering with Zuzi (CST) — Bengaluru, June 2016" },
  { src: "/gallery-pete.png", alt: "Co-trained with Pete Deemer for CST certification", caption: "Co-trained with Pete Deemer in CSM class — received recommendation, Bengaluru June 2016" },
  { src: "/gallery-manny.jpg", alt: "With Manny, CEO of Scrum Alliance", caption: "With Manny, CEO of Scrum Alliance at Global Scrum Gathering — Bengaluru, June 2016" },
  { src: "/guest-yandamuri.jpeg", alt: "With Yandamuri Veerendranath", caption: "With famous writer, director, motivational Yandamuri Veerendranath" },
  { src: "/gallery-diana.png", alt: "With Diana Larsen at Agile India 2015", caption: "With Diana Larsen (co-author of Agile Retrospectives) at Agile India 2015" },
  { src: "/gallery-rsgsa.png", alt: "Speaker at Regional Scrum Gathering South Asia 2015", caption: "Speaker at Regional Scrum Gathering South Asia 2015 — presented Lean Ops case study" },
  { src: "/gallery-rsgi.jpg", alt: "Presented at Regional Scrum Gathering India 2014", caption: "Presented Agile Transformation case study at Regional Scrum Gathering India 2014 — Hyderabad" },
  { src: "/gallery-global.jpg", alt: "Global Scrum Gathering 2016 Bangalore", caption: "Presented Creating Engineering Culture at Global Scrum Gathering — June 27, 2016" },
  { src: "/gallery-carol.jpg", alt: "With Carol McEvan MD of Scrum Alliance", caption: "With Carol McEvan, MD of Scrum Alliance at Regional Scrum Gathering India — Hyderabad 2014" },
  { src: "/gallery-coaches.jpg", alt: "Coaches Clinic Global Scrum Gathering", caption: "Participated as coach at Coaches Clinic, Global Scrum Gathering — June 27–29, 2016" },
  { src: "/gallery-lyssa.jpg", alt: "With Lyssa Adkins at Agile India 2015", caption: "With Lyssa Adkins at Agile India 2015 — Bangalore" },
  { src: "/gallery-dst.jpg", alt: "Discussed Effective Scrum at DST Hyderabad", caption: "Discussed Effective Scrum at DST — Hyderabad, September 19, 2017" },
]

export default function Gallery() {
  const [selected, setSelected] = useState<null | typeof photos[0]>(null)

  return (
    <div className="bg-white">
      <PageHeader badge="Gallery"
        title={<>Photo <span className="text-blue-400">Gallery</span></>}
        subtitle="Moments from Agile conferences, Scrum Gatherings, co-training sessions, and industry events across India and globally.">
        <div className="flex items-center gap-2 text-blue-200/60 text-sm">
          <Images size={15} />
          {photos.length} photos — click any to enlarge
        </div>
      </PageHeader>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <motion.div key={photo.src} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                onClick={() => setSelected(photo)}>
                <img src={photo.src} alt={photo.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105 block"
                  onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: "linear-gradient(transparent, rgba(15,23,42,0.85))" }}>
                  <p className="text-white text-xs leading-snug">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setSelected(null)}>
          <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all" onClick={() => setSelected(null)}>
            <X size={20} />
          </button>
          <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }}
            className="max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selected.src} alt={selected.alt} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            <p className="text-slate-300 text-sm mt-4 text-center px-4">{selected.caption}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
