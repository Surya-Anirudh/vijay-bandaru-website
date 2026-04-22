import { motion } from "framer-motion"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import PageHeader from "@/components/PageHeader"

const posts = [
  {
    title: "Velocity and Focus Factor in Scrum",
    img: "/blog-velocity.png",
    href: "https://vijaybandaru.com/velocity-and-focus-factor-in-scrum/",
    category: "Scrum",
    readTime: "5 min read",
    excerpt: "Understanding Velocity and Focus Factor is essential for Scrum teams to plan sprints accurately and improve delivery predictability. Learn how these metrics work together.",
  },
  {
    title: "How to Manage the '7 Wastes' of Agile Software Development",
    img: "/blog-wastes.png",
    href: "https://vijaybandaru.com/how-to-manage-the-7-wastes-of-agile-software-development/",
    category: "Agile",
    readTime: "7 min read",
    excerpt: "Lean thinking identifies seven types of waste in software development. Discover how to recognize and eliminate these wastes in your Agile teams to maximize value delivery.",
  },
  {
    title: "How to Build Your Career Towards Agile Coach",
    img: "/blog-career.png",
    href: "https://vijaybandaru.com/how-to-build-your-career-towards-agile-coach/",
    category: "Career",
    readTime: "8 min read",
    excerpt: "The path to becoming an Enterprise Agile Coach requires the right certifications, experience, and mindset. Here's a step-by-step guide from a Certified Scrum Trainer.",
  },
]

const topics = ["Scrum", "Agile", "Kanban", "Lean", "Product Ownership", "Coaching", "Leadership", "AI + Agile", "Career Growth"]

const categoryColor: Record<string, string> = {
  Scrum: "bg-blue-50 text-blue-700",
  Agile: "bg-indigo-50 text-indigo-700",
  Career: "bg-emerald-50 text-emerald-700",
}

export default function Blog() {
  return (
    <div className="bg-white">
      <PageHeader badge="Blog"
        title={<>Agile <span className="text-blue-400">Insights</span></>}
        subtitle="My thoughts, guides, and deep dives on Scrum, Agile transformation, product ownership, and building high-performing teams — drawn from 25+ years in the field." />

      {/* Topic Tags */}
      <div className="px-4 py-6 border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {topics.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105 bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Posts */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div key={post.title} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <a href={post.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <div className="h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 group">
                    <div className="relative overflow-hidden aspect-[16/9] bg-slate-100">
                      <img src={post.img} alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600/10" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${categoryColor[post.category] ?? "bg-slate-100 text-slate-600"}`}>
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={11} /> {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-slate-900 font-bold text-lg mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="mt-16 text-center p-10 rounded-3xl border border-blue-100 bg-blue-50">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={22} className="text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">More Articles on the Blog</h3>
            <p className="text-slate-500 mb-6">Visit the full blog for more in-depth articles on Scrum, Agile coaching, product ownership, and career growth.</p>
            <a href="https://vijaybandaru.com/blog" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all hover:shadow-xl hover:shadow-blue-600/25 hover:scale-105">
                View All Posts <ArrowRight className="inline w-4 h-4 ml-1" />
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
