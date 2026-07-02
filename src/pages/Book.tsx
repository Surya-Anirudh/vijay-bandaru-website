import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"

/* ── Static Book Photo ── */
function BookHeroImage() {
  return (
    <div className="relative flex justify-center items-center px-6 py-10 sm:px-10">
      <img
        src="/book-front.png"
        alt="Stay Relevant & Valued book cover"
        style={{
          width: "min(100%, 340px)",
          borderRadius: 14,
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 10px 30px rgba(79,70,229,0.15)",
          display: "block",
        }}
      />
    </div>
  )
}

export default function Book() {
  return (
    <div style={{ background: "#04091a", minHeight: "100vh" }}>

      {/* dot-grid background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(99,102,241,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      {/* glow blobs */}
      <div className="fixed pointer-events-none" style={{ top: "10%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="fixed pointer-events-none" style={{ bottom: "10%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(70px)" }} />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-4">
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(165,180,252,0.55)", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 16 }}>My Book</div>
            <h1 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
              Stay{" "}
              <span style={{ background: "linear-gradient(90deg, #818cf8, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Relevant &amp; Valued
              </span>
            </h1>
            <p style={{ color: "rgba(148,163,184,0.8)", fontSize: "clamp(1rem, 2vw, 1.2rem)", marginTop: 16, fontStyle: "italic" }}>
              A Guide to Growth. A Journey with Purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BOOK + CONTENT ── */}
      <section className="relative px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">

            {/* Book Photo */}
            <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex justify-center lg:justify-end">
              <BookHeroImage />
            </motion.div>

            {/* Right side content */}
            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex flex-col gap-6">

              {/* Tagline */}
              <div>
                <p style={{ color: "rgba(165,180,252,0.7)", fontSize: "0.9rem", fontStyle: "italic", marginBottom: 12 }}>
                  "Find your path beyond comfort"
                </p>
                <p style={{ color: "rgba(203,213,225,0.75)", fontSize: "0.95rem", lineHeight: 1.8 }}>
                  In a rapidly changing world, staying relevant and valuable is no longer optional. Through powerful life lessons, Indian epics, real-world stories, sports references, and practical insights, <strong style={{ color: "#e2e8f0" }}>Stay Relevant &amp; Valued</strong> inspires readers to continuously learn, adapt, evolve, and grow.
                </p>
              </div>

              {/* Compass pillars */}
              <div className="grid grid-cols-2 gap-3">
                {["Learn", "Adapt", "Evolve", "Contribute"].map((word) => (
                  <div key={word} style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
                    <div style={{ fontWeight: 800, color: "rgba(165,180,252,0.9)", fontSize: "0.95rem", letterSpacing: "0.06em" }}>{word}</div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex gap-6">
                {[{ val: "94", label: "Principles" }, { val: "₹699", label: "Price" }, { val: "28+", label: "Years Wisdom" }].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div style={{ fontWeight: 900, color: "#fff", fontSize: "1.5rem" }}>{val}</div>
                    <div style={{ color: "rgba(148,163,184,0.6)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Discount badge */}
              <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(59,130,246,0.08) 100%)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 14, padding: "14px 20px" }}>
                <p style={{ color: "rgba(203,213,225,0.85)", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>
                  As a website visitor, you get a <strong style={{ color: "#a5b4fc" }}>special discount price.</strong> Click Buy Now and fill the form to order your copy.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                {/* BUY NOW - Smaller */}
                <a href="https://forms.gle/RgapcG6jStQbbkxaA" target="_blank" rel="noopener noreferrer">
                  <button
                    className="group w-full py-3 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 transition-all"
                    style={{ background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)", color: "#fff", border: "1px solid rgba(165,180,252,0.2)", boxShadow: "0 8px 32px rgba(79,70,229,0.35)", fontSize: "0.95rem" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 48px rgba(79,70,229,0.55)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(79,70,229,0.35)"; (e.currentTarget as HTMLButtonElement).style.transform = "" }}>
                    <BookOpen size={16} />
                    Buy Now
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>

                {/* PREVIEW CHAPTER */}
                <a href="#free-chapter-preview">
                  <button
                    className="group w-full py-3 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 transition-all"
                    style={{ background: "rgba(99,102,241,0.1)", color: "rgba(165,180,252,0.9)", border: "1.5px solid rgba(99,102,241,0.3)", fontSize: "0.95rem" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.15)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(99,102,241,0.5)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.1)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(99,102,241,0.3)" }}>
                    Preview Free Chapter
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FREE CHAPTER PREVIEW ── */}
      <section id="free-chapter-preview" className="relative px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {/* Why sharing — above everything */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ color: "rgba(165,180,252,0.95)", fontSize: "1.25rem", fontWeight: 800, marginBottom: 12 }}>Why am I sharing this chapter for free?</p>
              <p style={{ color: "rgba(203,213,225,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 12 }}>
                Because I believe the value of a book should be experienced, not merely described.
              </p>
              <p style={{ color: "rgba(203,213,225,0.75)", fontSize: "1rem", lineHeight: 1.8 }}>
                The chapter you're about to read is one of the 94 principles from <em>Stay Relevant &amp; Valued</em>. If it makes you think differently, reflect deeply, or take action, imagine what the remaining chapters can do for you.
              </p>
            </div>

            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(165,180,252,0.55)", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 12 }}>Free Chapter Preview</div>
              <h2 style={{ fontWeight: 900, color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>Don't Develop Learned Helplessness</h2>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>

              {/* Chapter intro with bullets */}
              <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ color: "rgba(203,213,225,0.8)", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: 12 }}>
                  Failure is not always dangerous. <strong style={{ color: "#e2e8f0" }}>Repeated failure without awareness is.</strong> Because after some time… people stop trying. Not because they are incapable — but because they <em>believe</em> they are incapable. Learned helplessness happens when:
                </p>
                <ul style={{ margin: "0 0 12px 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {["A person fails repeatedly", "Faces repeated rejection", "Experiences repeated pain"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "rgba(203,213,225,0.7)", fontSize: "0.9rem" }}>
                      <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: "50%", background: "rgba(99,102,241,0.6)", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p style={{ color: "rgba(203,213,225,0.8)", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: 8 }}>And slowly— The mind concludes:</p>
                <ul style={{ margin: "0 0 16px 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {['"I can\'t do this"', '"Nothing will change"', '"There is no use trying"'].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "rgba(203,213,225,0.7)", fontSize: "0.9rem" }}>
                      <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: "50%", background: "rgba(99,102,241,0.6)", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p style={{ color: "rgba(203,213,225,0.8)", fontSize: "0.95rem", lineHeight: 1.85 }}>
                  Even when opportunities appear later— They no longer try.
                </p>
              </div>

              {/* Hidden truth */}
              <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(99,102,241,0.06)" }}>
                <div style={{ fontWeight: 700, color: "rgba(165,180,252,0.8)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>The Hidden Truth</div>
                <p style={{ color: "rgba(203,213,225,0.75)", fontSize: "1rem", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
                  "Sometimes the biggest prison is not around you. It is inside your mind."
                </p>
              </div>

              {/* Fish story */}
              <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontWeight: 700, color: "rgba(165,180,252,0.8)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Story — The Fish That Stopped Trying</div>

                {/* Illustration 1 */}
                <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 16, background: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src="/fish-glass-wall.png" alt="Big fish separated from small fishes by a glass wall" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
                </div>

                <p style={{ color: "rgba(203,213,225,0.7)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 16 }}>
                  A scientist placed a big fish and small fishes in an aquarium separated by a transparent glass wall. The big fish tried to attack — and hit the glass again and again. After many failed attempts, it stopped trying.
                </p>

                {/* Illustration 2 */}
                <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 16, background: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src="/fish-no-wall.png" alt="Big fish with small fishes freely swimming — no glass wall" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
                </div>

                <p style={{ color: "rgba(203,213,225,0.7)", fontSize: "0.9rem", lineHeight: 1.8, margin: 0 }}>
                  When the scientist quietly removed the glass wall, the small fishes swam freely around the big fish. But the big fish still didn't attack. <strong style={{ color: "#e2e8f0" }}>The glass wall was removed from the aquarium. But it was never removed from the big fish's mind.</strong>
                </p>
              </div>

              {/* 6-step box table */}
              <div style={{ padding: "24px 32px" }}>
                <div style={{ fontWeight: 700, color: "rgba(165,180,252,0.8)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>How to Break Learned Helplessness</div>
                <p style={{ color: "rgba(148,163,184,0.65)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: 18 }}>
                  Learned helplessness is learned slowly. And it can also be unlearned slowly. It needs a continuous and conscious practice.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      n: "1", title: "Recognize the Invisible Glass Wall",
                      points: ['Ask yourself: "Am I truly incapable?"', 'OR "Did I simply stop trying?"', "Many limitations are not real.", "They are remembered failures.", "Awareness breaks mental prisons."],
                    },
                    {
                      n: "2", title: "Separate Past Failure from Present Opportunity",
                      points: ["Just because something failed earlier…", "Doesn't mean it will fail again.", "Different time. Different experience.", "Different version of you.", "Past results are experiences—not permanent truths."],
                    },
                    {
                      n: "3", title: "Start with Small Wins",
                      points: ["Don't chase giant victories immediately.", "Start small: one attempt, one interview, one habit, one improvement.", "Each small success rebuilds confidence.", "Confidence is rebuilt through action, not overthinking."],
                    },
                    {
                      n: "4", title: "Change Your Inner Conversation",
                      points: ['Many people tell themselves: "I always fail" / "This is not for me" / "I can\'t do it"', 'Replace with: "Let me try again" / "What can I improve?" / "I am learning"', "Your mind listens to your words."],
                    },
                    {
                      n: "5", title: "Surround Yourself with Empowering People",
                      points: ["Some people increase your fears. Others increase your confidence.", "Choose people who encourage growth, push you forward, remind you of your strengths.", "Sometimes belief returns through the right people."],
                    },
                    {
                      n: "6", title: "Focus on Progress, Not Perfection",
                      points: ["Helpless people avoid action because they fear failure again.", "But growth doesn't require perfection. It requires movement.", "Progress destroys helplessness."],
                    },
                  ].map(({ n, title, points }) => (
                    <div key={n} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "16px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#a5b4fc", fontSize: "0.7rem", flexShrink: 0 }}>{n}</div>
                        <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: "0.82rem" }}>{title}</div>
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                        {points.map((pt, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, color: "rgba(148,163,184,0.75)", fontSize: "0.76rem", lineHeight: 1.55 }}>
                            <span style={{ marginTop: 5, width: 4, height: 4, borderRadius: "50%", background: "rgba(99,102,241,0.5)", flexShrink: 0 }} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Core lesson */}
                <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12 }}>
                  <div style={{ fontWeight: 700, color: "rgba(165,180,252,0.8)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Core Lesson</div>
                  <p style={{ color: "rgba(203,213,225,0.8)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                    Past failure should become experience — not identity. <strong style={{ color: "#fff" }}>The wall may already be gone. Try again.</strong>
                  </p>
                </div>

                {/* Pause and Reflect */}
                <div style={{ marginTop: 16, padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
                  <div style={{ fontWeight: 700, color: "rgba(165,180,252,0.8)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>Pause and Reflect</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {["What is one belief that may be limiting your growth today?", "What would you attempt if you knew you could not fail?"].map((q, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "rgba(203,213,225,0.7)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                        <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: "50%", background: "rgba(99,102,241,0.5)", flexShrink: 0 }} />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Closing paragraph */}
            <div style={{ marginTop: 28, padding: "20px 24px", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16 }}>
              <p style={{ color: "rgba(203,213,225,0.8)", fontSize: "0.9rem", lineHeight: 1.85, margin: 0 }}>
                Learned helplessness is only one invisible barrier that prevents people from reaching their potential. In <em>Stay Relevant &amp; Valued</em>, you'll discover 93 additional principles that help you build resilience, adaptability, confidence, relevance, and long-term success. If you have decided to make yourself relevant and valued in whatever you are doing now, then the 94 principles will certainly help you to achieve that. By the way, I am offering a <strong style={{ color: "#a5b4fc" }}>discount price for my website visitors.</strong>
              </p>
            </div>

            {/* Endorsements */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {[
                { quote: "This book is a warm effort to help people continuously grow, adapt, and stay meaningful in a rapidly changing world.", name: "Ashish Vidyarthi", role: "Actor, Influencer", photo: "/ashish.jpeg" },
                { quote: "What makes this book special is its ability to present profound ideas with simplicity, warmth, and relevance.", name: "Yandamoori Veerendranath", role: "Writer, Director, Motivational Speaker", photo: "/yandamoori.jpeg" },
              ].map(({ quote, name, role, photo }) => (
                <div key={name} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 24px" }}>
                  <p style={{ color: "rgba(203,213,225,0.7)", fontSize: "0.85rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>"{quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={photo} alt={name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: "2px solid rgba(99,102,241,0.3)" }} />
                    <div>
                      <div style={{ fontWeight: 700, color: "#e2e8f0", fontSize: "0.85rem" }}>— {name}</div>
                      <div style={{ color: "rgba(148,163,184,0.55)", fontSize: "0.75rem" }}>{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="mt-10 text-center">
              <a href="https://forms.gle/RgapcG6jStQbbkxaA" target="_blank" rel="noopener noreferrer">
                <button
                  className="group inline-flex items-center gap-3 px-12 py-4 rounded-2xl font-black tracking-wide transition-all"
                  style={{ background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)", color: "#fff", boxShadow: "0 8px 32px rgba(79,70,229,0.35)", fontSize: "1.05rem" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 48px rgba(79,70,229,0.55)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(79,70,229,0.35)"; (e.currentTarget as HTMLButtonElement).style.transform = "" }}>
                  <BookOpen size={18} />
                  Buy Now — Stay Relevant &amp; Valued
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8rem", marginTop: 12 }}>Special discount price for website visitors</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
