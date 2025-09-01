import { useState } from 'react'
import './App.css'
import HeroSection from './component/HeroSection'
import Navbar from './component/Navbar'
import About from './component/About'
import Projects from './component/Projects'
import { TimelineDemo } from './component/TimelineDemo';
import { AnimatedTestimonialsDemo } from './component/AnimatedTestimonialsDemo'




function App() {
 
  return (
    <>
   <div>
   
      <Navbar/>
      <main className="w-full mx-auto relative bg-black ">
      <HeroSection/>
      <About/>
      <TimelineDemo/>
      <AnimatedTestimonialsDemo/>
  
      </main>
    </div>
   
    </>
  )
}

export default App
