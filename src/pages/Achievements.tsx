import { motion } from "framer-motion"
import { Award, Mic } from "lucide-react"
import PageHeader from "@/components/PageHeader"

const awards = [
  {
    title: "Star Faculty Award",
    org: "PMIPCC",
    year: "2013",
    desc: "Awarded Star Faculty based on highest participant ratings during 2013 PMP workshops.",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/Star-Faculty-Award-from-PMIPCC-based-on-the-highest-rating-received-during-2013-for-PMP-workshops.jpg",
  },
  {
    title: "PMIPCC Award",
    org: "PMI Pune Chhattisgarh Chapter",
    year: "2011–12",
    desc: "Recognized for outstanding contributions to PMP workshops and the Hyderabad training community.",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/2011-%E2%80%93-12-PMIPCC-Award-for-contributing-to-their-PMP-workshops.jpg",
  },
  {
    title: "PMIPCC Award",
    org: "PMI Pune Chhattisgarh Chapter",
    year: "2010–11",
    desc: "Honored for significant contributions to PMP workshops and managing Hyderabad's first PMIPCC Cluster.",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/2010-%E2%80%93-11-PMIPCC-Award-for-contributing-to-their-PMP-workshops.jpg",
  },
  {
    title: "PMIPCC Cluster Management Award",
    org: "PMI Pune Chhattisgarh Chapter",
    year: "2010",
    desc: "Received for managing Hyderabad's first PMIPCC Cluster — a landmark achievement in the region.",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/Received-from-PMIPCC-for-managing-the-Hyderabads-first-PMIPCC-Cluster.jpg",
  },
  {
    title: "PMIPCC 10 Year Celebration Award",
    org: "PMI Pune Chhattisgarh Chapter",
    year: "Milestone",
    desc: "Selected as an award recipient during PMIPCC's milestone 10th anniversary celebrations.",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/I-was-part-of-PMIPCC-10-Years-celebrations-and-was-given-this-Award.jpg",
  },
  {
    title: "Agile Leadership Recognition",
    org: "CDK Global Hyderabad",
    year: "Sep 2016",
    desc: "Received memento for delivering an exceptional Agile session to CDK Global's technology teams.",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/I-received-this-memento-from-CDK-Global-Hyderabad-for-an-Agile-session-I-delivered-in-September-2016.jpg",
  },
  {
    title: "PMI Technical Paper Reviewer Certificate",
    org: "PMI National Conference",
    year: "2014",
    desc: "Awarded certificate for serving as a reviewer of Technical Papers at the PMI National Conference.",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/PMI-Certificate-Received-for-being-a-reviewer-of-Technical-Papers-@-PMI-National-Conference-2014.png",
  },
  {
    title: "Hysea Website Design Award",
    org: "Hysea",
    year: "",
    desc: "Received from Hysea for designing and developing their website.",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/Received-from-Hysea-for-designing-and-developing-their-website.jpg",
  },
]

const speaking = [
  {
    title: "Engineering Culture Adaption in Agile Teams",
    event: "Agile Leadership Conference",
    location: "Hyderabad",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/Delivered-a-speech-on-Engineering-Culture-Adaption-in-Agile-Teams.png",
  },
  {
    title: "Lean and Kanban Implementation (Case Study)",
    event: "Lean India Summit 2014",
    location: "Bangalore, Nov 22, 2014",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/Presented-a-case-study-on-Lean-and-Kanban-Implementation-at-Lean-India-summit-2014-at-Bangalore-on-22nd-Nov-2014.jpg",
  },
  {
    title: "Large-Scale Agile Transformation (Case Study)",
    event: "Regional Scrum Gathering India 2014",
    location: "Hyderabad",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/Presented-a-case-study-on-Large-Scale-Agile-Transformation-at-Regional-Scrum-Gathering-India-2014-in-Hyderabad.jpg",
  },
  {
    title: "Panel Speaker — Agile Thought Leadership",
    event: "HYDSPIN Annual Conference",
    location: "Hyderabad",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/I-participated-as-Panel-speaker-in-HYDSPIN-annual-conference-at-Hyderabad.jpg",
  },
  {
    title: "Discuss Agile Day Conference Speaker",
    event: "Discuss Agile Day",
    location: "Hyderabad, Nov 21, 2015",
    img: "https://vijaybandaru.com/wp-content/uploads/2023/12/Discuss-Agile-Day-conference-at-Hyderabad-on-21st-Nov-2015.png",
  },
]


export default function Achievements() {
  return (
    <div className="bg-white">
      <PageHeader badge="Recognition"
        title={<>Awards & <span className="text-blue-400">Achievements</span></>}
        subtitle="I've been recognized by leading industry bodies and invited to speak at premier Agile and Project Management conferences across India and globally." />

      {/* Awards Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Award size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Awards & Recognition</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {awards.map((a, i) => (
              <motion.div key={a.title + a.year} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <div className="h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                  <div className="relative overflow-hidden bg-slate-100 aspect-[4/3]">
                    <img src={a.img} alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
                    {a.year && (
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                        {a.year}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-slate-900 font-semibold text-sm mb-1 group-hover:text-blue-600 transition-colors leading-snug">{a.title}</h3>
                    <div className="text-blue-600 text-xs font-semibold mb-2">{a.org}</div>
                    <p className="text-slate-500 text-xs leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Engagements */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Mic size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Speaking Engagements</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {speaking.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.09 }}>
                <div className="h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                  <div className="relative overflow-hidden bg-slate-100 aspect-video">
                    <img src={s.img} alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }} />
                  </div>
                  <div className="p-5">
                    <h3 className="text-slate-900 font-semibold text-sm mb-2 group-hover:text-blue-600 transition-colors leading-snug">{s.title}</h3>
                    <div className="text-blue-600 text-xs font-semibold">{s.event}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{s.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-3">Invite Me to Speak</h2>
          <p className="text-blue-100 mb-8 text-lg">I am available for keynotes, workshops, panel discussions, and corporate training events across India and globally.</p>
          <a href="/contact">
            <button className="px-8 py-3.5 rounded-xl bg-white text-blue-700 font-semibold hover:shadow-xl hover:scale-105 transition-all text-sm">
              Get in Touch
            </button>
          </a>
        </div>
      </section>
    </div>
  )
}
