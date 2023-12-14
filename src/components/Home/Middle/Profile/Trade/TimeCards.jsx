
const TimeCards = ({disabled, start, end, setState, state}) => {
  const handleClick = () =>{
    setState(start + " — " + end)
  }
  return (

      <button 
        className={`relative transition-all min-h-4 ease-in-out flex flex-col w-full py-2 h-[20%] rounded-xl items-center  ring-1  ${state ? ' shadow-2xl ring-Primary shadow-Primary bg-Primary dark:bg-Primary': disabled ? 'ring-gray bg-gray dark:bg-darkWhite dark:ring-darkWhite cursor-not-allowed' : 'ring-gray/40 bg-slate-50 dark:bg-darkGray/40  dark:ring-darkGray'}`}
        onClick={handleClick}
        disabled={disabled}
      >
        { disabled ? (
          <>
            <span className={`h-6 ${state ? 'text-white': disabled ? 'text-lightGray dark:text-white2' : 'text-darkBlue dark:text-white2'} font-main text-sm font-medium`}>This time is</span>
            <span className={`h-6 ${state ? 'text-white': disabled ? 'text-lightGray dark:text-white2' : 'text-darkBlue dark:text-white2'} font-main text-sm font-medium`}>not available</span>          
          </>
            ) : (
          <>
            <span className={`h-6 ${state ? 'text-white': disabled ? 'text-lightGray dark:text-white2' : 'text-darkBlue dark:text-white2'} font-main text-md font-medium`}>{start} — </span>
            <span className={`h-6 ${state ? 'text-white': disabled ? 'text-lightGray dark:text-white2' : 'text-darkBlue dark:text-white2'} font-main text-md font-medium`}>{end}</span>
          </>
        )
        }
      </button>
  )
}

export default TimeCards