import React from 'react'
import { useRef } from 'react'

const Home = () => {
  const aboutRef = useRef(null)
  return (
    <section>
    <div>Home</div>
    <div ref={aboutRef}>about</div>
    </section>
  )
}

export default Home