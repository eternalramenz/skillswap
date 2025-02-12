import React from 'react'

const BookMarkIcon = ({bookMarked}) => {
  return (
    <div className="w-full h-full">
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${bookMarked ? 'fill-amber-500 stroke-amber-500':'fill-none dark:stroke-white2 stroke-darkBlue'}`} 
      >
        <path 
          d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default BookMarkIcon