import { motion } from "framer-motion"
import { Link, useParams, Navigate } from "react-router-dom"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

type Section = { heading?: string; body: string }

type Post = {
  slug: string
  title: string
  category: string
  readTime: string
  date: string
  img: string
  excerpt: string
  sections: Section[]
}

const posts: Post[] = [
  {
    slug: "velocity-and-focus-factor-in-scrum",
    title: "Velocity and Focus Factor in Scrum",
    category: "Scrum",
    readTime: "5 min read",
    date: "December 2023",
    img: "/blog-velocity.png",
    excerpt: "Understanding Velocity and Focus Factor is essential for Scrum teams to plan sprints accurately and improve delivery predictability.",
    sections: [
      {
        heading: "What is Velocity?",
        body: "Velocity measures the amount of work a Scrum Team can complete in a Sprint. It's calculated by summing story points of items meeting the Definition of Done at the sprint's end. Only completed items count toward velocity — partially done or incomplete work gets moved back to the Product Backlog.",
      },
      {
        heading: "Key Velocity Guidelines",
        body: "Avoid comparing velocities across different teams or pressuring teams to artificially increase it. Teams of similar composition won't necessarily have identical velocities. Use velocity primarily for forecasting how much work to pull into sprints and for providing stakeholder projections based on recent sprint data.",
      },
      {
        heading: "Improving Velocity Naturally",
        body: "Teams can enhance velocity by establishing cross-functional training, minimizing context switching, breaking down items into smaller chunks, clarifying acceptance criteria, and continuously identifying waste sources like unclear requirements or dependencies. Focus on removing impediments — velocity improves as a natural outcome.",
      },
      {
        heading: "What is Focus Factor?",
        body: "Focus Factor uses the formula: Velocity ÷ Capacity. Capacity represents available focused time after removing meetings and non-work activities. Using average velocity from 4–5 recent sprints, teams can calculate how many story points they'll realistically complete given current team size and availability.",
      },
      {
        heading: "First Sprint Forecasting",
        body: "Without historical data, teams should use judgment guided by creating clear requirements, detailed task breakdowns, and capacity-based planning. A reasonable starting point is assuming a 70% Focus Factor and adjusting from there based on actuals.",
      },
    ],
  },
  {
    slug: "7-wastes-of-agile-software-development",
    title: "How to Manage the 7 Wastes of Agile Software Development",
    category: "Agile",
    readTime: "7 min read",
    date: "October 2023",
    img: "/blog-wastes.png",
    excerpt: "Lean thinking identifies seven types of waste in software development. Discover how to recognize and eliminate these wastes in your Agile teams to maximize value delivery.",
    sections: [
      {
        heading: "Understanding Waste in Agile",
        body: "Scrum is an agile project management framework designed to deliver value to customers through iterative development and frequent feedback. Core principles include transparency, inspection, and adaptation. Lean thinking — which underpins Agile — identifies categories of waste that erode team efficiency and product value.",
      },
      {
        heading: "1. Partially Done Work",
        body: "Work that is started but not completed creates inventory waste. It sits in the system, consuming resources, blocking flow, and delivering no value to the customer. Scrum's Definition of Done is a powerful tool to combat this — it enforces a shared standard for 'complete.'",
      },
      {
        heading: "2. Extra Features",
        body: "Building features nobody asked for or needs is pure waste. Product Owners must rigorously prioritize the backlog based on real customer value. The discipline of saying 'no' to low-value features is one of the most impactful things a Product Owner can practice.",
      },
      {
        heading: "3. Relearning",
        body: "When knowledge is lost between sprints, teams spend time rediscovering decisions already made. Good documentation, Definition of Done, and clear sprint goals reduce relearning. Retrospectives help teams institutionalize learnings rather than repeat mistakes.",
      },
      {
        heading: "4. Handoffs",
        body: "Every time work passes between people or teams, context is lost. Cross-functional Scrum teams are designed to minimize handoffs by having all the skills needed to deliver a feature within one team. Reduce dependencies and keep delivery ownership within the team.",
      },
      {
        heading: "5. Task Switching",
        body: "Context switching between tasks kills focus and quality. Sprint goals and WIP limits help teams stay focused on completing work rather than starting new items. A team working on one thing at a time delivers faster than a team juggling five.",
      },
      {
        heading: "6. Delays and Waiting",
        body: "Waiting for approvals, environments, or decisions from outside the team are major sources of waste. Scrum Masters should actively surface and remove these impediments. Autonomy and self-organization are the antidotes to waiting.",
      },
      {
        heading: "7. Defects",
        body: "Defects caught late are far more expensive to fix than those caught early. Test-driven development, continuous integration, and clear acceptance criteria reduce defect waste. Building quality in from the start is always cheaper than inspecting it in at the end.",
      },
    ],
  },
  {
    slug: "build-your-career-towards-agile-coach",
    title: "How to Build Your Career Towards Agile Coach",
    category: "Career",
    readTime: "8 min read",
    date: "November 2023",
    img: "/blog-career.png",
    excerpt: "The path to becoming an Enterprise Agile Coach requires the right certifications, experience, and mindset. Here's a step-by-step guide from a Certified Scrum Trainer.",
    sections: [
      {
        heading: "Scrum Master vs Agile Coach",
        body: "While Scrum Masters coach teams through facilitation, training, mentoring, and coaching — Agile Coaches extend their expertise beyond teams to include leadership and organizational transformation. An Agile Coach operates at the enterprise level across multiple frameworks, cultures, and leadership layers.",
      },
      {
        heading: "1. Strong Agile Fundamentals",
        body: "Deep understanding of the Agile Manifesto values, principles, and Scrum values is non-negotiable. You cannot coach others on something you haven't fully internalized. Revisit the manifesto regularly — not as theory, but as a lived philosophy.",
      },
      {
        heading: "2. Scrum Master Experience",
        body: "Working as a Scrum Master is mandatory for anyone aspiring to be an Agile Coach. It provides direct, practical insight into team dynamics, impediments, and what it actually takes to grow a high-performing team. There are no shortcuts here — put in the time.",
      },
      {
        heading: "3. Organizational Culture Knowledge",
        body: "Understanding different culture types and how to facilitate agile transformation without breaking what already works is a critical skill. Agile Coaches must read organizations like a doctor reads a patient — diagnosing before prescribing.",
      },
      {
        heading: "4. Leadership Awareness",
        body: "Recognizing various leadership styles and knowing which coaching models to apply in each context separates good coaches from great ones. Study servant leadership, situational leadership, and transformational leadership — and practice all three.",
      },
      {
        heading: "5. Broader Framework Knowledge",
        body: "Experience beyond Scrum — including Kanban, SAFe, LeSS, and product management expertise — makes you a more versatile coach. Organizations don't always fit neatly into one framework. Your value increases when you can adapt.",
      },
      {
        heading: "6. Technical Practices Awareness",
        body: "Familiarity with continuous integration, test-driven development, DevOps, and relevant tools allows you to credibly coach engineering teams and speak the language of developers. You don't need to code — but you need to understand the craft.",
      },
      {
        heading: "7. Professional Coaching Skills",
        body: "Active listening, powerful questioning, and change management competencies are the true tools of an Agile Coach. Pursue ICF-ACC, Scrum Alliance CTC/CEC, or ICP-ACC credentials — but remember, knowledge and experience are primary. Certifications are the byproduct.",
      },
    ],
  },
]

export const blogPosts = posts

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-slate-900 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-400 text-sm mb-6 hover:text-blue-300 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-600 text-white">{post.category}</span>
            <span className="flex items-center gap-1 text-slate-400 text-xs"><Clock size={11} />{post.readTime}</span>
            <span className="flex items-center gap-1 text-slate-400 text-xs"><Calendar size={11} />{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-slate-400 text-base leading-relaxed">{post.excerpt}</p>
        </div>
      </div>

      {/* Cover image */}
      <div className="max-w-3xl mx-auto px-4 -mt-1">
        <img src={post.img} alt={post.title} className="w-full rounded-2xl object-cover max-h-72 shadow-lg" />
      </div>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {post.sections.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="mb-8">
              {s.heading && (
                <h2 className="text-xl font-bold text-slate-900 mb-3">{s.heading}</h2>
              )}
              <p className="text-slate-600 leading-relaxed text-base">{s.body}</p>
            </motion.div>
          ))}

          {/* Author note */}
          <div className="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-4">
            <img src="/logo.png" alt="Vijay Bandaru" className="w-12 h-12 rounded-xl object-contain shrink-0" />
            <div>
              <p className="font-bold text-slate-900 text-sm">Vijay Bandaru</p>
              <p className="text-slate-500 text-xs mb-2">Certified Scrum Trainer · Organizational Transformation Coach</p>
              <p className="text-slate-600 text-sm leading-relaxed">28+ years of hands-on experience in Agile transformation, Scrum training, and building high-performing teams across India and globally.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/blog">
              <button className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all hover:scale-105">
                ← Back to All Articles
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
