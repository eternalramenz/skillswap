import { declineRequest, followAccept} from '../../../redux/api/UserRequest.ts'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import FollowIcon from '../../../icons/FollowIcon.jsx'

const PendingFollowerCard = ({props, setOpenFollowersDrawer}) => {
  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  const queryClient = useQueryClient()

  const handleDecline = async () =>{
    try {
      await declineRequest(props._id, userInformation._id) 
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])
      queryClient.invalidateQueries(['pendingFollowers'])   

    } catch (error) {
      console.log(error)
    }
  }

  const handleAccept = async () =>{
    try {
      await followAccept(props._id, userInformation._id)
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])   
      queryClient.invalidateQueries(['pendingFollowers'])   
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div 
      className="flex flex-col gap-4 p-4 w-full bg-white rounded-2xl ring-1 ring-lightGray dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray"

    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link to={`/profile/${props._id}`} onClick={()=>setOpenFollowersDrawer(false)}>
            <div className="w-12 h-12 rounded-xl flex-shrink-0">
              <img src={props.userData.profilePicture} alt="" className="w-12 h-12 flex-shrink-0 object-cover rounded-xl " />
            </div>
          </Link>
          <div className="flex flex-col">
            <span className="pl-4 text-gray text-sm dark:text-darkWhite">
              {props.userData.firstName + ' ' + props.userData.lastName}
            </span>
            <span className="pl-4 text-darkBlue text-md font-medium dark:font-normal dark:text-white2">
              {props.userData.expertise}
            </span>
          </div>
        </div>     

        <div className="flex flex-row justify-end gap-4 items-center">
          <button 
            className="w-32 rounded-xl ring-1 ring-lightGray dark:ring-darkGray p-2  text-sm cursor-pointer  flex items-center justify-center"
            onClick={handleDecline}
          >
            <span className="font-main dark:text-darkWhite">Decline</span>
          </button>
          <button 
            className="w-32 gap-1 shadow-2xl shadow-Primary/50 rounded-xl bg-Primary p-3 h-10  text-white  text-sm cursor-pointer flex items-center justify-center hover:bg-blue-500 transition-all duration-300"
            onClick={handleAccept}
          >
            {/* <img src={follow} alt="" className="w-4 h-4 mr-1"/> */}
            <div className="w-4 h-4">
              <FollowIcon />
            </div>
            <span className="font-main">Follow Back</span>
          </button>

        </div>

      </div>
    </div>
  )
}

export default PendingFollowerCard