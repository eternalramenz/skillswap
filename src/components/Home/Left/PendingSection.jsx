import PendingFollowersSection from './PendingFollowersSection.jsx'
import CloseIcon from "../../../icons/CloseIcon.jsx";

const PendingSection = ({setOpenFollowersDrawer}) => {

  return (
    <div className="flex flex-col pl-6 pr-4 py-10">
      <div className="flex items-center justify-start">          
        <button 
          className=" w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 "
          onClick={() => {setOpenFollowersDrawer((prev) => !prev)}}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex gap-4  items-center">
        <div className={`ml-1.5 w-4 h-4  ring-[7px] ring-amber-500 rounded-md bg-transparent mt-12`}></div>
        <span className="font-main text-2xl font-semibold text-darkBlue dark:text-white2 mt-12">
          Pending Followers
        </span>
      </div>




      <PendingFollowersSection setOpenFollowersDrawer={setOpenFollowersDrawer}/>
      
    </div>
  )
}

export default PendingSection