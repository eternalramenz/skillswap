import React from 'react'
import HomeIcon from '../../../icons/HomeIcon.jsx'
import TradesIcon from '../../../icons/TradesIcon.jsx'
import MessageIcon from '../../../icons/MessageIcon.jsx'
import CompassIcon from '../../../icons/CompassIcon.jsx'
const Menu = () => {

  const highlight = "home"

  return (
    <div className="p-2 item gap-1 ring-1 ring-gray/20 bg-white rounded-2xl shadow-xl shadow-zinc-200 mb-6 dark:shadow-black/20 dark:ring-darkGray mt-2 dark:bg-lightBlack/70 dark:backdrop-blur-3xl">
      <div className="w-full flex items-center rounded-2xl px-4 py-2 gap-4  dark:bg-transparent">
        <div className={`w-9 h-9 p-1 rounded-xl ${highlight === 'home' ? 'bg-Primary' : 'bg-white dark:bg-transparent'}`}>
          <HomeIcon state={highlight === 'home'} />
        </div>
        <span className={`font-main text-md font-semibold ${highlight === 'home' ? 'text-Primary ' : 'text-darkBlue dark:text-darkWhite'}`}>Home</span>
      </div>

      <div className="w-full flex items-center rounded-2xl px-4 py-2 gap-4 bg-white  dark:bg-transparent">
        <div className={`w-9 h-9 p-1 rounded-xl ${highlight === 'trade' ? 'bg-Primary' : 'bg-white dark:bg-transparent'}`} >
          <TradesIcon state={highlight === 'trade'} />
        </div>
        <span className={`font-main text-md font-semibold ${highlight === 'trade' ? 'text-Primary ' : 'text-darkBlue dark:text-darkWhite'}`}>Trades</span>
      </div>

      <div className="w-full flex items-center rounded-2xl px-4 py-2 gap-4 bg-white dark:bg-transparent">
        <div className={`w-9 h-9 p-1 rounded-xl ${highlight === 'message' ? 'bg-Primary' : 'bg-white dark:bg-transparent'}`} >
          <MessageIcon state={highlight === 'message'} />
        </div>
        <span className={`font-main text-md font-semibold ${highlight === 'message' ? 'text-Primary ' : 'text-darkBlue dark:text-darkWhite'}`}>Messages</span>
      </div>
      
      <div className="w-full flex items-center rounded-2xl px-4 py-2 gap-4 bg-white  dark:bg-transparent">
        <div className={`w-9 h-9 p-1 rounded-xl ${highlight === 'discover' ? 'bg-Primary' : 'bg-white dark:bg-transparent'}`}>
          <CompassIcon state={highlight === 'discover'} />
        </div>
        <span className={`font-main text-md font-semibold ${highlight === 'discover' ? 'text-Primary ' : 'text-darkBlue dark:text-darkWhite'}`}>Discover</span>
      </div>
    </div>
  )
}

export default Menu