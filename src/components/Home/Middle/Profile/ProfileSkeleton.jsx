
const ProfileSkeleton = () => {
  return (
    <div className=" bg-card dark:bg-lightBlack/70 rounded-2xl mt-6  mb-2 w-[42rem]"> 
      <div className="relative flex flex-col items-center justify-center pb-4 custom-shimmer dark:bg-lightBlack bg-gray/30 h-[12rem] rounded-t-2xl  ">
        <div className="flex relative items-center justify-center ">
          <div className="absolute rounded-[3rem] p-1 w-40 h-40 custom-shimmer dark:bg-lightBlack bg-lightGray mt-[12rem] ">
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center mt-2 h-[10rem]">
        <div className="flex mb-4 gap-[22rem]">
          <div className="flex flex-col items-center mt-6 w-16 dark:bg-lightBlack bg-lightGray rounded-lg custom-shimmer ">&nbsp;</div>
          <div className="flex flex-col items-center mt-6 w-24 dark:bg-lightBlack bg-lightGray rounded-lg custom-shimmer"></div>
        </div>
        <div className="flex flex-col items-center justify-center w-32 dark:bg-lightBlack bg-lightGray mt-8 rounded-lg custom-shimmer">&nbsp;</div>
      </div>
    </div>
  )
}

export default ProfileSkeleton