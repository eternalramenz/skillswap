import React from 'react'
import ChevronLeft from '../../../icons/ChevronLeft.jsx'
import ChevronRight from '../../../icons/ChevronRight.jsx'

const ScheduleTracker = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className='flex-col bg-white rounded-2xl flex ring-1 ring-lightGray gap-2 p-4 shadow-2xl shadow-zinc-200 dark:ring-darkGray dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:shadow-black/20 '>
        <div className="flex justify-between items-center ">
          <span className="font-main text-darkBlue font-semibold dark:text-white2 text-lg dark:font-medium">December 2023</span>
          <div className="flex gap-2 items-center ">
            <button className="dark:bg-darkGray dark:ring-darkGray rounded-xl w-7 h-7 shadow-2xl shadow-lightBlack bg-white flex items-center justify-center ring-1 ring-lightGray p-1">
              <ChevronLeft/>
            </button>
            <button className="dark:bg-darkGray dark:ring-darkGray rounded-xl w-7 h-7 shadow-2xl shadow-lightBlack bg-white   flex items-center justify-center ring-1 ring-lightGray p-1">
              <ChevronRight />
            </button>
          </div>
          
        </div>
        <div className="flex gap-4 py-2 overflow-y-hidden px-1 overflow-x-scroll" id="storiesScrollBar" >
          <button 
            className="bg-white text-darkBlue dark:bg-transparent  ring-gray/40 ring-1 h-16 w-12 rounded-lg dark:ring-darkGray  flex flex-col p-2 items-center justify-center flex-shrink-0 relative"
          >
            <span className="dark:text-darkWhite text-gray'} text-sm font-main font-medium">Thu</span>
            <span className="font-main text-lg font-medium  dark:text-white2 ">7</span>
            <div className=  "bg-rose-500  w-2 h-2 rounded-sm absolute -bottom-1"></div>
          </button>
          <button 
            className="bg-white text-darkBlue dark:bg-transparent  ring-gray/40 ring-1 h-16 w-12 rounded-lg dark:ring-darkGray  flex flex-col p-2 items-center justify-center flex-shrink-0 relative"
          >
            <span className="dark:text-darkWhite text-gray'} text-sm font-main font-medium">Fri</span>
            <span className="font-main text-lg font-medium  dark:text-white2 ">8</span>
          </button>
          <button 
            className="bg-white text-darkBlue dark:bg-transparent  ring-gray/40 ring-1 h-16 w-12 rounded-lg dark:ring-darkGray  flex flex-col p-2 items-center justify-center flex-shrink-0 relative"
          >
            <span className="dark:text-darkWhite text-gray'} text-sm font-main font-medium">Sat</span>
            <span className="font-main text-lg font-medium  dark:text-white2 ">9</span>
            <div className=  "bg-green-500  w-2 h-2 rounded-sm absolute -bottom-1"></div>
          </button>
          <button 
            className="bg-white text-darkBlue dark:bg-transparent  ring-gray/40 ring-1 h-16 w-12 rounded-lg dark:ring-darkGray  flex flex-col p-2 items-center justify-center flex-shrink-0 relative"
          >
            <span className="dark:text-darkWhite text-gray'} text-sm font-main font-medium">Sun</span>
            <span className="font-main text-lg font-medium  dark:text-white2 ">10</span>
          </button>
          <button 
            className="bg-white text-darkBlue dark:bg-transparent  ring-gray/40 ring-1 h-16 w-12 rounded-lg dark:ring-darkGray  flex flex-col p-2 items-center justify-center flex-shrink-0 relative"
          >
            <span className="dark:text-darkWhite text-gray'} text-sm font-main font-medium">Mon</span>
            <span className="font-main text-lg font-medium  dark:text-white2 ">11</span>
          </button>
          <button 
            className="bg-white text-darkBlue dark:bg-transparent  ring-gray/40 ring-1 h-16 w-12 rounded-lg dark:ring-darkGray  flex flex-col p-2 items-center justify-center flex-shrink-0 relative"
          >
            <span className="dark:text-darkWhite text-gray'} text-sm font-main font-medium">Tue</span>
            <span className="font-main text-lg font-medium  dark:text-white2 ">12</span>
            <div className=  "bg-green-500  w-2 h-2 rounded-sm absolute -bottom-1"></div>
          </button>
        </div>
        <div>
          <button 
            className='w-full bg-white dark:lightBlack mt-2 flex-col rounded-2xl flex ring-1 ring-lightGray gap-2 p-4 shadow-2xl shadow-zinc-200 dark:ring-darkGray dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:shadow-black/20 '
          >
            <div className="flex gap-4 w-full items-center justify-center">
              <div className="h-full pl-4 flex flex-col items-center justify-center gap-1">
                <span className="font-main text-sm font-medium dark:font-normal text-gray dark:text-darkWhite">
                  Sat
                </span>
                <span className="font-main text-lg font-semibold dark:font-medium text-darkBlue dark:text-white2">
                  9
                </span>
              </div>

              <div className="bg-sky-500 w-1 rounded-sm h-12">

              </div>
              <div className="flex flex-col w-full justify-center">
                <div className="w-full flex flex-col items-start gap-1">
                  <span className="font-main text-lg font-semibold dark:font-medium text-darkBlue dark:text-white2">
                    Astronaut
                  </span>
                  
                  <div className="flex w-full items-center justify-start">
                    <span className="font-main text-sm font-medium text-gray dark:text-darkWhite">8:00 - 9:00</span>
                    <span className="px-2 text-gray dark:text-darkWhite">&#8226;</span>

                    <div 
                      className="rounded-lg px-1 py-1 w-16 flex items-center justify-center bg-sky-100 dark:bg-sky-800/20"
                    >
                      <span className="font-main font-medium text-xs text-sky-500">
                        Virtual
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScheduleTracker