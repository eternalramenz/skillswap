import React from 'react'
import StarIcon from '../../../../../icons/StarIcon.jsx'
import { format } from 'timeago.js'
import { useState } from 'react'
import ClockIcon from '../../../../../icons/ClockIcon.jsx'


const Review = ({ props }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="rounded-3xl flex-shrink-0 p-1.5">
          <img src={props.senderData.profilePicture} alt="" className="rounded-2xl w-14 h-14 object-cover" />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start">
            <span className="font-main text-lg text-darkBlue font-semibold dark:text-white2">{props.senderData.firstName + " " + props.senderData.lastName}</span>
            {/* <span className="font-main text-lg dark:text-white2 font-semibold dark:font-semibold">{props.senderData.expertise}</span> */}
          <span className="font-main text-gray text-sm dark:text-darkWhite ">{props.senderData.address}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="w-7 h-7"> 
                <ClockIcon/>
              </div>
              <span className="font-main text-sm dark:text-darkWhite">{format(props.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4 dark:text-darkGray text-lightGray" />
      <div>
        <div className="flex gap-4 items-center justify-center">
          <span className="text-xl font-main text-darkBlue font-semibold dark:text-white2">
            {props.topic.length > 0 ? props.topic[0].name : "No Topic"}
          </span>


        </div>
        <div className="flex gap-4 items-center justify-center py-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="w-10 h-10">
              <StarIcon color={props.rating >= index ? "stroke-yellow-500 fill-yellow-500 cursor-default" : "cursor-default stroke-gray fill-gray dark:stroke-darkGray dark:fill-darkGray "} />
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <span className={` font-main text-sm text-gray dark:text-darkWhite break-all whitespace-pre-line`}>
          {isExpanded ? props.comment : props.comment.substring(0, 160)}
        </span>
        {props.comment.length > 160 && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="ml-1 font-main text-sm text-darkBlue dark:text-white2 font-medium">
            {isExpanded || '...See More'}
          </button>
        )}
      </div>
    </>
  )
}

export default Review
