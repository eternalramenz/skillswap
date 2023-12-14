import React from 'react'

const EditIcon = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-darkBlue dark:stroke-white2 p-1" 
      >
        <path 
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default EditIcon

