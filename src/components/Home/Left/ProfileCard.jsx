import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
const ProfileCard = () => {
  const { userInformation } = useSelector((state) => state.authReducer.userData)
  return (
    <Link to={`/profile/${userInformation._id}`}>
      <div className="flex flex-col  mb-4 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  ring-1 ring-gray/20 bg-card rounded-2xl h-24 justify-center p-5 shadow-xl shadow-zinc-200  w-[20rem] dark:shadow-black/20 dark:ring-darkGray">
        <div className="flex items-center pl-2">
          <img src={userInformation.profilePicture} alt="" className="rounded-xl w-12 h-12"/>
          <div className="flex flex-col p-5">
            <span className="font-main  font-semibold text-lg dark:text-white2">{userInformation.firstName + " " + userInformation.lastName}</span>
            <span className="font-main  text-gray text-sm dark:text-zinc-400">{userInformation.expertise}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProfileCard