import { createTradeNotification } from '../../../redux/api/NotificationRequest.ts'
import { acceptTrade, cancelTrade, completedTrade} from '../../../redux/api/TradeRequest.ts'
import { formatDateWithOrdinalNumber } from  '../../../constants/DateConverters.ts'
import { useSelector } from 'react-redux/es/hooks/useSelector.js'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'timeago.js' 
import ClockIcon from '../../../icons/ClockIcon.jsx'
import ReadOnlyGoogleMaps from '../../global/ReadOnlyGoogleMaps.jsx'

const DetailsSection = ({data,setOpenTradeDrawer, setToggleEdit}) => {

  const queryClient = useQueryClient()
  const { userInformation } = useSelector((state)=>state.authReducer.userData)

  if (!data) return null

  const checkStatus = (trade, userId) => {
    if (trade.status === "Accepted") {
      return { 
        text: "Accepted",
        color: "green-500", 
        ring: "ring-green-500",
        backgroundColor: "dark:bg-green-800/20 bg-green-400/10",

      };
    } else if (trade.status === "Pending" && userId === trade.senderId) {
      return { 
        text: "Invitation",
        color: "sky-500", 
        ring: "ring-sky-500",
        backgroundColor: "dark:bg-sky-800/20 bg-sky-400/10",
      };
    } else if (trade.status === "Pending" && userId === trade.receiverId) {
      return { 
        text: "Pending",
        color: "amber-500", 
        ring: "ring-amber-500",
        backgroundColor: "dark:bg-amber-800/20 bg-amber-400/10",
  
      };
    } else if (trade.status === "Completed") {
      return { 
        text: "Completed",
        color: "neutral-500",
        ring: "ring-neutral-500",
        backgroundColor: "dark:bg-neutral-800 bg-neutral-400/10",
      };
    } else if (trade.status === "Cancelled") {
      return { 
        text: "Cancelled",
        color: "rose-500",
        ring: "ring-rose-500",
        backgroundColor: "dark:bg-rose-800/20 bg-rose-400/10",
      };
    } else {
      return { text: null, color: null };
    }
  }

  const TradeStatus = checkStatus(data, userInformation._id)
  const disabled = new Date(data.date) >= new Date(new Date().toISOString())
  
  const handleApproveTrade = async () =>{
    try {      
      await acceptTrade({tradeId: data._id})
      const newNotificationData = {
        senderId: userInformation._id,
        entityId: data.tradeId,
        type:"tradeAccepted",
        text:"accepted your trade request",
      } 
      await createTradeNotification(data.senderId, newNotificationData)
      queryClient.invalidateQueries(['requestsTrades']);
      queryClient.invalidateQueries(['allTrades']);
      queryClient.invalidateQueries(['existingSchedule']);
      queryClient.invalidateQueries(['upcomingSchedules']);
      queryClient.invalidateQueries(['userContacts']);
      queryClient.invalidateQueries(['tradeLogs']);
      queryClient.invalidateQueries(['invitedTrades']);
      setOpenTradeDrawer((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancelTrade = async () =>{
    try {
      const newNotificationData = {
        senderId: userInformation._id,
        entityId: data.tradeId,
        type:"tradeCancelled",
        text:"decided to cancel the trade.",
      } 
      await cancelTrade({tradeId: data._id})
      await createTradeNotification(userInformation._id === data.receiverId ? data.senderId : data.receiverId, newNotificationData)
      queryClient.invalidateQueries(['invitedTrades']);
      queryClient.invalidateQueries(['cancelledTrades']);
      queryClient.invalidateQueries(['existingSchedule']);
      queryClient.invalidateQueries(['upcomingSchedules']);
      queryClient.invalidateQueries(['allTrades']);
      queryClient.invalidateQueries(['tradeLogs']);
      setOpenTradeDrawer((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCompleteTrade = async () =>{
    try {
      const newNotificationData = {
        senderId: userInformation._id,
        entityId: data.tradeId,
        type:"tradeCompleted",
        text:"marked your trade as complete.",
      } 
      await completedTrade({tradeId: data._id})
      await createTradeNotification( userInformation._id === data.receiverId ? data.senderId : data.receiverId, newNotificationData)
      queryClient.invalidateQueries(['acceptedTrades']);
      queryClient.invalidateQueries(['allTrades']);
      queryClient.invalidateQueries(['existingSchedule']);
      queryClient.invalidateQueries(['upcomingSchedules']);
      queryClient.invalidateQueries(['tradeLogs']);
      queryClient.invalidateQueries(['invitedTrades']);
      setOpenTradeDrawer((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-end">
        <div className="flex gap-4  items-center">
          <div className={`ml-1.5 w-4 h-4  ring-[7px] ${TradeStatus.ring} rounded-md bg-transparent mt-12`}></div>
          <span className="font-main text-2xl font-semibold text-darkBlue dark:text-white2 mt-12">
            {TradeStatus.text + " "} Trade
          </span>
        </div>
        <div className="flex items-center h-8 gap-1">
          <div className="w-8 h-8">
            <ClockIcon />
          </div>
          <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
              {format(data.createdAt)}
          </span>
        </div>
      </div>

      <span className="font-main text-xl font-semibold text-darkBlue dark:text-white2 mt-12">
        Trader Information
      </span>

      <div className="flex items-start mt-4">
        <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium w-[8rem]">
          Name
        </span>
        
        <div className="flex mt-2 gap-4">
          <div className="w-8 h-8 rounded-xl">
            <img src={userInformation._id === data.receiverId ? data.senderData.profilePicture :  data.receiverData.profilePicture} alt="" className="rounded-xl object-cover"/>
          </div>
          <div className="flex  items-center">
            <span className="font-main text-md text-gray font-medium dark:text-white2 leading-0">
              {userInformation._id === data.receiverId ? data.senderData.firstName + " " + data.senderData.lastName :  data.receiverData.firstName + " " + data.receiverData.lastName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-2">
        <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium w-[8rem]">
          Expertise
        </span>
        <span className="font-main text-sm text-gray dark:text-white2 leading-0">
          {userInformation._id === data.receiverId ? data.senderData.expertise :  data.receiverData.expertise}
        </span>
      </div>

      <div className="flex items-center mt-2">
        <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium w-[8rem]">
          Location
        </span>
        <span className="font-main text-sm text-gray dark:text-white2 leading-0">
          {userInformation._id === data.receiverId ? data.senderData.address :  data.receiverData.address}
        </span>
      </div>

      <span className="font-main text-xl font-semibold text-darkBlue dark:text-white2 mt-12">
        Meeting Details
      </span>

      
      <div className="flex items-center mt-2">
        <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium w-[8rem]">
          Type
        </span>
        <div className={`rounded-md px-2 py-1 w-auto flex items-center justify-center text-xs  font-main ${data.meetingType === "virtual" ? "dark:bg-sky-800/20 bg-sky-400/10" : "dark:bg-green-800/20 bg-green-400/10"} `}>
          <span className={`font-main text-xs font-medium dark:font-medium ${data.meetingType === "virtual" ? "dark:text-sky-500 text-sky-500" : "dark:text-green-500 text-green-500"} `}>
          {data.meetingType === "virtual" ? "Virtual" : "Personal"}
          </span>
        </div>
      </div>
    




      {data.meetingType === "personal" &&
        <div className="w-full flex mt-2 items-top ">
          <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium mr-[4.4rem]">
            Location
          </span>
          <div className=" h-auto">
            {data && <ReadOnlyGoogleMaps latLng={{ lat: data.location.lat, lng: data.location.lng }} />}
            <span className="font-main text-sm text-gray dark:text-white2 leading-0 break-words whitespace-pre-line">
              {data.location.address}
            </span>
          </div>
        </div>
      }
      


      {data.meetingType === "virtual" &&
        <div className="w-full flex mt-2 items-top ">
          <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium mr-[6.3rem]">
            Link
          </span>
          <div className=" h-auto">
            <span className="font-main text-sm text-gray dark:text-white2 leading-0 break-words whitespace-pre-line">
              {data.link}
            </span>
          </div>
        </div>
      }





      <div className="mt-2 flex items-center">
        <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium w-[8rem]">
          Date
        </span>
        <span className="font-main text-sm text-gray dark:text-white2 leading-0">
          {formatDateWithOrdinalNumber(new Date(data.date))}
        </span>
      </div>

      <div className="mt-2 flex items-center">
        <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium w-[8rem]">
          Time
        </span>
        <span className="font-main text-sm text-gray dark:text-white2 leading-0">
          {data.time}
        </span>
      </div>

      <span className="font-main text-xl font-semibold text-darkBlue dark:text-white2 mt-12">
        Trade Letter
      </span>

      <div className=" flex flex-col ">
        <div className="w-full flex mt-4 items-top ">
          <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium mr-[6.2rem]">
            Title
          </span>
            <span className="font-main text-md font-medium text-gray dark:text-white2 leading-0">
              {data.messageData.title}
            </span>
        </div>

        <div className="w-full flex mt-2 items-top ">
          <span className="font-main text-sm font-semibold text-darkBlue dark:text-darkWhite dark:font-medium mr-[4.4rem]">
            Message
          </span>
          <div className=" h-auto">
            <span className="font-main text-sm text-gray dark:text-white2 leading-0 break-words whitespace-pre-line">
                {data.messageData.content}
            </span>
          </div>
        </div>

      </div>
      
      <div className=' w-full flex-1'></div>

      <div className="flex items-center justify-end mt-12 gap-4">
        {data.status === "Accepted" &&
          <>
            { disabled 
              ? 
                <>
                  <button className="ring-1 ring-rose-600 text-rose-600 rounded-lg font-medium font-main py-2 px-4 text-sm" onClick={handleCancelTrade}>Cancel</button>
                  <button className="bg- font-main text-darkBlue  py-2 px-4 dark:text-darkWhite text-sm" onClick={() => {setToggleEdit("Reschedule")}}>Reschedule</button>
                </>
              : <button className="bg- font-main text-darkBlue  py-2 px-4 dark:text-darkWhite text-sm" onClick={() => {setToggleEdit("Reschedule")}}>Reschedule</button>
            }
            <button className={` ${disabled ? "bg-gray dark:bg-darkGray cursor-not-allowed" : "bg-Primary"} font-main text-white rounded-xl py-2 px-4 text-sm`} disabled={disabled} onClick={handleCompleteTrade}>Mark as done</button>
          </>
        }

        {data.status === "Pending" &&
          <>
            { userInformation._id === data.receiverId ? (
              <div className='flex gap-4 items-center justify-between w-full  '>
                <button className="ring-1 ring-rose-600 text-rose-600 rounded-lg font-medium font-main py-2 px-4 text-sm" onClick={handleCancelTrade}>Decline</button>
                <div className="flex gap-2">
                  <button className="flex items-center justify-center font-main text-darkBlue dark:text-white rounded-lg py-2 px-8 text-sm underline underline-offset-4" onClick={()=>setToggleEdit("Repropose")}>Propose Again</button>
                  <button className="flex items-center justify-center bg-Primary font-main text-white rounded-lg py-2 px-8 text-sm" onClick={handleApproveTrade}>Accept Request</button>
                </div>
              </div> 
            ) : (
              <div className="w-full justify-between flex">
                <button className="ring-1 ring-rose-600 text-rose-600 rounded-lg font-medium font-main py-2 px-4 text-sm" onClick={handleCancelTrade}>Cancel</button>
                <button className="bg-Primary font-main text-white rounded-lg py-2 px-8 text-sm" onClick={()=>setToggleEdit("Edit")}>Edit Request</button>
              </div> 
              )
            }
          </>
        }


        {data.status === "Cancelled" &&
          <>
            <button className="bg-Primary font-main text-white rounded-xl py-2 px-4 text-sm" onClick={()=> setToggleEdit("Create")}>Start a New Trade</button>
          </>
        }

        {data.status === "Completed" && (
          <>
            {!data.postData.includes(userInformation._id) && 
              <button className="bg-Primary font-main text-white rounded-xl py-2 px-4 text-sm" onClick={() => setToggleEdit("Post")}>
                Create Post
              </button>
            }
            { !data.reviewData.includes(userInformation._id) &&
              <button className="bg-Primary font-main text-white rounded-xl py-2 px-4 text-sm" onClick={() => setToggleEdit("Review")}>
                Write a Review
              </button>
            }
          </>
        )}
      </div>
      <div className="w-full invisible mb-12">
        `
      </div>
    </div>
  )
}

export default DetailsSection