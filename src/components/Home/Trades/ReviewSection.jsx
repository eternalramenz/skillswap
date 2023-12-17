import { useSelector } from 'react-redux'
import { useState, useEffect} from "react";
import { useQueryClient } from '@tanstack/react-query';
import { createReview } from '../../../redux/api/ReviewRequest.ts'
import { generateReview } from '../../../redux/api/UserRequest.ts'
import DropDown from '../../../components/global/Dropdown.jsx'
import CloseIcon from "../../../icons/CloseIcon.jsx";
import StarIcon from '../../../icons/StarIcon.jsx'
import tags from '../../../constants/Tags.ts'
import GenerateIcon from '../../../icons/GenerateIcon.jsx';
import { createNotification } from '../../../redux/api/NotificationRequest.ts'

const ReviewSection = ({ data,  setOpenTradeDrawer, setToggleEdit, toggleEdit}) => {
  const queryClient = useQueryClient()
  const [ comment, setComment ] = useState("")
  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  const [ ratings, setRatings ] = useState(0)
  const [ topic, setTopic ] = useState([])
  const [ generating, setGenerating ] = useState(false)
  const [ timer, setTimer ] = useState(60)
  const [ isLoading, setIsLoading ] = useState(false)


  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = '20';
    textarea.style.height = textarea.scrollHeight + 'px';
  };
  const handleSubmit = async () => {
    setIsLoading(true)
    const reviewData = {
      senderId: userInformation._id,
      receiverId: userInformation._id === data.receiverId ? data.senderId :  data.receiverId,
      tradeId: data.tradeId,
      comment: comment,
      rating: ratings,
      topic: topic,
    }
    
    try {
      await createReview(reviewData)
      const newNotificationData = {
        senderId: userInformation._id,
        entityId: data.tradeId,
        type:"tradeReviewed",
        text: "has shared their feedback about your trade",      
      } 
      await createNotification(userInformation._id === data.receiverId ? data.senderId :  data.receiverId, newNotificationData)
      queryClient.removeQueries(['reviews']);
      queryClient.invalidateQueries(['allTrades'])
      queryClient.invalidateQueries(['completedTrade'])
      queryClient.invalidateQueries(['existingSchedule']);
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
    setOpenTradeDrawer((prev)=>!prev)
    setToggleEdit("View")
  }



  useEffect(() => {
    if(generating){
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000);
      if (timer === 0){
        setGenerating(false)
        setTimer(60)
      }
      return () => {
        clearInterval(interval)
      }
    }
  }, [generating, timer])

  const handleGenerate = () =>{
    if(ratings > 0 && topic){    
      generateReview({
        senderName:  userInformation.firstName + " " + userInformation.lastName , 
        receiverName:  userInformation._id === data.receiverId ? data.senderData.firstName + " " + data.senderData.lastName :  data.receiverData.firstName + " " + data.receiverData.lastName , 
        expertise: userInformation._id === data.receiverId ? data.senderData.expertise :  data.receiverData.expertise,
        ratings: ratings,
        topic: topic
      })
      .then((response)=>{
        setComment(response)
      })
      .catch((error)=>{
        console.log(error)
      })
    }

    setGenerating(true)
  }

  return (
    <div className="flex flex-col pl-6 pr-4 py-10 transition-all relative h-full">
      <div className="flex items-center justify-start">          
        <button 
          className=" w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 "
          onClick={() => {setOpenTradeDrawer((prev) => !prev);setToggleEdit("View")}}
        >
          <CloseIcon />
        </button>
      </div>


      <div className="flex gap-4  items-center">
        <div className={`ml-1.5 w-4 h-4  ring-[7px] ring-Primary rounded-md bg-transparent mt-12`}></div>
        <span className="font-main text-2xl font-semibold text-darkBlue dark:text-white2 mt-12">
          Write a Review
        </span>
      </div>
      

      <div className="mt-6 flex-col">

        <div className="mt-6 flex-col  w-full">
          <div className="flex justify-between  w-full">
            <div className="flex flex-col w-full">
              <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium">
                Topic
              </span>
              <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
                Please select a topic that has been instructed by the trader.
              </span>
              <div className="w-full my-4">
                <DropDown options={tags} name="Choose the topic that was taught by the trader." state={topic} setState={setTopic} clear={()=>{}}/>
              </div>
            </div>
          </div> 
        </div> 


        <div className="flex justify-between">
          <div className="flex flex-col ">
            <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium">
              Rate
            </span>
            <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
              Please evaluate the trader by assigning stars.
            </span>
          </div>
        </div> 

        <div className="flex items-center justify-center flex-col my-4 ring-gray/40 dark:backdrop-blur-md dark:bg-lightBlack/30 ring-1 dark:ring-darkGray  rounded-2xl pb-2 pt-1 px-4">
          <div className="flex items-center justify-around py-4 gap-4 w-10/12">
            <button 
              className="w-10 h-10"
              onClick={()=>setRatings(1)}
            >
              <StarIcon color={ratings >= 1 ? "stroke-yellow-500 fill-yellow-500" : "stroke-gray fill-gray dark:stroke-darkGray dark:fill-darkGray"}/>
            </button>
            <button 
              className="w-10 h-10"
              onClick={()=>setRatings(2)}
            >
              <StarIcon color={ratings >= 2 ? "stroke-yellow-500 fill-yellow-500" : "stroke-gray fill-gray dark:stroke-darkGray dark:fill-darkGray"}/>
            </button>
            <button 
              className="w-10 h-10"
              onClick={()=>setRatings(3)}
            >
              <StarIcon color={ratings >= 3 ? "stroke-yellow-500 fill-yellow-500" : "stroke-gray fill-gray dark:stroke-darkGray dark:fill-darkGray"}/>
            </button>
            <button 
              className="w-10 h-10"
              onClick={()=>setRatings(4)}
            >
              <StarIcon color={ratings >= 4 ? "stroke-yellow-500 fill-yellow-500" : "stroke-gray fill-gray dark:stroke-darkGray dark:fill-darkGray"}/>
            </button>
            <button 
              className="w-10 h-10"
              onClick={()=>setRatings(5)}
            >
              <StarIcon color={ratings >= 5 ? "stroke-yellow-500 fill-yellow-500" : "stroke-gray fill-gray dark:stroke-darkGray dark:fill-darkGray"}/>
            </button>
          </div>
          <div className="w-full items-center justify-center flex">
            <span className="font-main text-md dark:text-white2">
              {ratings === 1 && "Bad"}
              {ratings === 2 && "Poor"}
              {ratings === 3 && "Average"}
              {ratings === 4 && "Great"}
              {ratings === 5 && "Excellent"}
            </span>
          </div>
        </div>
      </div>
      

      <div className="mt-4 flex flex-col w-full">
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full">
              <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium">
                Comments
              </span>
              { ratings > 0 && topic && (
              <>
                <div className="flex items-center gap-2">
                  {generating && <span className="text-sm text-green-500 font-main">{timer}s</span>}
                  <button 
                    className={`relative flex item-center justify-center w-8 h-8 rounded-xl p-1.5
                    ${generating ? 'bg-gray cursor-not-allowed' :'bg-green-500 cursor-pointer'}`}
                    onClick={handleGenerate}
                    disabled={generating}
                  >
                    <GenerateIcon state={generating}/> 
                  </button> 
                </div>
              </>
            )}
            </div>

            <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
              Evaluate your experience with the trader.
            </span>
          </div>
        </div> 
        <div className="my-4 ring-gray/40 dark:backdrop-blur-md dark:bg-lightBlack/30 ring-1 dark:ring-darkGray  rounded-2xl pb-2 pt-1 px-4">
          <textarea 
            className="font-main mt-2 h-24 bg-transparent w-full outline-none text-sm resize-none  dark:placeholder:text-darkWhite dark:text-white2"
            placeholder="Write your assessment."
            maxLength={2000}
            onInput={autoResize}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <span className="font-main text-sm text-darkBlue dark:text-darkWhite">{comment.length}/2000</span>
        </div>
      </div> 
      <div className=' w-full flex-1'></div>
      <div className="w-full items-center justify-end flex">
        <button className="bg- font-main text-darkBlue  py-2 px-4 dark:text-darkWhite text-sm" onClick={() => {setToggleEdit("View") ;}}>Discard</button>
        <button 
          className={`${ratings > 0 && comment ? 'bg-Primary': 'bg-lightGray dark:bg-darkWhite cursor-not-allowed'} font-main text-white rounded-lg py-2 px-8 text-sm`}
          disabled={ratings < 1  && comment || isLoading }
          onClick={handleSubmit}
        >
          Evaluate
        </button>
      </div> 

    </div>
  )
}

export default ReviewSection