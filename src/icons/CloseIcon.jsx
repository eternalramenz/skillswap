import React from 'react'

const CloseIcon = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-darkBlue dark:stroke-white2 p-1" 
      >
        <path 
          d="M17,7L7,17 M7,7l10,10"
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default CloseIcon
