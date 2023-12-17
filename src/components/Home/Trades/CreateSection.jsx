import { fetchProfileInfo } from "../../../redux/actions/ProfileAction.ts";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTrade } from "../../../redux/api/TradeRequest.ts";
import { useQueryClient } from "@tanstack/react-query";
import CloseIcon from "../../../icons/CloseIcon.jsx";
import DatePicker from "../../global/DatePicker.jsx"
import ComboBox from '../../global/ComboBox.jsx'
import WritableGoogleMaps from '../../global/WritableGoogleMaps.jsx'
import MeetingTypeButton from "../Middle/Profile/Trade/MeetingTypeButton.jsx";
import { createTradeNotification } from '../../../redux/api/NotificationRequest.ts'

const CreateSection = ({data, openTradeDrawer, setOpenTradeDrawer, setToggleEdit}) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch();
  const { userInformation } = useSelector((state)=> state.authReducer.userData)
  const [ meetingType, setMeetingType] = useState("personal");
  const [ selectedDate, setSelectedDate ] = useState(new Date().toISOString());
  const [ startingTime, setStartingTime ] = useState("00:00");
  const [ endingTime, setEndingTime ] = useState("00:00");
  const [ title, setTitle ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ location, setLocation ] = useState('')
  const [ link, setLink ] = useState('')
  const [ toggle, setToggle ] = useState(false)
  const [ latLng, setLatLng ] = useState(null);
  const [ formattedDate, setFormattedDate ] = useState(null)
  const id = userInformation._id === data.senderId ? data.receiverId : data.senderId
  const currentDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(currentDate.getDate() + 1); 
  const nextDate = new Date();
  nextDate.setDate(currentDate.getDate() + 2); 


  const handleClearForm = () =>{

    setSelectedDate(null)
    setMeetingType('')
    setTitle('')
    setMessage('')
    setLink('')
    setLocation('')
    setToggle(false)
    
  }

  useEffect(() => {
    dispatch(fetchProfileInfo(id));
  }, [id]);



  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleSubmit  = async () => {


    const newTradeData = {
        senderId: userInformation._id,
        receiverId: id,
        title: title,
        message: message,
        meetingType: meetingType,
        location:{
          address: location,
          lat: latLng?.lat,
          lng: latLng?.lng
        },
        link: link,
        date: selectedDate,
        time:  startingTime + " — " + endingTime,
    }
    try {
      const res = await createTrade(id, newTradeData)
      const newNotificationData = {
        senderId: userInformation._id,
        entityId: res.data,
        type:"tradeRequest",
        text:"sent you a trade request",
      } 
      await createTradeNotification(id, newNotificationData)
    } catch (error) {
      console.log(error)
    }
    setOpenTradeDrawer((prev)=>!prev)
    queryClient.refetchQueries(['allTrades'])
    queryClient.refetchQueries(['userChats'])
  }


  const generateTimes = () => {
    const time = [];
    for (let hour = 8; hour <= 20; hour++) { 
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const hourFormatted = hour12 < 10 ? hour12.toString().replace(/^0/, '') : hour12;
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === 20 && minute > 0) {
          break;
        }
        const minuteFormatted = minute === 0 ? '00' : minute;
        const period = hour < 12 ? 'AM' : 'PM';
        time.push({ name: `${hourFormatted}:${minuteFormatted} ${period}` });
      }
    }
    return time;
  };


  const generateStartingTime = () => {
    const times = generateTimes();
    if (endingTime) {
      const endTimeIndex = times.findIndex((time) => time.name === endingTime);
      return times.slice(0, endTimeIndex);
    }
    return times;
  };

  const generateEndingTime = () => {
    const times = generateTimes();
    if (startingTime) {
      const startTimeIndex = times.findIndex((time) => time.name === startingTime);
      return times.slice(startTimeIndex + 1);
    }
    return times;
  };

  const handleMeetingType = (meetingType) => {
    setMeetingType(meetingType);
  };

  const isDisabled = !meetingType  && !date && !time && !title && !message

  return (
    <div className="flex flex-col pl-6 pr-4 py-10 transition-all relative">
      <div className="flex items-center justify-start">          
        <button 
          className=" w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 "
          onClick={() => setOpenTradeDrawer((prev) => !prev)}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="ml-1.5 w-4 h-4  ring-[7px]  ring-Primary rounded-md bg-transparent mt-12">
      </div>

      <div className="mt-6 flex flex-col">
        <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium">
          Meeting Type
        </span>
        <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
          Choose between In-Person and Virtual Exchanges.
        </span>
        <div className="flex mt-4 gap-4 ">
          <MeetingTypeButton
            type="personal"
            setToggle={() => handleMeetingType('personal')}
            toggle={meetingType === 'personal'}
          />
          <MeetingTypeButton
            type="virtual"
            setToggle={() => handleMeetingType('virtual')}
            toggle={meetingType === 'virtual'}
          />
        </div>
      </div>



      <div className="mt-6 flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium">
              {meetingType === 'virtual' ? 'Link' : 'Location'}
            </span>
            <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
              {meetingType === 'virtual' ? 'Attach the link of the meeting' : 'Pin the meeting Location'}.
            </span>
          </div>
        </div>        
        <div className="my-4 ring-gray/40 dark:backdrop-blur-md dark:bg-lightBlack/30 ring-1 dark:ring-darkGray  rounded-2xl pb-2 pt-1 px-4">
          {meetingType === 'virtual' ? (
            <textarea 
              className="mt-2 h-10 bg-transparent w-full outline-none text-sm resize-none  dark:placeholder:text-darkWhite dark:text-white2"
              placeholder="Web Address"
              maxLength={256}
              onInput={autoResize}
              onChange={(e) => setLink(e.target.value)}
              value={link}
            />
          ) : (
            <>
              {openTradeDrawer &&
                <div aria-hidden={openTradeDrawer}>
                  <WritableGoogleMaps setLocation={setLocation} latLng={latLng} setLatLng={setLatLng}/>
                </div>
              }
          
              <textarea 
              className="mt-2 h-10 bg-transparent w-full outline-none text-sm resize-none  dark:placeholder:text-darkWhite dark:text-white2"
              placeholder="Address"
              maxLength={256}
              onInput={autoResize}
              onChange={(e) => (setLocation(e.target.value))}
              value={location}
              />
            </>
            )
          }
        </div>
      </div>





      <div className=" flex flex-col">
        <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium">
          Date
        </span>
        <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
        Select a date for the meeting.
        </span>
        <div className="flex gap-4 mt-4 z-10 w-">
          <div className="items-center flex justify-center ring-gray/40 dark:backdrop-blur-md dark:bg-lightBlack/30 ring-1 dark:ring-darkGray  rounded-xl ">
            <DatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} setFormattedDate={setFormattedDate} formattedDate={formattedDate}/>
          </div>
        </div>

        <span className="font-main text-lg font-semibold text-darkBlue dark:text-white2 dark:font-medium mt-4">
          Time
        </span>
        <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
          Select a time for the meeting.
        </span>
        <div className="flex gap-4 mt-4">
          <div className="items-center flex justify-center ring-gray/40 dark:backdrop-blur-md dark:bg-lightBlack/30 ring-1 dark:ring-darkGray  rounded-xl ">
            <div className="w-[8rem] p-4">
              <ComboBox setState={setStartingTime} state={startingTime} list={generateStartingTime()} />
            </div>
            <span className="text-darkBlue dark:text-darkWhite">—</span>
            <div className="w-[8rem] p-4">
              <ComboBox setState={setEndingTime} state={endingTime} list={generateEndingTime()} />
            </div>
          </div>

        </div>
      </div>

      <div className="mt-6 flex flex-col">
        <span className="font-main text-xl font-semibold text-darkBlue dark:text-white2">
          Message
        </span>
        <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
          Send a formal letter expressing your intent to trade skills.
        </span>
        <div className="rounded-xl ring-gray/40 dark:ring-darkGray ring-1 px-6 py-4 mt-4">
          <input
            type="text"
            className="font-main placeholder:font-medium w-full text-md dark:text-white2 dark:placeholder:text-darkWhite bg-transparent h-8 outline-none mb-2 font-semibold"
            placeholder="Subject"
            maxLength={64}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="resize-none font-main w-full text-sm dark:text-white2 dark:placeholder:text-darkWhite bg-transparent h-10 outline-none leading-5"
            placeholder="Body..."
            maxLength={2048}
            onInput={autoResize}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      <div className="flex items-center justify-end mt-12 gap-2">
        <button className="bg- font-main text-darkBlue  py-2 px-4 dark:text-darkWhite text-sm" onClick={() => { setToggleEdit("View"); handleClearForm()}}>Cancel</button>
        <button 
          className={`${isDisabled ? 'bg-Primary cursor-not-allowed' : 'bg-lightGray dark:bg-darkWhite'} font-main text-white rounded-xl py-2 px-4 text-sm`}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Send Proposal
        </button>
      </div>
    </div>
  )
}

export default CreateSection