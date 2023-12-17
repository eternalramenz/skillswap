import { updateComment, deleteComment, likeComment } from '../../../../../redux/api/CommentRequest.ts'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import { useState, useRef, useEffect } from 'react'
import { createNotification } from '../../../../../redux/api/NotificationRequest.ts'
import { useQueryClient } from '@tanstack/react-query'
import LikeIcon from '../../../../../icons/LikeIcon.jsx'
import ThreeDotsIcon from '../../../../../icons/ThreeDotsIcon.jsx'
import SendIcon from '../../../../../icons/SendIcon.jsx'
import CloseIcon from '../../../../../icons/CloseIcon.jsx'
import TrashIcon from '../../../../../icons/TrashIcon.jsx'
import PencilIcon from '../../../../../icons/PencilIcon.jsx'
const Comment = ({comment, post}) => {
  const queryClient = useQueryClient()
  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  const [ showMenu, setShowMenu ] = useState(false)
  const [ toggleEdit, setToggleEdit ] = useState(false)
  const [ newComment, setNewComment] = useState(comment.content)
  const menuRef = useRef(null)
  const textAreaRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    try {
      const res = await deleteComment(userInformation._id, comment._id)
      queryClient.invalidateQueries(['profileComments'])
      setShowMenu((prev)=>!prev)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async ()  => {
    if (!newComment) return
    const newCommentData = {
      userId: userInformation._id,
      content: newComment,
    }
    try {
      const res = await updateComment(newCommentData, comment._id)
      queryClient.invalidateQueries(['profileComments'])
      setToggleEdit((prev)=>!prev)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async () => {
    const newCommentData = {
      userId: userInformation._id,
    }
    const newNotificationData= {
      senderId: userInformation._id,
      entityId: comment._id,
      type:"likeComment",
      text:"liked your comment",
    }
    try {
      const res = await likeComment(newCommentData, comment._id)
      if (comment.userId !== userInformation._id ) {
        await createNotification(comment.userId, newNotificationData)
      }  
      queryClient.invalidateQueries(['profileComments'])
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleEdit = () =>{
    setToggleEdit((prev)=>!prev)
    setNewComment(comment.content)
  }

  return (
    <div className="flex justify-between flex-col" ref={menuRef}>
      { toggleEdit ? (
        <div className=" flex items-center rounded-xl  p-1 ring-1 ring-lightGray w-full dark:ring-darkGray dark:bg-black1/50" >
          <div className="w-9 h-9 rounded-xl flex-shrink-0">
            <img src={userInformation.profilePicture} alt="" className="rounded-xl w-9 h-9"/>
          </div>
          <input
            type="text" 
            maxLength={128} 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}       
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUpdate();
              }
            }}
            ref={textAreaRef}
            placeholder="Write a new comment..." 
            className="rows-2 w-full h-4 pr-4 pl-4 bg-transparent outline-none border-none text-sm font-main resize-none  dark:placeholder:text-darkWhite dark:text-white2" 
          />
          <button className='w-8 h-8' onClick={()=>setToggleEdit((prev)=>!prev)}>
            <CloseIcon />
          </button>
          <button disabled={!newComment} onClick={handleUpdate} className={`${newComment ? "cursor-pointer" : "cursor-not-allowed"} w-8 h-8 rounded-md mr-2 flex items-center justify-center`}>
            <SendIcon state={newComment}/>
          </button>
        </div>
      ) : (
          <div className="flex justify-between">
            <div className="flex items-start gap-4 pr-4">
              <img src={comment.userData.profilePicture} alt="" className="w-8 h-8 rounded-lg"/>
              <div className="flex flex-col">
                <div className="flex gap-2 items-start">
                  <span className="font-main text-xs font-medium text-darkBlue dark:text-white2 break-words whitespace-pre-line">
                    {comment.userData.firstName + " " + comment.userData.lastName}
                  </span>
                  <span className="font-main text-xs text-gray dark:text-darkWhite">
                    {format(comment.createdAt)}
                  </span>
                </div>
                <span className="font-main text-sm text-darkBlue dark:text-white2 break-all">
                  {comment.content}
                </span>
              </div>
          </div>

          <div className="items-center flex gap-2 relative ">
              {(comment.userId === userInformation._id || post.userId === userInformation._id) &&
                <button className="rotate-90" onClick={()=>setShowMenu((prev)=>!prev)}>
                  <ThreeDotsIcon />
                </button>
              }
              { showMenu &&
                <div className="absolute right-14 ring-1 ring-lightGray dark:ring-darkGray w-[6rem] bg-white p-1 dark:bg-lightBlack z-10 rounded-lg">
                  {comment.userId === userInformation._id && 
                  <button className="flex items-center justify-center px-3 gap-1 "onClick={handleToggleEdit}>
                    <div className="w-6 h-4">
                      <PencilIcon />
                    </div>
                    <span className="font-main text-sm text-darkBlue dark:text-white2 py-1 text-left w-full">Edit</span>
                  </button>
                  }
                  <button className="flex items-center justify-center px-3 gap-1" onClick={handleDelete}>
                    <div className="w-6 h-6">
                      <TrashIcon />
                    </div>
                    <span className="font-main text-sm text-rose-500 py-1 text-left w-full">Delete</span>
                  </button>
                </div>
              }
              <button className="w-6 h-6 flex flex-col items-center justify-start " onClick={handleLike}>
                <LikeIcon state={comment.likes.includes(userInformation._id)}/>
                {comment.likes.length > 0 && <span className="text-xs font-main text-darkBlue dark:text-white2">{comment.likes.length}</span>}
              </button>
          </div>
        </div>
      )}
    </div>
      

  )
}

export default Comment