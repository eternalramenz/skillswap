import { useState, useRef, useEffect } from 'react';
import { Link } from'react-router-dom'
import { useSelector } from 'react-redux';
import DateButtons from './DateButtons.jsx';
import ChevronLeft from '../../../icons/ChevronLeft.jsx';
import ChevronRight from '../../../icons/ChevronRight.jsx';
import { useGlobalContext } from '../../../contexts/GlobalContext.jsx';

const ScheduleTracker = ({setOpenTradeDrawer, setData}) => {
  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  const { schedules, setSchedules } = useGlobalContext()
  // const [ schedules, setSchedules ] = useState([])
  const scrollRef = useRef(null);
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  const [ currentYear, setCurrentYear ] = useState(new Date().getFullYear());
  const [ currentMonth, setCurrentMonth ] = useState(new Date().getMonth());
  const [ selectedDate, setSelectedDate ] = useState(currentDay);  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateDateInfo = (n) => {
    const dateInfo = [];
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  
    for (let i = 0; i < n; i++) {
      const currentDate = new Date(firstDayOfMonth);
      currentDate.setDate(firstDayOfMonth.getDate() + i);
  
      // Skip past dates
      if (currentDate < new Date() && !isSameDay(currentDate, new Date())) {
        continue;
      }
  
      const options = { month: 'numeric', day: 'numeric', year: 'numeric'};
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      const date = currentDate.toLocaleDateString('en-US', { day: 'numeric' });
      const fullDate = currentDate.toLocaleString('en-US', options);
      
      const rawDay = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' +  ('0' + currentDate.getDate()).slice(-2);
  
      dateInfo.push({
        day,
        date,
        fullDate,
        rawDate: rawDay
      });
    }
  
    return dateInfo;
  };
  
  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);

  const dateInfo = generateDateInfo(daysInCurrentMonth);


  const handleNavigateLeft = () =>{  
    if (currentYear < new Date().getFullYear() || (currentYear === new Date().getFullYear() && currentMonth  < new Date().getMonth())) return null;    
    if (scrollRef.current.scrollLeft === 0) {
      if (currentMonth === 0) {
        setCurrentYear(currentYear - 1);
        setCurrentMonth(11);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    } else {
      scrollRef.current.scrollLeft -= 250;
    }
  }
  
  const handleNavigateRight = () => {
    if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth) {
      if (currentMonth === 11) {
        setCurrentYear(currentYear + 1);
        setCurrentMonth(0);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
      scrollRef.current.scrollLeft = 0;
    } else {
      scrollRef.current.scrollLeft += 250;
    }
  };
  useEffect(() => {
    const todayIndex = dateInfo.findIndex(info => info.fullDate === currentDay);
    if (todayIndex !== -1 && scrollRef.current) {
      const targetElement = scrollRef.current.children[todayIndex + 3];
      if (targetElement) {
        targetElement.scrollIntoView(); 
      }
    }
  }, [dateInfo, currentDay]);

  
  return (
    <div className="flex flex-col gap-4">
      <div className='flex-col bg-white rounded-2xl flex ring-1 ring-lightGray gap-2 p-4 shadow-2xl shadow-zinc-200 dark:ring-darkGray dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:shadow-black/20 '>
        <div className="flex justify-between items-center ">
          <span className="font-main text-darkBlue font-semibold dark:text-white2 text-lg dark:font-medium">{monthNames[currentMonth] + " " + currentYear}</span>
          <div className="flex gap-2 items-center ">
            <button onClick={handleNavigateLeft} className="dark:bg-darkGray dark:ring-darkGray rounded-xl w-7 h-7 shadow-2xl shadow-lightBlack bg-white flex items-center justify-center ring-1 ring-lightGray p-1">
              <ChevronLeft />
            </button>
            <button onClick={handleNavigateRight} className="dark:bg-darkGray dark:ring-darkGray rounded-xl w-7 h-7 shadow-2xl shadow-lightBlack bg-white   flex items-center justify-center ring-1 ring-lightGray p-1">
              <ChevronRight />
            </button>
          </div>
          
        </div>
        <div className="flex gap-4 py-2 overflow-y-hidden px-1 overflow-x-scroll" id="storiesScrollBar" ref={scrollRef}>
          {dateInfo.map((info, index) => (
            <DateButtons
              day={info.day}
              date={info.date}
              currentDay={currentDay}
              fullDate={info.fullDate}
              rawDate={info.rawDate}
              setState={setSelectedDate}
              state={selectedDate === info.fullDate}
              setSchedules={setSchedules}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="items-center justify-center flex w-full flex-col gap-6 my-2"> 

        {schedules?.slice(0, 2).map((trades, index) => (
          <button 
            className='w-full bg-white dark:lightBlack flex-col rounded-2xl flex ring-1 ring-lightGray gap-2 p-4 shadow-2xl shadow-zinc-200 dark:ring-darkGray dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:shadow-black/20 '
            key={index}
            onClick={()=>{
              setOpenTradeDrawer((prev)=>!prev)
              setData(trades)
            }}
          >
            <div className="flex gap-4 w-full items-center justify-center">
              <div className="h-full px-4 flex flex-col items-center justify-center gap-1">
                <span className="font-main text-sm font-medium dark:font-normal text-gray dark:text-darkWhite">
                  {new Date(trades.createdAt).toLocaleString('en-US', { weekday: 'short' })}
                </span>
                <span className="font-main text-lg font-semibold dark:font-medium text-darkBlue dark:text-white2">
                  {new Date(trades.createdAt).getDate()}
                </span>
              </div>

              <div className={`w-1 rounded-sm h-12 ${trades.meetingType === "virtual" ? "bg-sky-500" : "bg-green-500" }`}>

              </div>
              <div className="flex flex-col w-full justify-center">
                <div className="w-full flex flex-col items-start gap-1">
                  <span className="font-main text-lg font-semibold dark:font-medium text-darkBlue dark:text-white2">
                  {userInformation._id === trades.senderId 
                  ? trades.receiverData.expertise
                  : trades.senderData.expertise
                  }
                  </span>
                  
                  <div className="flex w-full items-center justify-start">
                    <span className="font-main text-sm font-medium text-gray dark:text-darkWhite">{trades.time.replace(/AM/g, ' ')}</span>
                    <span className="px-2 text-gray dark:text-darkWhite">&#8226;</span>

                    <div 
                      className={`rounded-lg px-2 py-1 w-20 flex items-center justify-center ${trades.meetingType === "virtual" ? "bg-sky-100 dark:bg-sky-800/20" : "bg-green-100 dark:bg-green-800/20" }`}
                    >
                      <span className={`font-main font-medium text-xs  ${trades.meetingType === "virtual" ? "text-sky-500" : "text-green-500" }`}>
                        {trades.meetingType === "virtual" ? "Virtual" : "Personal"}
                      </span>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </button>
        ))}
        {schedules?.length > 1 &&
          <Link to='/trade'>
            <button className="mb-4 bg-Primary flex items-center justify-center px-4 py-2 rounded-lg ">
              <span className="font-main text-sm text-white ">View all schedule</span>
            </button>
          </Link>
        }
      </div>
    </div>
  )
}

export default ScheduleTracker