import React from 'react'

const SpinnerIcon = () => {
  return (
    <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="transparent" stroke="#FFF" strokeWidth="3" ></circle>
      <circle cx="12" cy="12" r="10" fill="transparent" stroke="rgba(156, 156, 156, 0.5)" strokeWidth="4" strokeDasharray="30 30" strokeDashoffset="40" ></circle>
    </svg>
  )
}

export default SpinnerIcon