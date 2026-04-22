import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Training from "@/pages/Training"
import Achievements from "@/pages/Achievements"
import Gallery from "@/pages/Gallery"
import Blog from "@/pages/Blog"
import Podcast from "@/pages/Podcast"
import Contact from "@/pages/Contact"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="training" element={<Training />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blog" element={<Blog />} />
          <Route path="podcast" element={<Podcast />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
