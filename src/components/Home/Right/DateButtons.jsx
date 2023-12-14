import { fetchUpcomingSchedule } from '../../../redux/api/TradeRequest.ts'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const DateButtons = ({ day, date, currentDay, fullDate,rawDate, setState, state, setSchedules}) => {
  const { userInformation } = useSelector((state) => state.authReducer.userData);

  const fetchSchedules = async () => { 
    const { data } = await fetchUpcomingSchedule(userInformation._id, rawDate)
    return data;
  }

  const { data, status } = useQuery(['upcomingSchedules', rawDate], fetchSchedules);


  useEffect(() => {
    const today = new Date();
    const todayFormatted = today.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  
    if (fullDate === todayFormatted) {
      setSchedules(data);
      setState(fullDate);
    }
  }, [data, fullDate]);

  const handleSelect = async() => {
    setSchedules(data)
    setState(fullDate)
  }

  return (  
    <button 
      className={` ${state ? 'bg-Primary text-white shadow-sm shadow-Primary/40 ring-Primary ' : 'bg-white text-darkBlue dark:bg-transparent  ring-gray/40'} ring-1 h-16 w-12 rounded-lg dark:ring-darkGray  flex flex-col p-2 items-center justify-center flex-shrink-0 relative`}
      onClick={handleSelect}
    >
      <span className={`${state ? 'text-white':'dark:text-darkWhite text-gray'} text-sm font-main font-medium `}>{day}</span>
      <span className="font-main text-lg font-medium  dark:text-white2 ">{date}</span>
      {fullDate === currentDay && <div className=  "bg-rose-500  w-2 h-2 rounded-sm absolute -bottom-1"></div>}
      {data?.length > 0 && <div className=  "bg-green-500  w-2 h-2 rounded-sm absolute -bottom-1"></div>}
    </button>
  )
}

export default DateButtons