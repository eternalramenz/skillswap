
const UnfollowIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="w-4 h-4 mr-1"
      >
        <path
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12,21v-5.5H7.5c-1.4,0-2.1,0-2.7,0.2c-1.3,0.4-2.3,1.4-2.7,2.7C2,18.9,2,19.6,2,21H12z"
        />
        <line
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          x1="16" y1="18" x2="22" y2="18" className="st0" />
        <circle 
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="st0" cx="10" cy="7.5" r="4.5" />
      </svg>
    </div>
  )
}

export default UnfollowIcon