import React from 'react'
import ComboBox from '../../global/ComboBox.jsx'
const TradeDashboard = ({setActiveTab, activeTab}) => {
  const list = [
    { name: "All"},
    { name: "Accepted"},
    { name: "Invitations"},
    { name: "Requests"},
    { name: "Cancelled"},
    { name: "Completed"},
  ]
  return (
    <div className="relative w-full  max-w-[42rem] z-10">
      <div className="w-full sticky top-0 h-16"></div>
      <div className="bg-white rounded-2xl mt-6 shadow-xl p-4 shadow-slate-100  ring-1 ring-lightGray  dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray"> 
        <span className="text-2xl font-main text-darkBlue font-semibold dark:text-white2 ">Trades Manager</span>
        
        {/* <div className="w-full h-20 justify-between flex items-center my-4">

          <div className="flex flex-col w-full gap-2">
            <span className="text-sm font-main font-medium text-gray dark:text-darkWhite">Total Trades</span>
            <span className="text-2xl font-main font-medium text-darkBlue dark:text-white2">12</span>
          </div>

          <div className="w-12 h-full">
            <div className="h-[80%] w-[1px] bg-lightGray dark:bg-darkGray "></div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <span className="text-sm font-main font-medium text-gray dark:text-darkWhite">Ratings</span>
            <span className="text-2xl font-main font-medium text-darkBlue dark:text-white2">4.5</span>
          </div>

          <div className="w-12 h-full">
            <div className="h-[80%] w-[1px] bg-lightGray dark:bg-darkGray "></div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <span className="text-sm font-main font-medium text-gray dark:text-darkWhite">Testimonials</span>
            <span className="text-2xl font-main font-medium text-darkBlue dark:text-white2">6</span>
          </div>

        </div> */}

        <div className="flex flex-col gap-2 w-1/3">
          <span className="font-main text-sm dark:text-white2">Filters</span>
          <ComboBox setState={setActiveTab} state={activeTab} list={list}/>
        </div>
      </div>
    </div> 
  )
}

export default TradeDashboard