import { useState, useEffect, useRef } from 'react';
import Plus from '../../../../../icons/AddIcon.jsx';
import ComboBox from '../../../../global/ComboBox.jsx';

const TimePicker = ({ setState }) => {
  const timePickerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startingTime, setStartingTime] = useState(null);
  const [endingTime, setEndingTime] = useState(null);
  console.log(startingTime);
  console.log(endingTime);

  const generateTimes = () => {
    const time = [];
    for (let hour = 8; hour <= 19; hour++) { 
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const hourFormatted = hour12 < 10 ? hour12.toString().replace(/^0/, '') : hour12;
      for (let minute = 0; minute < 60; minute += 15) {
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

  const handleClick = (event) => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative transition-all h-16 justify-center gap-2 ease-in-out ring-gray/40 bg-slate-50 dark:bg-darkGray/40  dark:ring-darkGray py-2 rounded-xl  ring-1  flex  items-center  w-full ' ref={timePickerRef}>
      <button
        className="flex gap-2"
        onClick={(e) => handleClick(e)}
      >
        <div className="w-6 h-6 ">
          <Plus color="darkBlue" />
        </div>
        <span className="font-main text-md font-medium dark:text-white2">Custom</span>
      </button>
      {isOpen && (
        <div className="items-center flex justify-center dark:backdrop-blur-md dark:bg-lightBlack/30 ring-1 dark:ring-darkGray z-10 absolute right-0 -bottom-[5.5rem] rounded-xl ">
          <div className="w-[8rem] p-4">
            <ComboBox setActiveTab={setStartingTime} list={generateStartingTime()} />
          </div>
          <span className="text-darkBlue dark:text-darkWhite">—</span>
          <div className="w-[8rem] p-4">
            <ComboBox setActiveTab={setEndingTime} list={generateEndingTime()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
