import React from 'react'
import { format } from 'timeago.js'
import HeartIcon from '../../../icons/HeartIcon.jsx'
import ChatIcon from '../../../icons/ChatIcon.jsx'
import FollowIcon from '../../../icons/FollowIcon.jsx'
import SendIcon1 from '../../../icons/SendIcon-1.jsx'
import StarIcon from '../../../icons/StarIcon.jsx'
import ImageIcon1 from '../../../icons/ImageIcon-1.jsx'
const Notification = ({props}) => {

  const checkType = (type) => {
    if (type === "tradeRequest" || type === "tradeRescheduled" || type === "tradeReproposed") {
      return { 
        backgroundColor: "dark:bg-amber-500 bg-amber-500",
        icon: <SendIcon1 color="fill-white stroke-white"/>,
      };
    } else if (type === "tradeEdit") {
      return { 
        backgroundColor: "dark:bg-blue-500 bg-blue-500",
        icon: <SendIcon1 color="fill-white stroke-white"/>,
      };
    } else if (type === "tradeAccepted") {
      return { 
        backgroundColor: "dark:bg-green-500 bg-green-500",
        icon: <SendIcon1 color="fill-white stroke-white"/>,
      };
    } else if (type === "tradeCancelled") {
      return { 
        backgroundColor: "dark:bg-rose-500 bg-rose-500",
        icon: <SendIcon1 color="fill-white stroke-white"/>,
      };
    } else if (type === "tradeCompleted") {
      return { 
        backgroundColor: "dark:bg-neutral-500 bg-neutral-500",
        icon: <SendIcon1 color="fill-white stroke-white"/>,
      };
    } else if (type === "tradeReviewed") {
      return { 
        backgroundColor: "dark:bg-yellow-500 bg-yellow-500",
        icon: <StarIcon color="fill-white stroke-white"/>,
      };
    } else if (type === "tradePosted") {
      return { 
        backgroundColor: "dark:bg-blue-500 bg-blue-500",
        icon: <ImageIcon1 color="fill-white stroke-white"/>,
      };
    } else if (type === "followUser" || type === "requestFollow") {
      return { 
        backgroundColor: "dark:bg-purple-500 bg-purple-500",
        icon: <FollowIcon/>
      };
    } else if (type === "commentPost" || type === "commentPost") {
      return { 
        backgroundColor: "dark:bg-orange-500 bg-orange-500",
        icon: <ChatIcon color="fill-white stroke-white"/>
      };
    } else if (type === "likePost" || type === "likeComment") {
      return { 
        backgroundColor: "dark:bg-pink-600 bg-pink-600",
        icon: <HeartIcon color="fill-white stroke-white"/>
      };
    } else {
      return { text: null, color: null };
    }
  }

  const type = checkType(props.type)
  return (
    <>
      <div className="w-full  flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <div className="rounded-3xl flex-shrink-0 w-12 h-12 relative">
            <img src={props.senderData.profilePicture} className="rounded-2xl w-full h-full object-cover"/>
            <div className={`w-4 h-4 rounded-md p-[3px] ${type.backgroundColor} absolute -bottom-1 -right-1`}>
              {type.icon}
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">            
            <span className="font-main text-xs text-gray dark:text-darkWhite ">{format(props.createdAt)}</span>
            <span className={`font-main text-sm text-left  ${props.didRead ? 'text-gray dark:text-darkWhite': 'text-darkBlue dark:text-white'}`}>
              <span className="font-medium dark:text-white2 text-darkBlue">{props.senderData.firstName + " "+ props.senderData.lastName + " "}</span>
              {props.text}
            </span>
          </div>
        </div>
      </div>
      <hr className="text-lightGray dark:text-darkGray mt-4"/>
    </>
  )
}

export default Notification