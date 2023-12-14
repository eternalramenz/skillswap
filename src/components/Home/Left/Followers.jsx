import { useSelector, } from 'react-redux';
import { Link,  } from "react-router-dom";
import { useQueryClient } from '@tanstack/react-query';
import { declineRequest, followAccept, fetchPendingFollowersList } from '../../../redux/api/UserRequest.ts'
import { useQuery  } from '@tanstack/react-query'
import FollowIcon from '../../../icons/FollowIcon.jsx'
import { createNotification } from '../../../redux/api/NotificationRequest.ts';
import { useGlobalContext } from '../../../contexts/GlobalContext.jsx';
const Followers = ({setOpenFollowersDrawer}) => {
  const queryClient = useQueryClient()
  const { userInformation } = useSelector(state => state.authReducer?.userData);
  const { setToggleFollowersDrawer } = useGlobalContext()
  const fetchPendingFollowers = async () => { 
    const { data } = await fetchPendingFollowersList(userInformation._id)
    return data ;
  }

  const { data, status } = useQuery(['pendingFollowersList'], fetchPendingFollowers);


  if (status === 'loading') return null

  const handleDecline = async (id) =>{
    try {
      await declineRequest(id) 
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccept = async (id) =>{
    
    try {
      const newNotificationData= {
        senderId: userInformation._id,
        entityId: id,
        type:"followUser",
        text:"followed you back",
      }
      await followAccept(id, userInformation._id)
      if (id !== userInformation._id ) {
        await createNotification(id, newNotificationData)
      }  
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])

    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <>    
      {data.pendingFollowersList.length > 0 && (
          <div className="flex justify-between mb-2">
            <span className="font-main text-sm font-semibold text-darkWhite dark:darkGray ml-4">FOLLOWERS</span>
            <div className="flex justify-center items-center w-5 h-5 rounded-md bg-rose-500 mr-4">
              <span className="font-main text-xs text-white font-medium z-10">{data.pendingFollowersList.length}</span>
              <div className="bg-rose-300 animate-ping w-4 h-4 rounded-md absolute z-0"></div>
            </div>
          </div>
      )}
        {data.pendingFollowersList.slice(0, 2).map((follower, index) => (
          <div key={index} 
            className="flex flex-col ring-1 ring-lightGray bg-card rounded-2xl p-6 shadow-xl shadow-zinc-200 gap-4 w-[20rem] mb-6 dark:shadow-black/20 dark:ring-darkGray
            hover:translate-y-[-3px] hover:shadow-zinc-300 dark:bg-lightBlack/70 dark:backdrop-blur-3xl "
          >
            <div className="flex items-left">
              <div className="w-12 h-12 rounded-xl flex-shrink-0">
                <img src={follower.userData.profilePicture} alt="" className="w-16 h-12 object-cover rounded-xl " />
              </div>
              <div className="flex flex-col">
                <Link to={`/profile/${follower._id}`} className="flex">
                  <span className="pl-4 text-gray dark:text-darkWhite">
                    <span className="font-main font-medium text-md text-darkBlue dark:text-white2">
                      {follower.userData.firstName + ' ' + follower.userData.lastName}
                    </span> wants to follow you
                  </span>
                </Link>
              </div>
            </div>     
            <div className="flex flex-row justify-start items-center gap-4">
              <button 
                className="rounded-xl ring-1 ring-lightGray dark:ring-darkGray p-2 pl-6 pr-6 text-sm cursor-pointer w-1/3 flex items-center justify-center"
                onClick={()=>handleDecline(follower._id)}
              >
                <span className="font-main dark:text-darkWhite">Decline</span>
              </button>
              <button 
                className="shadow-2xl shadow-amber-500/50 rounded-xl bg-amber-500 p-3 h-10 text-white pl-6 pr-6 text-sm cursor-pointer w-full flex items-center justify-center hover:bg-amber-400 transition-all duration-300"
                onClick={()=>handleAccept(follower._id)}
              >
                <div className="w-4 h-4">
                  <FollowIcon />
                </div>
                <span className="font-main">Follow Back</span>
              </button>
            </div>
          </div>
        ))}
      {data.pendingFollowersList.length > 2 && (
        <button className="flex justify-center items-center cursor-pointer" onClick={()=>{setOpenFollowersDrawer((prev)=>!prev);setToggleFollowersDrawer(true)}}>
          <span className="font-main text-sm font-medium text-darkBlue dark:text-darkWhite">View All</span>
        </button>
      )} 
    </>
  );
};

export default Followers;
