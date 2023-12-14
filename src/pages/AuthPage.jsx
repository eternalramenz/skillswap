import React from 'react'
import Navbar from '../components/Auth/Navbar/Navbar'
import Auth from "../components/Auth/Auth/Auth"
const AuthPage = () => {
  return (
    <>
      <Navbar />
      <div className="relative flex justify-center">
        <div className="w-full">
          <Auth />
        </div>  
      </div>
    </>
  )
}

export default AuthPage