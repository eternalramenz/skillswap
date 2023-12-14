import React, { useState } from 'react';
import ChevronLeft from "../../icons/ChevronLeft.jsx"
import ChevronRight from "../../icons/ChevronRight.jsx"

const Calendar = ({ setFormattedDate, setSelectedDate, selectedDate}) => {

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [date, setDate] = useState(new Date());
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const prevMonth = () => {
    setDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const getOrdinalSuffix = (day) => {
    if (day % 10 === 1 && day !== 11) {
      return day + 'st';
    } else if (day % 10 === 2 && day !== 12) {
      return day + 'nd';
    } else if (day % 10 === 3 && day !== 13) {
      return day + 'rd';
    } else {
      return day + 'th';
    }
  }

  const handleDateClick = (day) => {
    const selectedDate = new Date(Date.UTC(currentYear, currentMonth, day));
    const isoDate = selectedDate.toISOString();
    const formattedDay = getOrdinalSuffix(day);
    const formattedDate = `${months[currentMonth]} ${formattedDay}, ${currentYear}`;
    setSelectedDate(isoDate);
    setFormattedDate(formattedDate);
  };

  
  const handlePrevMonthDateClick = (day) => {
    const selectedDate = new Date(Date.UTC(currentYear, currentMonth - 1, daysInPrevMonth - startDayIndex + day + 1));
    const isoDate = selectedDate.toISOString();
    const formattedDay = getOrdinalSuffix(selectedDate.getDate());
    const formattedDate = `${months[selectedDate.getMonth()]} ${formattedDay}, ${selectedDate.getFullYear()}`;
  
    setSelectedDate(isoDate);
    setFormattedDate(formattedDate);
  };

  
  const handleNextMonthDateClick = (day) => {
    const selectedDate = new Date(Date.UTC(currentYear, currentMonth + 1, day + 1));
    const isoDate = selectedDate.toISOString();
    const formattedDay = getOrdinalSuffix(selectedDate.getDate());
    const formattedDate = `${months[selectedDate.getMonth()]} ${formattedDay}, ${selectedDate.getFullYear()}`;
  
    setSelectedDate(isoDate);
    setFormattedDate(formattedDate);
  };

  
  return (
    <div className="">
      <div className="flex font-main dark:text-white2 items-center px-6 pt-4 pb-1  justify-between">
        <button onClick={prevMonth} className="rounded-md ring-1 ring-gray/40 dark:ring-darkGray w-8 h-8 flex items-center justify-center p-1.5">
          <ChevronLeft />
        </button>
        <span className="text-md font-main font-medium">{months[currentMonth]} {currentYear}</span>
        <button onClick={nextMonth} className="rounded-md ring-1 ring-gray/40 dark:ring-darkGray w-8 h-8 flex items-center justify-center p-1.5">
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 p-2 pb-4">
        {days.map(day => (
          <div key={day} className=" text-sm font-main  dark:text-white2  p-2 w-8 h-8 flex items-center justify-center">
            <span>{day}</span>
          </div>
        ))}

        {[...Array(startDayIndex).keys()].map(day => (
          <button
            key={`prev-${day}`}
            onClick={() => handlePrevMonthDateClick(day)}
            className="text-sm font-main text-gray dark:text-darkWhite w-8 h-8 p-2 flex items-center justify-center"
            disabled={true}
          >
            <span>{daysInPrevMonth - startDayIndex + day + 1}</span>
          </button>
        ))}
        {[...Array(daysInMonth).keys()].map(day => {
          const currentDate = new Date(currentYear, currentMonth, day + 1);
          const isoDate = currentDate.toISOString().split('T')[0];
          const isToday = today.toISOString().split('T')[0] === isoDate;
          const isPastDate = currentDate < today;
          return (
            <button
              key={day + 1}
              onClick={() => handleDateClick(day + 1)}
              className={`dark:hover:bg-darkGray rounded-md text-sm flex items-center justify-center p-2 font-main w-8 h-8 ${
                isToday
                  ? 'dark:bg-darkWhite rounded-md items-center justify-center dark:text-white'
                  : selectedDate === isoDate
                  ? 'bg-Primary text-white rounded-md'
                  : isPastDate
                  ? 'text-gray dark:text-darkWhite cursor-not-allowed' 
                  : 'dark:text-white2'
              }`}
              disabled={isPastDate} 
            >
              <span>{day + 1}</span>
            </button>
          );
        })}
        {[...Array((7 - (daysInMonth + startDayIndex) % 7) % 7).keys()].map(day => (
          <button
            key={`next-${day}`}
            onClick={() => handleNextMonthDateClick(day)}
            className="flex items-center justify-center p-2 text-sm font-main dark:text-darkWhite text-gray w-8 h-8"
          >
            <span>{day + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;