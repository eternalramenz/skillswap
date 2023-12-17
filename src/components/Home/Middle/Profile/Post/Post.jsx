import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { likePost } from '../../../../../redux/api/DiscoverRequest.ts'
import { deletePost } from '../../../../../redux/api/ProfileRequest.ts'
import { createComment } from '../../../../../redux/api/CommentRequest.ts'
import { useQueryClient } from '@tanstack/react-query'
import { createNotification } from '../../../../../redux/api/NotificationRequest.ts'
import ImageCarousel from '../../../../global/ImageCarousel.jsx'
import LikeIcon from '../../../../../icons/LikeIcon.jsx'
import ThreeDotsIcon from '../../../../../icons/ThreeDotsIcon.jsx'
import LocationIcon from '../../../../../icons/LocationIcon.jsx'
import SendIcon from '../../../../../icons/SendIcon.jsx'
import TrashIcon from '../../../../../icons/TrashIcon.jsx'
import PencilIcon from '../../../../../icons/PencilIcon.jsx'
import Comments from './Comments.jsx'
import StarIcon from '../../../../../icons/StarIcon.jsx'
const Post = ({props,setOpenTradeDrawer, setData}) => {

  const queryClient = useQueryClient()
  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  const [ liked, setLiked] = useState(props.likes.includes(userInformation._id));
  const [ likes, setLikes] = useState(props.likes.length)
  const [currentImage, setCurrentImage] = useState(0);

  const [ toggleMenu, setToggleMenu ] = useState(false)
  const [ comment, setComment ] = useState('')
  const menuRef = useRef(null)


  const handleLike = async () =>{
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    setLiked((prev)=>!prev)
    const newNotificationData= {
      senderId: userInformation._id,
      entityId: props._id,
      type:"likePost",
      text:"liked your post",
    }
    try {
      await likePost(props._id, userInformation._id)
      if (props.userId !== userInformation._id ) {
        await createNotification(props.userId, newNotificationData)
      }  
    } catch (error) {
      console.log(error)
    }
  } 

  const handleComment = async ()  => {
    if (!comment) return
    const newNotificationData= {
      senderId: userInformation._id,
      entityId: props._id,
      type:"commentPost",
      text:"commented on your post",
    }
    const newCommentData = {
      postId: props._id,
      userId: userInformation._id,
      content: comment,
    }
    try {
      await createComment(newCommentData)
      if (props.userId !== userInformation._id ) {
        await createNotification(props.userId, newNotificationData)
      }
      queryClient.invalidateQueries(['profileComments'])
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async() =>{
    try { 
      const res = await deletePost(props._id, userInformation._id)
      queryClient.invalidateQueries(['profilePost'])
      setToggleMenu((prev)=>!prev)

    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleEdit = () =>{
    setCurrentImage(0)
    setToggleMenu((prev)=>!prev)
    setOpenTradeDrawer((prev)=>!prev)
    setData(props)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleMenu(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div ref={menuRef} className="mb-6 flex flex-col p-4 bg-card dark:shadow-black/20 shadow-xl shadow-zinc-200 ring-1 ring-lightGray rounded-2xl gap-2  dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray">{/* Post */}
      <div className="flex items-center pl-2 justify-between w-full mt-2">
        <div className="flex items-center">
          <div className="rounded-3xl flex-shrink-0 w-14 h-14">
            <img src={props.userData.profilePicture} alt="" className="rounded-2xl w-full h-full object-cover"/>
          </div>
          <div className="flex flex-col pl-4">
            <div className="flex items-center">
              <span className="font-main font-medium text-gray mr-1 xs:text-xs sm:text-sm dark:text-darkWhite">{props.userData.firstName + " " + props.userData.lastName}</span>
              <div className="w-4 h-4">
                <StarIcon color="stroke-yellow-500 fill-yellow-500"/>
              </div>

              <span className="font-main font-semibold text-darkBlue ml-1 xs:text-xs sm:text-sm dark:text-white2">{props.reviewData.ratings ? (parseFloat(props.reviewData.ratings).toFixed(1)) : "0.0"}</span>
              <span className="font-main text-gray ml-1 text-sm dark:text-darkWhite">{"("+props.reviewData.reviews+")"}</span>

            </div>
            <span className="font-main font-semibold text-darkBlue xs:text-sm sm:text-lg dark:text-white2">{props.userData.expertise}</span>
            <div className="flex items-center justify-left ">
              <LocationIcon />
              <span className="font-main text-gray xs:text-xs sm:text-sm ml-1 dark:text-darkWhite">{props.userData.address}</span>
              <div className={`xs:flex-wrap sm:flex  ml-2 rounded-lg px-2 py-1 items-center justify-center h-full ${props.tradeData.meetingType === "personal" ? "bg-green-100 dark:bg-green-800/20"  : "bg-sky-100 dark:bg-sky-800/20" }`}>
                <span className={`font-main font-semibold dark:font-medium text-xs ${props.tradeData.meetingType  === "personal" ? "text-green-500 " : "text-sky-500"}`}>{props.tradeData.meetingType  === "personal" ? "Personal" : "Virtual"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center relative">
        {userInformation._id === props.userId && 
          <div className=" mr-4 p-0.5 rounded-lg border-2 border-darkBlue  dark:border-white2 cursor-pointer" onClick={()=>setToggleMenu((prev)=>!prev)}> 
            <ThreeDotsIcon />
          </div>
        }
        {userInformation._id === props.userId && toggleMenu &&
          <div className="absolute right-14 ring-1 ring-lightGray dark:ring-darkGray w-[6rem] bg-white p-1 dark:bg-lightBlack z-10 rounded-lg">
            <button className="flex items-center justify-center px-3 gap-1 "onClick={handleToggleEdit}>
              <div className="w-6 h-4">
                <PencilIcon />
              </div>
              <span className="font-main text-sm text-darkBlue dark:text-white2 py-1 text-left w-full">Edit</span>
            </button>
            <button className="flex items-center justify-center px-3 gap-1" onClick={handleDelete}>
              <div className="w-6 h-6">
                <TrashIcon />
              </div>
              <span className="font-main text-sm text-rose-500 py-1 text-left w-full">Delete</span>
            </button>
          </div>
        }
        </div>
      </div>
      
      <ImageCarousel props={props.images} currentImage={currentImage} setCurrentImage={setCurrentImage} />
      
      <div className="font-main ml-4 ">
        {likes > 0 && (
          <span className="font-main text-sm text-darkBlue font-semibold dark:text-white2">
            {likes} {props.likes.length > 1 ? "Likes" : "Like"}
          </span>
        )}
        <div className="flex">  

          <span className="font-main text-sm text-gray dark:text-darkWhite"> 
            <span className="font-main text-md text-darkBlue dark:text-white2 font-medium"> 
              {props.userData.firstName + " " + props.userData. lastName + " "}
            </span>
            {props.description}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-5 items-center px-4 mt-4">
        <Comments props={props}/>
      </div>

      <div className="flex items-center mt-4 mr-2 ml-2 w-full ">
        <div className="flex items-center justify-start gap-6 pl-2 pr-4 w-full ">{/* Post React */}
          <button className="w-8 h-8" onClick={handleLike}>
            <LikeIcon state={liked}/>
          </button>
          <div className=" flex items-center rounded-xl  p-1 ring-1 ring-lightGray w-full dark:ring-darkGray dark:bg-black1/50" >
            <div className="w-9 h-9 rounded-xl flex-shrink-0">
              <img src={userInformation.profilePicture} alt="" className="rounded-xl w-9 h-9"/>
            </div>
            <input
              type="text" 
              maxLength={128} 
              value={comment}
              onChange={(e) => setComment(e.target.value)}       
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleComment();
                }
              }} 
              placeholder="Write a comment..." 
              className="w-full h-4 pr-4 pl-4 bg-transparent outline-none border-none text-sm font-main resize-none  dark:placeholder:text-darkWhite dark:text-white2" 
            />
            <button disabled={!comment} onClick={handleComment} className={`${comment ? "cursor-pointer" : "cursor-not-allowed"} w-8 h-8 rounded-md mr-2 flex items-center justify-center`}>
              <SendIcon state={comment}/>
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Post