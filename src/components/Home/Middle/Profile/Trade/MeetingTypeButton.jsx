import PersonalIcon from '../../../../../icons/PersonalIcon.jsx'
import VirtualIcon from '../../../../../icons/VirtualIcon.jsx'

const MeetingTypeButton = ({ type, setToggle, toggle }) => {
  return (
    <button
      className={`w-full h-32 rounded-xl flex flex-col  gap-4 p-4 justify-center ${
        toggle  
          ? "bg-Primary shadow-xl shadow-Primary/40 transition duration-300 ease-in-out"
          : "bg-slate-50 ring-1 ring-lightGray transition duration-300 ease-in-out dark:bg-darkGray/40 dark:ring-darkGray"
      }`}
      onClick={()=>setToggle((prev)=>!prev)}
    >
      <div className="items-center flex gap-3">

        <div className={`w-7 h-7 p-1 flex-shrink-0 ${toggle ? "bg-white " : "bg-darkBlue dark:bg-white2"} rounded-lg flex items-center justify-center`} >
          {type === 'personal' ? 
            <PersonalIcon isActive={toggle}/> 
            :
            <VirtualIcon isActive={toggle}/>
          }
        </div>
        <span className={`${toggle ? "text-white" : "text-darkBlue dark:text-white2" } text-lg font-main font-medium `}>
          {type === 'personal'
            ? 'Personal'
            : 'Virtual'
          }
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className={`${toggle ? "text-white" : "text-darkBlue dark:text-darkWhite" } text-sm font-main mt  text-left`}>
          {type === 'personal'
            ? 'Best suited for individuals who enjoy hands-on learning.'
            : 'Ideal for those individuals who are distant and introvert.'

          }
        </span>
      </div>
    </button>
  )
}

export default MeetingTypeButton