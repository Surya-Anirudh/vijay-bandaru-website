import { motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import PageHeader from "@/components/PageHeader"
import { blogPosts } from "./BlogPost"

const categoryGradient: Record<string, string> = {
  Scrum:  "from-blue-600 to-blue-800",
  Agile:  "from-blue-500 to-indigo-700",
  Career: "from-indigo-600 to-blue-900",
}

export default function Blog() {
  return (
    <div className="bg-white">
      <PageHeader badge="Blog"
        title={<>Agile <span className="text-blue-400">Insights</span></>}
        subtitle="Practical insights and deep dives into Scrum, Agile transformation, product ownership, AI, and high-performing teams — backed by 28+ years of real-world experience." />

      {/* Posts */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {blogPosts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <Link to={`/blog/${post.slug}`}>
                <div className="flex gap-6 items-start p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group bg-white">
                  {/* Styled thumbnail */}
                  <div className={`shrink-0 w-32 h-20 rounded-xl bg-gradient-to-br ${categoryGradient[post.category] ?? "from-slate-600 to-slate-800"} flex items-center justify-center p-3 overflow-hidden relative`}>
                    <span className="text-white font-bold text-[10px] text-center leading-tight relative z-10 drop-shadow">{post.title}</span>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-white/10" />
                    <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-white/10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-blue-600">{post.category}</span>
                      <span className="text-slate-300">·</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400"><Clock size={11} />{post.readTime}</span>
                    </div>
                    <h2 className="text-slate-900 font-bold text-base leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">{post.title}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all mt-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
