import { declineRequest, fetchFollowingStatus, followAccept, unFollow, followRequest} from '../../../redux/api/UserRequest.ts'
import { createNotification } from '../../../redux/api/NotificationRequest.ts'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import RequestedIcon from '../../../icons/FollowRequestIcon.jsx'
import FollowIcon from '../../../icons/FollowIcon.jsx'
import UnfollowIcon from '../../../icons/UnfollowIcon.jsx'
const ProfileFollowingCard = ({props}) => {
  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  const queryClient = useQueryClient()
  
  const handleFollow = async() =>{
    const newNotificationData= {
      senderId: userInformation._id,
      entityId: props._id,
      type:"followUser",
      text:`${userInformation.firstName + " " + userInformation.lastName + " wants to follow you"}`,
    }
    try {
      await followRequest(props._id, userInformation._id)
      if (props._id !== userInformation._id ) {
        await createNotification(props._id, newNotificationData)
      }  
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])
      queryClient.invalidateQueries(['followerStatus'])
      queryClient.invalidateQueries(['followingStatus'])
    } catch (error) {
      console.log(error)
    }
  } 

  const handleDecline = async () =>{
    try {
      await declineRequest(props._id, userInformation._id) 
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])
      queryClient.invalidateQueries(['followerStatus'])
      queryClient.invalidateQueries(['followingStatus'])
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccept = async() =>{
    try {
      const newNotificationData= {
        senderId: userInformation._id,
        entityId: props._id,
        type:"followUser",
        text:"followed you back",
      }
      await followAccept(props._id, userInformation._id)
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])
      queryClient.invalidateQueries(['followerStatus'])
      queryClient.invalidateQueries(['followingStatus'])
      if (props._id !== userInformation._id ) {
        await createNotification(props._id, newNotificationData)
      }  
    } catch (error) {
      console.log(error)
    }
  } 

  const handleUnFollow = async() =>{
    try {
      await unFollow(props._id, userInformation._id)
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])
      queryClient.invalidateQueries(['followerStatus'])
      queryClient.invalidateQueries(['followingStatus'])
    } catch (error) {
      console.log(error)
    }
  } 






  const fetchStatus = async () => { 
    const { data } = await fetchFollowingStatus(userInformation._id, props._id)
    return data || [];
  }

  const { data, status } = useQuery(['followingStatus', props._id], fetchStatus);
  if (status === 'loading' || !data) return null;

  return (
    <div 
      className="p-4 flex flex-col gap-4  w-full bg-white rounded-2xl ring-1 ring-lightGray dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray"

    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12  rounded-xl flex-shrink-0">
            <Link to={`/profile/${props._id}`} >
              <img src={props.userData.profilePicture} alt="" className="w-12 h-12 flex-shrink-0 object-cover rounded-xl " />
            </Link>        
          </div>
            <div className="flex flex-col">
              <span className="pl-4 text-gray text-sm dark:text-darkWhite">
                {props.userData.firstName + ' ' + props.userData.lastName}
              </span>
              <span className="pl-4 text-darkBlue text-md font-medium dark:font-normal dark:text-white2">
                {props.userData.expertise}
              </span>
            </div>
        </div>
        <div>

          { !data.followingStatus[0] && !data.followerStatus[0]  && props._id !== userInformation._id &&
            <button onClick={handleFollow} className="py-2 bg-Primary text-white font-main text-sm rounded-xl w-32 flex gap-1 items-center justify-center">
              <div className="w-4 h-4">
                <FollowIcon />
              </div>
              Follow
            </button>
          }

          { data.followerStatus[0]?.status === "pending"  &&
            <div className="flex gap-4 items-center justify-end">
              <button onClick={handleDecline} className="rounded-xl ring-1 ring-lightGray dark:ring-darkGray p-2 pl-6 pr-6 text-sm cursor-pointer w-1/3 flex items-center justify-center">
                <span className="font-main dark:text-darkWhite">Decline</span>
              </button>
              <button onClick={handleAccept} className="py-2 bg-amber-500 text-white font-main text-sm rounded-xl w-32 flex gap-1 items-center justify-center">
                <div className="w-4 h-4">
                  <RequestedIcon />
                </div>
                Follow Back
              </button>
            </div>
          }
      
          { data.followingStatus[0]?.status === "pending" &&
            <button onClick={handleFollow} className="py-2 bg-amber-500 text-white font-main text-sm rounded-xl w-32 flex gap-1 items-center justify-center">
              <div className="w-4 h-4">
                <RequestedIcon />
              </div>
              Requested
            </button>
          }

          { data.followingStatus[0]?.status === "accepted" &&
            <button onClick={handleUnFollow} className="py-2 bg-rose-500 text-white font-main text-sm rounded-xl w-32 flex gap-1 items-center justify-center">
              <div className="w-4 h-4">
                <UnfollowIcon />
              </div>
              Unfollow
            </button>
          }

        </div>
      </div>     
    </div>
  )
}

export default ProfileFollowingCard