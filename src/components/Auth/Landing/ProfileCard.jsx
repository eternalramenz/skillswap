import React from 'react'

const ProfileCard = () => {
  return (
    <div className="flex flex-col  mb-4 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  ring-1 ring-gray/20 bg-card rounded-2xl h-24 justify-center p-5 shadow-xl shadow-zinc-200  dark:shadow-black/20 dark:ring-darkGray">
      <div className="flex items-center pl-2">
        <img src="https://images.pexels.com/photos/1578877/pexels-photo-1578877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="rounded-xl w-12 h-12 object-cover"/>
        <div className="flex flex-col p-5">
          <span className="font-main  font-semibold text-lg dark:text-white2">Irene Wong</span>
          <span className="font-main  text-gray text-sm dark:text-zinc-400">Network Administrator</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard