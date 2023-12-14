const   VirtualIcon = ({ isActive }) => {
  return (
    <div>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full  cursor-pointer ${isActive ? 'fill-Primary stroke-Primary ' : ' fill-white stroke-white dark:fill-darkGray dark:stroke-darkGray' } stroke-2 dark:stroke-1 w-5 h-5`}
      >
        <path className="st0" d="M22,8.9c0-0.6,0-0.9-0.1-1c-0.1-0.1-0.3-0.2-0.4-0.2c-0.2,0-0.4,0.2-0.8,0.7L17,12l3.6,3.6
          c0.4,0.4,0.6,0.6,0.8,0.7c0.2,0,0.3-0.1,0.4-0.2c0.1-0.1,0.1-0.4,0.1-1V8.9z"/>
        <path className="st0" d="M2,9.8c0-1.7,0-2.5,0.3-3.2c0.3-0.6,0.7-1,1.3-1.3C4.3,5,5.1,5,6.8,5h5.4c1.7,0,2.5,0,3.2,0.3
          c0.6,0.3,1,0.7,1.3,1.3C17,7.3,17,8.1,17,9.8v4.4c0,1.7,0,2.5-0.3,3.2c-0.3,0.6-0.7,1-1.3,1.3C14.7,19,13.9,19,12.2,19H6.8
          c-1.7,0-2.5,0-3.2-0.3c-0.6-0.3-1-0.7-1.3-1.3C2,16.7,2,15.9,2,14.2V9.8z"/>
      </svg>
    </div>
  )
}

export default VirtualIcon