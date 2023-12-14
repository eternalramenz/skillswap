import React from 'react'
import Navbar from '../components/Auth/Navbar/Navbar'
import Landing from '../components/Auth/Landing/Landing'
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-16"></div>
      <div className="relative flex justify-center">
        <div className="w-full">
          <Landing />
        </div>  
      </div>
    </>
  )
}

export default LandingPage