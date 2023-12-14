import React from 'react'

const PortfolioSkeleton = () => {
  return (
  <div  className="w-full h-64 bg-white rounded-2xl mb-6 dark:bg-lightBlack dark:ring-darkGray">
    <div className="rounded-t-2xl overflow-clip bg-gray custom-shimmer ring-1 ring-lightGray dark:ring-darkGray dark:bg-lightBlack ">
      <div alt="" className="h-52 w-full object-cover "></div>
    </div>
    <div className="flex justify-between px-4 items-center w-full h-12">

      <div className="custom-shimmer h-6 w-40 rounded-lg bg-lightGray dark:bg-lightBlack ">

      </div>
      <div className="custom-shimmer h-6 w-16 rounded-lg bg-lightGray dark:bg-lightBlack ">

      </div>
    </div>
    </div>
  )
}

export default PortfolioSkeleton