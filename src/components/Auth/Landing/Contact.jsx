import React from 'react'

const Contact = ({name, picture, message}) => {
  return (
    <button className="flex items-center pl-2 rounded-xl hover:bg-textbox cursor-pointer dark:hover:bg-black1 w-full" onClick={() => handleChatClick(contact)}>
      <div className="w-14 h-14 flex items-center">
        <img src={picture} alt="" className="w-12 h-12 object-cover rounded-xl" />
      </div>
      <div className="flex flex-grow px-4 items-center justify-between">
        <div className="flex items-start flex-col gap-1">
          <span className="font-main font-semibold text-md text-darkBlue truncate dark:text-white2 dark:font-medium">
            {name}
          </span>
          <span className="font-main text-sm text-gray max-w-[10rem] dark:text-darkWhite dark:font-medium truncate ">
            {message}
          </span>
        </div>
      </div>
    </button>
  )
}

export default Contact