import { useEffect, useState } from "react";
import { formatDateWithOrdinalNumber } from '../../../constants/DateConverters.ts'
import { useQueryClient } from '@tanstack/react-query'
import { editTrade, reproposeTrade, rescheduleTrade} from "../../../redux/api/TradeRequest.ts";
import { createTradeNotification } from "../../../redux/api/NotificationRequest.ts";
import { useSelector } from "react-redux";
import CloseIcon from "../../../icons/CloseIcon.jsx";
import DatePicker from "../../global/DatePicker.jsx"
import ComboBox from '../../global/ComboBox.jsx'
import WritableGoogleMaps from '../../global/WritableGoogleMaps.jsx'
import MeetingTypeButton from "../Middle/Profile/Trade/MeetingTypeButton.jsx";

const EditSection = ({ data,  setOpenTradeDrawer, setToggleEdit, toggleEdit}) => {
  const queryClient = useQueryClient()
  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  const [start, last] = data.time.split(" — ");  
  const [ meetingType, setMeetingType] = useState(data.meetingType);
  const [ selectedDate, setSelectedDate ] = useState(new Date(data.date));
  const [ startingTime, setStartingTime ] = useState(start);
  const [ endingTime, setEndingTime ] = useState(last);
  const [ title, setTitle ] = useState(toggleEdit === "Repropose" || toggleEdit === "Reschedule"? "": data.messageData.title)
  const [ message, setMessage ] = useState(toggleEdit === "Repropose"|| toggleEdit === "Reschedule" ? "": data.messageData.content)
  const [ location, setLocation ] = useState(data.location.address)
  const [ link, setLink ] = useState(data.link)
  const [ latLng, setLatLng ] = useState({
    lat: data.location.lat || null,
    lng: data.location.lng || null
  });
  const [ formattedDate, setFormattedDate ] = useState(formatDateWithOrdinalNumber(new Date(data.date)))

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
  }


  
  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleEdit = async () => {

    const newEditedData = {
        _id: data._id,
        senderId: data.senderId,
        receiverId: data.receiverId,
        tradeId: data.tradeId,
        messageId: data.messageData.messageId,
        meetingType: meetingType,
        location:{
          address: meetingType === "personal" ? location : null,
          lat: meetingType === "personal" ?  latLng.lat : null,
          lng: meetingType === "personal" ? latLng.lng :  null
        },
        link: meetingType === "virtual" ? link : null,
        date: selectedDate,
        time:  startingTime + " — " + endingTime,
        title: title,
        message: message,
    }
    const newNotificationData = {
      senderId: data.senderId,
      entityId: data.tradeId,
      type:"tradeEdit",
      text:"edited their trade request",
    } 
    try {
      await editTrade(newEditedData)
      await createTradeNotification(data.receiverId, newNotificationData)
      queryClient.invalidateQueries(['existingSchedule']);
      queryClient.invalidateQueries(['allTrades'])
      queryClient.invalidateQueries(['userChats'])
      queryClient.invalidateQueries(['tradeLogs']);
      queryClient.invalidateQueries(['invitedTrades']);

    } catch (error) {
      console.log(error)
    }
    setOpenTradeDrawer((prev)=>!prev)
    setToggleEdit("View")
  }

  const handleRepropose = async () => {

    const newProposedData = {
        _id: data._id,
        senderId: data.receiverId,
        receiverId: data.senderId,
        tradeId: data.tradeId,
        messageId: data.messageData.messageId,
        meetingType: meetingType,
        location:{
          address: meetingType === "personal" ? location : null,
          lat: meetingType === "personal" ?  latLng.lat : null,
          lng: meetingType === "personal" ? latLng.lng :  null
        },
        link: meetingType === "virtual" ? link : null,
        date: selectedDate,
        time:  startingTime + " — " + endingTime,
        title: title,
        message: message,
    }

    const newNotificationData = {
      senderId: data.receiverId,
      entityId: data.tradeId,
      type:"tradeReproposed",
      text:"sent you another trade request",
    } 
    try {
      const res = await reproposeTrade(newProposedData)
      await createTradeNotification( data.senderId ,newNotificationData)
      queryClient.invalidateQueries(['allTrades'])
      queryClient.invalidateQueries(['existingSchedule']);
      queryClient.invalidateQueries(['upcomingSchedules']);
      queryClient.invalidateQueries(['tradeLogs']);
      queryClient.invalidateQueries(['invitedTrades']);
    } catch (error) {
      console.log(error)
    }
    setOpenTradeDrawer((prev)=>!prev)
    setToggleEdit("View")
  }

  const handleReschedule = async () => {

    const newRescheduledData = {
        _id: data._id,
        senderId: userInformation._id,
        receiverId: userInformation._id === data.receiverId ? data.senderId : data.receiverId,
        tradeId: data.tradeId,
        messageId: data.messageData.messageId,
        meetingType: meetingType,
        location:{
          address: meetingType === "personal" ? location : null,
          lat: meetingType === "personal" ?  latLng.lat : null,
          lng: meetingType === "personal" ? latLng.lng :  null
        },
        link: meetingType === "virtual" ? link : null,
        date: selectedDate,
        time:  startingTime + " — " + endingTime,
        title: title,
        message: message,
    }
    const newNotificationData = {
      senderId: userInformation._id,
      entityId: data.tradeId,
      type:"tradeRescheduled",
      text:"rescheduled your upcoming meeting",
    } 
    try {
      const res = await rescheduleTrade(newRescheduledData)
      await createTradeNotification(userInformation._id === data.receiverId ? data.senderId : data.receiverId, newNotificationData)
      queryClient.invalidateQueries(['allTrades'])
      queryClient.invalidateQueries(['existingSchedule']);
      queryClient.invalidateQueries(['upcomingSchedules']);
      queryClient.invalidateQueries(['acceptedTrades']);
      queryClient.invalidateQueries(['invitedTrades']);

      queryClient.invalidateQueries(['tradeLogs']);
    } catch (error) {
      console.log(error)
    }
    setOpenTradeDrawer((prev)=>!prev)
    setToggleEdit("View")
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
    setMeetingType(meetingType)
  }



  const isDisabled = !selectedDate || startingTime === "00:00" || endingTime === "00:00" || !title || !message || 
  (meetingType === 'virtual' && !link) || (meetingType === 'personal' && !location);

  return (
    <div className=" flex flex-col pl-6 pr-4 py-10 transition-all relative">
      <div className="flex items-center justify-start">          
        <button 
          className=" w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 "
          onClick={() => {setOpenTradeDrawer((prev) => !prev);setToggleEdit("View")}}
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
              { data && 
                <div aria-hidden={data}>
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
          { toggleEdit === "Edit" && "Message"}
          { toggleEdit === "Repropose" || toggleEdit === "Reschedule" && "Reason"}
        </span>
        <span className="font-main text-sm text-gray dark:text-darkWhite leading-0">
          { toggleEdit === "Edit" && "Send a formal letter expressing your intent to trade skills."}
          { toggleEdit === "Repropose" && "Compose a formal letter explaining the reasons for your request to modify the meeting details"}
          { toggleEdit === "Reschedule" && "Compose a formal letter explaining the reasons for your request to reschedule the meeting"}
        </span>
        <div className="rounded-xl ring-gray/40 dark:ring-darkGray ring-1 px-6 py-4 mt-4">
          <input
            type="text"
            className="font-main placeholder:font-medium w-full text-md dark:text-white2 dark:placeholder:text-darkWhite bg-transparent h-8 outline-none mb-2 font-semibold"
            placeholder="Subject"
            maxLength={64}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="resize-none font-main w-full text-sm dark:text-white2 dark:placeholder:text-darkWhite bg-transparent h-10 outline-none leading-5"
            placeholder="Body..."
            maxLength={2048}
            onInput={autoResize}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
      </div>
      <div className="flex items-center justify-end mt-12 gap-2">
        <button className="bg- font-main text-darkBlue  py-2 px-4 dark:text-darkWhite text-sm" onClick={() => {setToggleEdit("View") ; handleClearForm()}}>Discard</button>
        <button 
          className={`${isDisabled ? 'bg-lightGray dark:bg-darkWhite cursor-not-allowed' : 'bg-Primary'} font-main text-white rounded-xl py-2 px-4 text-sm`}
          disabled={isDisabled}
          onClick={() => {
            if (toggleEdit === "Edit") {
              handleEdit();
            } else if (toggleEdit === "Repropose") {
              handleRepropose();
            } else {
              handleReschedule();
            }
          }}
        >
          {toggleEdit === "Edit" && "Save"}
          {toggleEdit === "Repropose" && "Send Proposal"}
          {toggleEdit === "Reschedule" && "Reschedule Meeting"}
        </button>
      </div>
    </div>

  )
}

export default EditSection