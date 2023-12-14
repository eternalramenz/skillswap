import ProfileFollowerSection from './ProfileFollowerSection.jsx'
import ProfileFollowingSection from './ProfileFollowingSection.jsx'
import CloseIcon from "../../../icons/CloseIcon.jsx";
import { useGlobalContext } from "../../../contexts/GlobalContext.jsx";
const ProfileSection = ({setOpenFollowersDrawer}) => {
  const {  isFollowerTabActive, setIsFollowerTabActive } = useGlobalContext()

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
        <div className={`ml-1.5 w-4 h-4  ring-[7px] ring-Primary rounded-md bg-transparent mt-12`}></div>
        <span className="font-main text-2xl font-semibold text-darkBlue dark:text-white2 mt-12">
          {isFollowerTabActive ?  "Followers" : "Followings"}
        </span>
      </div>


      <div className="mt-12 flex p-1 rounded-lg dark:bg-darkGray bg-lightGray w-60">
        <button 
          className={`${isFollowerTabActive ?'dark:bg-lightBlack bg-white':'bg-transparent'} p-1 rounded-md px-4 flex items-center justify-center  w-32`}
          onClick={()=>{isFollowerTabActive || setIsFollowerTabActive((prev)=>!prev)}}
        >
          <span className={`${isFollowerTabActive ?'dark:text-white2 text-darkBlue font-medium':'dark:text-darkWhite text-gray'} text-md font-main`}>
            Followers
          </span>
        </button>
        <button 
          className={`${isFollowerTabActive ?'bg-transparent':'dark:bg-lightBlack bg-white'} p-1 rounded-md px-4 flex items-center justify-center  w-32`}
          onClick={()=>{isFollowerTabActive && setIsFollowerTabActive((prev)=>!prev)}}
        >
          <span className={`${isFollowerTabActive ?'dark:text-darkWhite text-gray':'dark:text-white2 text-darkBlue font-medium'} text-md font-main`}>
            Followings
          </span>
        </button>
      </div>

      { isFollowerTabActive ? (
        <ProfileFollowerSection setOpenFollowersDrawer={setOpenFollowersDrawer}/>
      ):(
        <ProfileFollowingSection setOpenFollowersDrawer={setOpenFollowersDrawer} />
      )}
    </div>
  )
}

export default ProfileSection