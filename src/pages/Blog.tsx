import { motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import PageHeader from "@/components/PageHeader"
import { blogPosts } from "./BlogPost"

export default function Blog() {
  return (
    <div className="bg-white">
      <PageHeader badge="Blog"
        title={<>Agile <span className="text-blue-400">Insights</span></>}
        subtitle="Practical insights and deep dives into Scrum, Agile transformation, product ownership, AI, and high-performing teams — backed by 28+ years of real-world experience." />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {blogPosts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <Link to={`/blog/${post.slug}`}>
                <div className="group flex items-start gap-5 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all duration-300 bg-white">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{post.category}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400"><Clock size={11} />{post.readTime}</span>
                    </div>
                    <h2 className="text-slate-900 font-bold text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
                  <ArrowRight size={18} className="shrink-0 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
