import React, { useState, useEffect, useRef} from 'react';
import CalendarIcon from "../../icons/CalendarIcon.jsx"
import Calendar from './Calendar.jsx';
const DatePicker = ({setSelectedDate, selectedDate,  formattedDate, setFormattedDate}) => {
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
    <div className="p-4 relative w-[17rem] h-full items-center  justify-center flex rounded-lg " ref={datePickerRef}>
      <button
        className="  px-4 py-2 dark:ring-darkGray ring-1 ring-gray/40 rounded-lg w-full flex justify-start items-center gap-2"
        onClick={() => setShowDatePicker(prev => !prev)}
      >
        <div className="w-4 h-4">
          <CalendarIcon state={formattedDate}/>
        </div>
        <span className={` ${formattedDate ?  "text-darkBlue dark:text-white2 ": "text-gray dark:text-darkWhite"} text-sm font-main `}>
          {formattedDate ? formattedDate : "Pick a date"}
        </span>
      </button>
      {showDatePicker && (
        <div className="absolute z-10 w-full  rounded-lg bg-white backdrop-blur-lg dark:bg-lightBlack dark:backdrop-blur-sm ring-1 ring-gray/40 dark:ring-darkGray right-0 top-[5rem]">
          <Calendar setFormattedDate={setFormattedDate} setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
