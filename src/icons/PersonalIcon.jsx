const PersonalIcon = ({ isActive }) => {
  return (
    <div>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full  cursor-pointer ${isActive ? 'fill-Primary stroke-Primary ' : ' fill-white stroke-white dark:fill-darkGray dark:stroke-darkGray' } stroke-2 dark:stroke-1 w-5 h-5`}
      >
        <path className="st0" d="M22,21v-2c0-1.9-1.3-3.4-3-3.9 M15.5,3.3C17,3.9,18,5.3,18,7s-1,3.1-2.5,3.7" fill="none" strokeLinecap="round"/>
        <path className="st1" d="M17,21c0-1.9,0-2.8-0.3-3.5c-0.4-1-1.2-1.8-2.2-2.2C13.8,15,12.9,15,11,15H8c-1.9,0-2.8,0-3.5,0.3
          c-1,0.4-1.8,1.2-2.2,2.2C2,18.2,2,19.1,2,21H17z"/>
        <circle className="st1" cx="9.5" cy="7" r="4"/>
      </svg>
    </div>
  )
}

export default PersonalIcon