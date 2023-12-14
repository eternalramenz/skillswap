
const AddIcon = ({ color }) => {
  return (
    <div>
      <svg 

        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`dark:stroke-white2 cursor-pointer stroke-${color} mr-4 w-full h-full`}
      >
        <path d="M12 5V19M5 12H19"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default AddIcon