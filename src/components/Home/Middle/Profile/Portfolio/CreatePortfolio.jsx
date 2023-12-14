import React from 'react'
import AddIcon from '../../../../../icons/AddIcon.jsx'
const CreatePortfolio = (( {setOpenCreateDrawer} ) => {
  return (
    <div className="mb-2 w-full max-w-[42rem] flex flex-col items-center justify-center p-6 bg-white dark:shadow-black/20 shadow-xl shadow-zinc-200 ring-1 ring-lightGray rounded-2xl gap-2 dark:bg-lightBlack/70 dark:backdrop-blur-3xl dark:ring-darkGray">
      <button className="w-16 h-16 bg-sky-100/70 rounded-3xl items-center justify-center flex mb-4  dark:bg-blue-800/20" onClick={()=>setOpenCreateDrawer(prev => !prev)} >
        <div className=" bg-Primary rounded-xl flex items-center justify-center w-7 h-7">
          <div className="w-5 h-5">
            <AddIcon color="white"/>
          </div>
        </div>
      </button>
      <button className="py-2 px-4 rounded-xl bg-darkBlue mb-2 dark:bg-Primary" onClick={()=>setOpenCreateDrawer(prev => !prev)}>
        <span className="font-main text-sm text-white  font-medium dark:text-white">Showcase your talent</span>
      </button>
      <span className="font-main text-gray dark:text-darkWhite text-sm text-center">Share your skills and build your portfolio. Showcase your top talents, receive feedback, recognition, and be a part of a thriving community.</span>
    </div>
  )
})

export default CreatePortfolio