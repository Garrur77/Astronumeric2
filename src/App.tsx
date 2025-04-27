import { Routes, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import PredictPage from "./pages/PredictPage"
import ResultPage from "./pages/ResultPage"
import "./index.css"
import astroVideo from "./assets/Astro.mp4"

function App() {
  return (
    <div className="cosmic-bg min-h-screen">
      <video autoPlay muted loop id="background-video">
        <source src={astroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced gradient overlay with better opacity */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#141e30]/80 via-[#243b55]/80 to-[#4b0082]/80 z-0"></div>

      {/* Animated mandala background with improved visibility */}
      <div className="mandala-bg"></div>

      {/* Animated stars overlay */}
      <div className="stars-overlay"></div>

      <Header />
      <div className="container relative mx-auto px-4 pt-24 pb-16 z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<PredictPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
