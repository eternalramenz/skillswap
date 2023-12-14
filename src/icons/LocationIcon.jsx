import React from 'react'

const LocationIcon = ({colors}) => {
  return (
    <div>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 24 24"
        style={{ enableBackground: 'new 0 0 24 24' }}
        xmlSpace="preserve"
        width="24"
        height="24"
        className="w-5 h-5"
      >
        <path
          className="dark:fill-darkWhite fill-gray"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12,22c4-4,8-7.6,8-12c0-4.4-3.6-8-8-8c-4.4,0-8,3.6-8,8C4,14.4,8,18,12,22z"
        />
        <path
          className="dark:fill-lightBlack dark:stroke-lightBlack fill-white stroke-white dark:stroke-2 stroke-1"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12,13c1.7,0,3-1.3,3-3c0-1.7-1.3-3-3-3s-3,1.3-3,3C9,11.7,10.3,13,12,13z"
        />
      </svg>
    </div>
  )
}

export default LocationIcon