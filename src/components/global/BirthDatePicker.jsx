import React, { useState, useEffect, useRef} from 'react';
import CalendarIcon from "../../icons/CalendarIcon.jsx"
import BirthDateCalendar from './BirthDateCalendar.jsx';
const BirthDatePicker = ({setSelectedDate, selectedDate,  formattedDate, setFormattedDate}) => {
  const datePickerRef = useRef(null)
  const [ showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative items-center  justify-center flex rounded-md w-full " ref={datePickerRef}>
      <button
        className="bg-white dark:bg-lightBlack  px-4 h-12 dark:ring-darkGray ring-1 ring-lightGray rounded-md w-full flex justify-start items-center gap-2"
        onClick={() => setShowDatePicker(prev => !prev)}
      >
        <div className="w-4 h-4">
          <CalendarIcon state={formattedDate}/>
        </div>
        <span className={` ${formattedDate ?  "text-darkBlue dark:text-white2 text-md": "text-gray dark:text-darkWhite text-sm"} t font-main `}>
          {formattedDate ? formattedDate : "Pick your birthday"}
        </span>
      </button>
      {showDatePicker && (
        <div className="absolute max-w-[20rem] z-10 w-full rounded-md bg-white  dark:bg-lightBlack dark:backdrop-blur-sm ring-1 ring-gray/40 dark:ring-darkGray left-0 top-[4rem]">
          <BirthDateCalendar setFormattedDate={setFormattedDate} setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
        </div>
      )}
    </div>
  );
};

export default BirthDatePicker;
