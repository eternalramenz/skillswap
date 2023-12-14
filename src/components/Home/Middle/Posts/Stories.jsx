import { useRef, useState, useEffect } from 'react';
import { StoriesData } from '../../../../data/StoriesData.js';
import leftArrow from '../../../../assets/leftArrow-black.svg';
import rightArrow from '../../../../assets/rightArrow-black.svg';
import plus from '../../../../assets/plus.svg';
import { useSelector } from 'react-redux';
const Stories = () => {
  const { userInformation } = useSelector((state) => state.authReducer.userData)
  const storiesRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)


  useEffect(() => {
    const onScroll = () => {
      if (storiesRef.current) {
        if (storiesRef.current.scrollLeft > 0) {
          setShowLeft(true);
        } else {
          setShowLeft(false);
        }
        if (
          storiesRef.current.scrollLeft ===
          storiesRef.current.scrollWidth - storiesRef.current.clientWidth
        ) {
          setShowRight(false);
        } else {
          setShowRight(true);
        }
      }
    };
  
    if (storiesRef.current) {
      storiesRef.current.addEventListener('scroll', onScroll);
    }
  
    return () => {
      if (storiesRef.current) {
        storiesRef.current.removeEventListener('scroll', onScroll);
      }
    };
  }, []);
  

  useEffect(()=>{
    if(StoriesData.length >6){
      setShowRight(true)
    }else{
      setShowRight(false)
    }
  },[])
  
  return (
    <div className="relative flex w-[42rem] bg-transparent -mb-2 mt-6">

      {showLeft && <div onClick={()=>{storiesRef.current.scrollLeft -= 500}}className="bg-white absolute top-0 -left-2 z-10 p-2 mt-5 flex items-center justify-center shadow-2xl cursor-pointer w-10 h-10 rounded-full dark:bg-lightBlack">
        <img src={leftArrow} alt="" className=""/>
      </div>}

    <div ref={storiesRef} className="flex overflow-x-scroll scroll-smooth gap-4 rounded-2xl" id="storiesScrollBar">


      <div className="relative">
        <div className="justify-center items-center bg-white p-2 w-20 h-20 rounded-3xl border-2 border-lightGray dark:bg-lightBlack dark:border-darkGray">
          <img  src={userInformation.profilePicture} alt="" className="rounded-2xl object-cover w-full h-full"/>
          <div className="absolute top-7 left-7 bg-white rounded-md w-6 h-6 p-1 cursor-pointer">
            <img src={plus} alt="" className="rounded-lg object-cover w-full h-full"/>
          </div>
        </div>
        <div className="text-center mt-1">
            <span className="font-main font-medium inline-block w-20 overflow-hidden whitespace-nowrap text-clip text-sm dark:text-white2">You</span>
        </div>
      </div>


        {StoriesData.map((stories, index)=>
          <div key={index}>
            <div className="justify-center items-center bg-white p-2 w-20 h-20 rounded-3xl border-2 border-Primary dark:bg-lightBlack dark:border-darkPrimary">
              <img  src={stories.img} alt={stories.id} className="rounded-2xl object-cover w-full h-full"/>
            </div>
            <div className="text-center mt-1">
              <span className="font-main font-medium inline-block w-20 overflow-hidden whitespace-nowrap text-clip text-sm dark:text-white2">{stories.name}</span>
            </div>
          </div>
          )}
      </div>

      {showRight && <div onClick={()=>{storiesRef.current.scrollLeft += 500}} className="bg-white absolute top-0 -right-2 z-10 p-2 mt-5 flex items-center justify-center shadow-2xl cursor-pointer w-10 h-10 rounded-full dark:bg-lightBlack">
        <img src={rightArrow} alt="" className=""/>
      </div>}
      
    </div>
  )
}

export default Stories