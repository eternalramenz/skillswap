import React from 'react'
import Header from './Header'
const Navbar = () => {
  return (
    <nav className=" flex flex-col fixed items-left z-20 left-0 top-0 pt-4 w-full bg-white/70 backdrop-blur-md dark:bg-lightBlack/70 dark:backdrop-blur-xl dark:shadow-xl">
      <Header/>
    </nav>
  )
}

export default Navbar