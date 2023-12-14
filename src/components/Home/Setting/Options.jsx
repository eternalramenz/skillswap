import React from 'react'
import ArmorIcon from '../../../icons/ArmorIcon.jsx'
import AccountIcon from '../../../icons/AccountIcon.jsx'
import TrashIcon from '../../../icons/TrashIcon.jsx'

const Options = ({activeTab, setActiveTab}) => {
  return (
    <div className="w-full flex flex-col mt-6">
      <div className="w-full flex flex-col rounded-2xl px-4 py-2 gap-4  dark:bg-transparent">
        <button className="flex items-center justify-start gap-2 w-full" onClick={()=>setActiveTab("account")}>    
          <div className="w-6 h-6">
            <AccountIcon color={`${activeTab === "account" ? "fill-darkBlue stroke-darkblue dark:stroke-white2 dark:fill-white2" : "stroke-gray dark:stroke-darkWhite"}`}/>
          </div>
          <span className={`font-main text-md font-medium ${activeTab === 'account' ? 'text-darkBlue dark:text-white2' : 'text-gray dark:text-darkWhite'}`}>Account</span>
        </button>
        <button className="flex items-center justify-start gap-2 w-full" onClick={()=>setActiveTab("security")}>    
          <div className="w-6 h-6">
            <ArmorIcon color={`${activeTab === "security" ? "fill-darkBlue stroke-darkblue dark:stroke-white2 dark:fill-white2" : "stroke-gray dark:stroke-darkWhite"}`}/>
          </div>
          <span className={`font-main text-md font-medium ${activeTab === 'security' ? 'text-darkBlue dark:text-white2' : 'text-gray dark:text-darkWhite'}`}>Security</span>
        </button>
        {/* <button className="flex items-center justify-start gap-2 w-full mt-20">    
          <div className="w-6 h-6">
            <TrashIcon />
          </div>
          <span className="text-rose-500 font-main text-md font-medium">Delete Account</span>
        </button> */}
      </div>
    </div>
  )
}

export default Options