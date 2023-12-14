

const InformationIcon = ({ color }) => {
  return (
    <div>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor-pointer ${color} stroke-2  w-full h-full `}
      >
        <path 
        d="M12,16v-4 M12,8L12,8 M7.8,21h8.4c1.7,0,2.5,0,3.2-0.3c0.6-0.3,1-0.7,1.3-1.3c0.3-0.6,0.3-1.5,0.3-3.2V7.8 c0-1.7,0-2.5-0.3-3.2c-0.3-0.6-0.7-1-1.3-1.3C18.7,3,17.9,3,16.2,3H7.8C6.1,3,5.3,3,4.6,3.3c-0.6,0.3-1,0.7-1.3,1.3 C3,5.3,3,6.1,3,7.8v8.4c0,1.7,0,2.5,0.3,3.2c0.3,0.6,0.7,1,1.3,1.3C5.3,21,6.1,21,7.8,21z"
        strokeLinecap="round" 
        strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default InformationIcon