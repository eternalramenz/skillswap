import { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { fetchInfo } from '../../../redux/api/ProfileRequest.ts'

const Conversation = ({data, currentUserId, online,receivedMessage}) => {
  
  const [ userData, setUserData ] = useState(null) 
  useEffect(()=>{
    const userId = data.members.find((member) => member._id != currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await fetchInfo(userId._id) 
        setUserData(data[0])
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  },[ data, receivedMessage])


  if (userData === null) return
  const isoDate = new Date(data.messageData.createdAt);
  const formattedTime = isoDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <div className="">
      <div className="flex items-center justify-start gap-6">
        <div className='relative flex-shrink-0'>
          <div className={`${online ? 'bg-green-500':'bg-gray dark:bg-darkWhite'} w-4 h-4  absolute rounded-md -bottom-1 -right-1 ring-2 dark:ring-lightBlack ring-white`}></div>
          <img src={userData.profilePicture} alt="" className="w-12 h-12 rounded-2xl object-cover "/>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <span className='font-main text-lg text-darkBlue font-medium dark:text-white2'>{userData.firstName + " " + userData.lastName}</span>
            <span className='font-main text-xs text-gray dark:text-darkWhite'>{formattedTime}</span>
          </div>
          <div className="flex justify-between items-center max-w-[12rem]">
            <span className='font-main text-sm text-gray dark:text-darkWhite truncate '>
              {data.messageData.content}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conversation