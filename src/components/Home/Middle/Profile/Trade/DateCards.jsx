import React from 'react';

const DateCards = ({ day, date, handleDateSelect, rawDate, uid, state}) => {

  return (
    <button
      onClick={()=> { handleDateSelect(rawDate, uid)}}
      className={`transition-all ease-in-out flex flex-col w-full h-full py-2  rounded-xl items-center  ring-1  ${state ? ' shadow-2xl ring-Primary shadow-Primary bg-Primary dark:bg-Primary':'ring-gray/40 bg-slate-50 dark:bg-darkGray/40  dark:ring-darkGray'}`}
    >
      <span className={`font-main text-sm  ${state ? 'text-white' :'text-darkBlue dark:text-darkWhite'}`}>{day}</span>
      <span className={`font-main text-lg font-medium ${state ? 'text-white': 'text-darkBlue dark:text-white2'} `}>{date}</span>
    </button>
  );
};

export default DateCards;
