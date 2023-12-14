
const SkillsIcon = ({ color }) => {
  return (
    <div>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor-pointer ${color} stroke-2  w-full h-full `}
      >
        <path 
        d="M21,12H9 M21,6H9 M21,18H9 M5,12c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S5,11.4,5,12z M5,6c0,0.6-0.4,1-1,1 S3,6.6,3,6s0.4-1,1-1S5,5.4,5,6z M5,18c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S5,17.4,5,18z"
        strokeLinecap="round" 
        strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default SkillsIcon