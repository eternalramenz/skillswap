import React from 'react'

const SkeletonPost = () => {
  return (
    <div className="flex flex-col p-4 bg-white shadow-2xl shadow-zinc-200 rounded-3xl gap-3 w-[42rem] mb-1">{/* Post */}


      <div className="flex items-center mt-2 justify-between">
        <div className="flex flex-row items-center pl-2">
          <div className="rounded-2xl w-16 h-16 bg-textbox custom-shimmer"></div>
          <div className="flex flex-col pl-4 gap-2">
          <div className="h-4 ml-2 rounded-md selection:px-2 py-1 flex items-center justify-center bg-skeleton w-20 custom-shimmer"></div>
          <div className="h-8 ml-2 rounded-md px-2 py-1 flex items-center justify-center bg-textbox w-48 custom-shimmer"></div>
          </div>  
        </div>
        <div className="w-12 h-8 bg-textbox rounded-xl custom-shimmer"></div>
      </div>
      

      <div className="w-full px-2 relative mt-4 mb-4 bg-textbox h-40 custom-shimmer-body" style={{borderRadius:'24px'}} >{/* Image */}

      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">{/* Post React */}
          <div className="w-12 h-8 bg-textbox rounded-xl custom-shimmer"></div>
          <div className="w-12 h-8 bg-textbox rounded-xl custom-shimmer"></div>
          <div className="w-12 h-8 bg-textbox rounded-xl custom-shimmer"></div>
        </div>
        <div>
          <div className="w-12 h-8 bg-textbox rounded-xl custom-shimmer"></div>
        </div>
      </div>

      <div className="">
        <span></span>
        <div>
          <span className="text-gray"></span>
        </div>
      </div>
    </div>
  )
}

export default SkeletonPost