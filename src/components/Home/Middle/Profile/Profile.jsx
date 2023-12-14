import { useState, useRef} from "react";
import { useParams } from "react-router-dom";
import { followRequest, followAccept, unFollow} from '../../../../redux/api/UserRequest.ts'
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchInfo } from '../../../../redux/api/ProfileRequest.ts'
import { fetchExistingTrade } from '../../../../redux/api/TradeRequest.ts'
import { useQueryClient } from "@tanstack/react-query";
import { uploadAvatarImage, uploadCoverImage } from '../../../../redux/api/UploadRequest.ts'
import { uploadProfilePicture, uploadCoverPicture, removeCoverPicture } from '../../../../redux/api/ProfileRequest.ts'
import { createNotification } from '../../../../redux/api/NotificationRequest.ts'
import { updateProfilePicture } from '../../../../redux/actions/ProfileAction.ts'
import { useGlobalContext } from "../../../../contexts/GlobalContext.jsx";
import ProfileSkeleton from "./ProfileSkeleton.jsx"
import FollowIcon from "../../../../icons/FollowIcon.jsx"
import UnfollowIcon from "../../../../icons/UnfollowIcon.jsx"
import FollowRequestIcon from "../../../../icons/FollowRequestIcon.jsx"
import SkillsIcon from '../../../../icons/SkillsIcon.jsx'
import PostsIcon from '../../../../icons/PostsIcon.jsx'
import InformationIcon from '../../../../icons/InformationIcon.jsx'
import StarIcon from '../../../../icons/StarIcon.jsx'
import CameraIcon from '../../../../icons/CameraIcon.jsx'
import MailIcon from "../../../../icons/MailIcon.jsx";
import LocationIcon from "../../../../icons/LocationIcon.jsx"
import SpinnerIcon from "../../../../icons/SpinnerIcon.jsx"


const Profile = ({ 
  activeTab, 
  handleTabClick, 
  setOpenCreateTradeDrawer, 
  setOpenViewTradeDrawer, 
  setData, 
  setInfo



}) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const { id } = useParams(); 
  const { setIsFollowerTabActive } = useGlobalContext()
  const { userInformation } = useSelector((state) => state.authReducer?.userData);
  const [ isLoading, setLoading ] = useState(false)
  const [ profilePicture, setProfilePicture ] = useState("")
  const [ coverPicture, setCoverPicture ] = useState("")
  const [ coverPicturePreview, setCoverPicturePreview] = useState("")
  const [ profilePicturePreview, setProfilePicturePreview] = useState("")
  const profileRef = useRef();
  const coverRef = useRef();
  const { setOpenFollowersDrawer , setToggleFollowersDrawer} = useGlobalContext()



  const fetchExistingSchedule = async () => { 
    const { data } = await fetchExistingTrade(userInformation._id ,id);
    setData(data?.existingTrade[0])
    return data;
  }

  const { data: scheduleData, status} = useQuery(['existingSchedule', id], fetchExistingSchedule);

  const fetchProfile = async () => {
    const { data } = await fetchInfo(id)
    setInfo(data[0])
    return data[0]
  }

  const { data:profileData, status:profileStatus} = useQuery(['profileInfo', id], fetchProfile);
  
  const handleFollow = async() =>{
    setLoading((prev)=>!prev)
    const newNotificationData= {
      senderId: userInformation._id,
      entityId: profileData._id,
      type:"followUser",
      text:`${"wants to follow you"}`,
    }
    try {
      await followRequest(id, userInformation._id)
      if (profileData._id !== userInformation._id ) {
        await createNotification(id, newNotificationData)
      }  
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])
      queryClient.invalidateQueries(['pendingFollowers'])

      setLoading((prev)=>!prev)
    } catch (error) {
      console.log(error)
    }
  } 

  const handleAccept = async() =>{
    setLoading((prev)=>!prev)
    try {
      const newNotificationData= {
        senderId: userInformation._id,
        entityId: profileData._id,
        type:"followUser",
        text:"followed you back",
      }
      await followAccept(id, userInformation._id)
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])
      queryClient.invalidateQueries(['pendingFollowers'])

      if (profileData._id !== userInformation._id ) {
        await createNotification(id, newNotificationData)
      }  
      setLoading((prev)=>!prev)
    } catch (error) {
      console.log(error)
    }
  } 

  const handleUnFollow = async() =>{
    setLoading((prev)=>!prev)
    try {
      await unFollow(id, userInformation._id)
      queryClient.invalidateQueries(['profileInfo'])
      queryClient.invalidateQueries(['pendingFollowersList'])
      queryClient.invalidateQueries(['profileUserFollowers'])
      queryClient.invalidateQueries(['profileUserFollowings'])

      setLoading((prev)=>!prev)
    } catch (error) {
      console.log(error)
    }
  } 


  const handleCamera = () => {
    profileRef.current.click();
  };

  const handleCover = () => {
    coverRef.current.click();
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPicturePreview(reader.result); 
      };
      reader.readAsDataURL(file);
      setCoverPicture({ file: file, url: URL.createObjectURL(file) });
    }
  }

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicturePreview(reader.result); 
      };
      reader.readAsDataURL(file);
      setProfilePicture({ file: file, url: URL.createObjectURL(file) });
    }
  }

  const handleDiscardChange = () =>{
    setProfilePicturePreview("")
    setProfilePicture("")
    setCoverPicturePreview("")
    setCoverPicture("")
  }

  const handleSaveChange = async() =>{
    if(coverPicture.file){
      try {
        const data = new FormData();
        data.append("my_file", coverPicture.file);
        const res = await uploadCoverImage(data)
        await uploadCoverPicture(userInformation._id, {coverPicture: res.data})
      } catch (error) {
        console.log(error)
      }
    }
    if(profilePicture.file){
      try {
        const data = new FormData();
        data.append("my_file", profilePicture.file);
        const res = await uploadAvatarImage(data)
        await uploadProfilePicture(userInformation._id, {profilePicture: res.data})
        dispatch(updateProfilePicture({profilePicture:res.data}))
      } catch (error) {
        console.log(error)
      }
    }
    setProfilePicturePreview("")
    setProfilePicture("")
    setCoverPicturePreview("")
    setCoverPicture("")
    queryClient.invalidateQueries(['profileInfo'])

  }

  const handleRemoveCover = async()=>{
    if (!profileData.coverPicture) return null
    try {
      await removeCoverPicture(userInformation._id)
      // await deleteCoverPicture({secureUrl:profileData.coverPicture})
      console.log(profileData.coverPicture)
    } catch (error) {
      console.log(error)
    }
    queryClient.invalidateQueries(['profileInfo'])
  }

  if (profileStatus === 'loading' || status === 'loading' || !profileData || !scheduleData ){
    return (
      <div className="relative w-full mt-16 max-w-[42rem]">
        <ProfileSkeleton/>
      </div>
    )
  }


  return (

    <div className="relative w-full  max-w-[42rem]">
      <div className="w-full sticky top-0 h-16"></div>


      {(coverPicture || profilePicture) && (
        <div className="flex items-center p-2 justify-between bg-card rounded-2xl mt-6 shadow-xl shadow-slate-100 mb-2  ring-1 ring-lightGray  dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray">
          <button className="font-main text-sm py-2 text-rose-500 rounded-xl p-4" onClick={handleDiscardChange}>
            Discard
          </button>
          <span className="text-md font-main dark:text-white2">Preview</span>
          <button className="font-main text-sm py-2 bg-Primary rounded-xl p-4 text-white" onClick={handleSaveChange}>Save</button>
        </div>
      )}
      

      <div className="bg-card rounded-2xl mt-6 shadow-xl shadow-slate-100 mb-2  ring-1 ring-lightGray  dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray"> 

        <div className="relative flex flex-col items-center justify-center pb-4">
          {profileData.coverPicture || coverPicturePreview  ? (
            <>
              <img src={coverPicturePreview ? coverPicturePreview : profileData.coverPicture} alt="" className="w-full rounded-t-2xl  h-[12rem] object-cover"/>
              {userInformation._id === profileData._id && !coverPicture &&
                <button 
                  className=" absolute top-4 right-4 py-1 px-3 rounded-lg  dark:ring-darkGray bg-blue-400/10 dark:bg-blue-800/20 dark:hover:bg-darkGray  flex flex-col justify-center items-center "
                  onClick={handleCover}
                >
                  <span className="font-main text-xs text-Primary ">Change cover</span>
                  <input type="file" ref={coverRef} accept="image/*" className="hidden" onChange={handleCoverChange}/>
                </button>
              }
              {profileData.coverPicture && userInformation._id === profileData._id && !coverPicture &&
                <button 
                  className="absolute top-4 right-32 py-1 px-3 rounded-lg  dark:ring-darkGray bg-blue-400/10 dark:bg-blue-800/20  flex flex-col justify-center items-center "
                  onClick={handleRemoveCover}
                >
                  <span className="font-main text-xs text-rose-500">Remove</span>
                </button>
              }
            </>
          ) : (
            <div className="p-4 relative bg-lightGray w-full rounded-t-2xl h-[12rem] object-cover dark:bg-darkGray/70">
              { profileData._id === userInformation._id &&
                <>
                  <button 
                    className="absolute top-4 right-4 py-1 px-3 rounded-lg  dark:ring-darkGray bg-blue-400/10 dark:bg-blue-800/20  flex flex-col justify-center items-center "
                    onClick={handleCover}
                  >
                    <span className="font-main text-xs text-Primary ">Change cover</span>
                    <input type="file" ref={coverRef} accept="image/*" className="hidden" onChange={handleCoverChange}/>
                  </button>                
                </>
              }
            </div>
          )}

          <div className="flex relative items-center justify-center ">
          <div className="absolute xs:rounded-[2.5rem] sm:rounded-[3rem] xs:w-32 xs:h-32 sm:w-40 sm:h-40 border-8 w-32 h-32 max-w-[10rem] max-h-[10rem] border-white dark:border-lightBlack">
            <img src={profilePicturePreview ? profilePicturePreview : profileData.profilePicture} alt="" className="object-cover rounded-[3rem] sm:rounded-[2.5rem] xs:rounded-[2rem] w-full h-full"/>
              {userInformation._id === id && 
              <>
                <button 
                  className="bottom-0 right-0 p-1 absolute w-8 h-8 rounded-xl bg-Primary dark:bg-Primary ring-4 ring-white dark:ring-lightBlack"
                  onClick={handleCamera}
                >
                  <CameraIcon color="fill-white2 stroke-Primary dark:stroke-Primary dark:stroke-2 dark:fill-lightBlack"/>  
                </button>
                <input type="file" ref={profileRef} accept="image/*" className="hidden" onChange={handleProfileChange}/>
              </>
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-2">
          <div className="flex mb-4 xs:gap-[10rem] sm:gap-[18rem]">
            
            <button className="flex flex-col items-center" onClick={()=>{setOpenFollowersDrawer((prev)=>!prev); setToggleFollowersDrawer(false); setIsFollowerTabActive(true)}}>
              <span className="font-main font-bold text-lg text-darkBlue dark:text-white2">{profileData.followersData.length}</span>
              <span className="font-main font-medium text-gray xs:text-xs sm:text-sm dark:text-darkWhite">Followers</span>
            </button>
        
            <button className="flex flex-col items-center" onClick={()=>{setOpenFollowersDrawer((prev)=>!prev); setToggleFollowersDrawer(false); setIsFollowerTabActive(false)}}>
              <span className="font-main font-bold text-lg text-darkBlue dark:text-white2">{profileData.followingsData.length}</span>
              <span className="font-main font-medium text-gray xs:text-xs sm:text-sm dark:text-darkWhite">Following</span>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center mt-2 mb-2">
            <div className="flex items-center justify-center gap-2">
              <span className="font-main text-2xl font-semibold text-darkBlue mb-1 dark:text-white2">{profileData.firstName + " " +profileData.lastName}</span>
              <div className="flex items-center justify-center gap-1">
                <div className="w-4 h-4">
                  <StarIcon color="fill-yellow-500 stroke-amber-500" />
                </div>
                <span className="font-main text-sm text-gray dark:text-white2">{profileData.reviewData.ratings ? parseFloat(profileData.reviewData.ratings).toFixed(1) : "0.0"}</span>
                <span className="font-main text-sm text-gray dark:text-white2">{"(" +  profileData.reviewData.reviews + ")"}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-5 h-5">
                <LocationIcon />
              </div>
              <span className="font-main xs:text-xs sm:text-sm text-gray inline-flex flex-wrap items-center justify-center dark:text-darkWhite">{profileData.address} • 
                <span className="ml-1 font-medium">{profileData.expertise}</span>
              </span>
            </div>
          </div>
        </div>
        
        {userInformation._id !== id && 
        <div className="mb-4 mt-1"> 
          <div className="flex items-center gap-4 justify-center">

            { !profileData.followersData.some((follower) => follower._id === userInformation._id)  && !profileData.followingsData.some((follower) => follower._id === userInformation._id)  &&
              <button 
                onClick={handleFollow} 
                className={`flex items-center rounded-xl gap-1 justify-center ${isLoading ? "bg-lightGray dark:bg-darkWhite cursor-not-allowed" : "cursor-pointer bg-Primary"} text-white px-4 py-2 w-36`}                disabled={isLoading}
              >
                <div className="w-4 h-4">
                  {isLoading ? <SpinnerIcon /> : <FollowIcon />}
                </div>
                <span className="text-white font-main text-sm">Follow</span>
              </button>
            }


            { profileData.followersData.some((follower) =>  follower.status === 'pending' && follower._id === userInformation._id) && 
              <button 
                onClick={handleFollow} 
                className={`flex items-center rounded-xl gap-1 justify-center ${isLoading ? "bg-lightGray dark:bg-darkWhite cursor-not-allowed" : "cursor-pointer bg-amber-500"} text-white px-4 py-2 w-36`}                disabled={isLoading}
              >
                <div className="w-4 h-4">
                  {isLoading ? <SpinnerIcon /> : <FollowRequestIcon />}
                </div>
                <span className="text-white font-main text-sm">Requested</span>
              </button>
            }

            { profileData.followingsData.some(follower => follower.status === 'pending' && follower._id === userInformation._id) && 
              <button 
                onClick={handleAccept} 
                className={`flex items-center rounded-xl gap-1 justify-center ${isLoading ? "bg-lightGray dark:bg-darkWhite cursor-not-allowed" : "cursor-pointer bg-amber-500"} text-white px-4 py-2 w-36`}                disabled={isLoading}
              >
                <div className="w-4 h-4">
                  {isLoading ? <SpinnerIcon /> : <FollowRequestIcon />}
                </div>
                <span className="text-white font-main text-sm">Follow Back</span>
              </button>
            }

            { profileData.followingsData.some(follower => follower.status === 'accepted' && follower._id === userInformation._id) && 
              <button 
                onClick={handleUnFollow} 
                className={`flex items-center rounded-xl gap-1 justify-center ${isLoading ? "bg-lightGray dark:bg-darkWhite cursor-not-allowed" : "cursor-pointer bg-rose-500"} text-white px-4 py-2 w-36`}
                disabled={isLoading}
              >
                <div className="w-4 h-4">
                  {isLoading ? <SpinnerIcon /> : <UnfollowIcon />}
                </div>
                <span className="text-white font-main text-sm">Unfollow</span>
              </button>
            }

            <button 
              className={`flex items-center gap-1 justify-center ${scheduleData.existingTrade.length > 0 ? "shadow-amber-500 bg-amber-500 ": "shadow-Primary bg-Primary "} p-1  shadow-2xl rounded-xl px-4 py-2 cursor-pointer w-36`}
              onClick={scheduleData.existingTrade.length > 0 ? ()=>setOpenViewTradeDrawer((prev)=>!prev) : ()=>setOpenCreateTradeDrawer(prev => !prev)}
            >
              <div className="w-4 h-4">
                <MailIcon color={scheduleData.existingTrade.length > 0 ? 'fill-white stroke-amber-500' : 'fill-white stroke-Primary'}/>
              </div>
              <span className="text-white font-main text-sm">{scheduleData.existingTrade.length > 0 ? 'View Trade' : 'Trade Skills'}</span>
            </button>

          </div>
        </div>
        }


   

        <div className="flex justify-around mb-2 mt-6">
          <div className="cursor-pointer w-6 h-6"onClick={()=>handleTabClick("skills")}>
            <SkillsIcon color={activeTab === "skills" ? "stroke-darkBlue dark:stroke-white2" : "stroke-gray dark:stroke-darkWhite"}/> 
          </div>
          <div className="cursor-pointer w-6 h-6"onClick={()=>handleTabClick("posts")}>
            <PostsIcon color={activeTab === "posts" ? "stroke-darkBlue dark:stroke-white2" : "stroke-gray dark:stroke-darkWhite"}/>
          </div>

          <div className="cursor-pointer w-6 h-6"onClick={()=>handleTabClick("reviews")}>
            <StarIcon color={activeTab === "reviews" ? "stroke-darkBlue dark:stroke-white2" : "stroke-gray dark:stroke-darkWhite"}/>
          </div>

          <div className="cursor-pointer w-6 h-6"onClick={()=>handleTabClick("info")}>
            <InformationIcon color={activeTab === "info" ? "stroke-darkBlue dark:stroke-white2" : "stroke-gray dark:stroke-darkWhite"}/>
          </div>
        </div>


        <div className="flex justify-around  transition-transform">
          <div className="flex items-center justify-center w-full ">
            {activeTab === "skills" &&<div className="w-12 h-1 bg-darkBlue rounded-full dark:bg-white2"></div>}
          </div>
          <div className="flex items-center justify-center w-full ">
            {activeTab === "posts" &&<div className="w-12 h-1 bg-darkBlue rounded-full dark:bg-white2"></div>}
          </div>
          <div className="flex items-center justify-center w-full ">
            {activeTab === "reviews" &&<div className="w-12 h-1 bg-darkBlue rounded-full dark:bg-white2"></div>}
          </div>
          <div className="flex items-center justify-center w-full ">
            {activeTab === "info" &&<div className="w-12 h-1 bg-darkBlue rounded-full dark:bg-white2"></div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile