import React, { useState } from 'react';
import ChevronLeft from "../../icons/ChevronLeft.jsx"
import ChevronRight from "../../icons/ChevronRight.jsx"

const Calendar = ({ setFormattedDate, setSelectedDate, selectedDate}) => {

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const initialYear = today.getFullYear() - 18;
  const [date, setDate] = useState(new Date(initialYear, today.getMonth(), 1));
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();


  const prevMonth = () => {
    setDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    const nextMonthDate = new Date(currentYear, currentMonth + 2, 0);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  
    if (nextMonthDate > eighteenYearsAgo) {
      return;
    }
  
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
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (selectedDate > eighteenYearsAgo) {
      return;
    }

    const isoDate = selectedDate.toISOString();
    const formattedDay = getOrdinalSuffix(selectedDate.getDate());
    const formattedDate = `${months[selectedDate.getMonth()]} ${formattedDay}, ${selectedDate.getFullYear()}`;

    setSelectedDate(isoDate);
    setFormattedDate(formattedDate);
  };

  const prevYear = () => {
    setDate(new Date(currentYear - 1, currentMonth, 1));
  };

  const nextYear = () => {
    const nextYear = currentYear + 1;
    const eighteenYearsAgo = new Date().getFullYear() - 18;
    
    if (nextYear > eighteenYearsAgo) {
      return;
    }
  
    setDate(new Date(nextYear, currentMonth, 1));
  };

  
  return (
    <div className=" p-1 ">
      <div className="flex font-main dark:text-white2 items-center px-6 pt-4 pb-1 justify-between">
      <button onClick={prevYear} className="rounded-md ring-1 ring-lightGray dark:ring-darkGray w-6 h-6 flex items-center justify-center p-1.5">
          <ChevronLeft />
        </button>
        <button onClick={prevMonth} className="rounded-md ring-1 ring-lightGray dark:ring-darkGray w-8 h-8 flex items-center justify-center p-1.5">
          <ChevronLeft />
        </button>
        <div className="w-32 flex items-center justify-center">
          <span className="text-md font-main font-medium ">{months[currentMonth]} {currentYear}</span>
        </div>
        <button onClick={nextMonth} className="rounded-md ring-1 ring-lightGray dark:ring-darkGray w-8 h-8 flex items-center justify-center p-1.5">
          <ChevronRight />
        </button>
        <button onClick={nextYear} className="rounded-md ring-1 ring-lightGray dark:ring-darkGray w-6 h-6 flex items-center justify-center p-1.5">
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

          const eighteenYearsAgo = new Date();
          eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
          const isFutureDate = currentDate > today;
          const isLessThanEighteenYears = currentDate > eighteenYearsAgo;

          return (
            <button
              key={day + 1}
              onClick={() => handleDateClick(day + 1)}
              className={`dark:hover:bg-darkGray rounded-md text-sm flex items-center justify-center p-2 font-main w-8 h-8 ${
                isToday
                  ? 'dark:bg-darkWhite rounded-md items-center justify-center dark:text-white'
                  : selectedDate === isoDate
                  ? 'bg-Primary text-white rounded-md'
                  : isFutureDate || isLessThanEighteenYears
                  ? 'text-gray dark:text-darkWhite cursor-not-allowed' 
                  : 'dark:text-white2'
              }`}
              disabled={isFutureDate || isLessThanEighteenYears} 
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