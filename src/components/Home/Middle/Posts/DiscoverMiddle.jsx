import { useRef, useState } from 'react';
import { useGlobalContext } from "../../../../contexts/GlobalContext.jsx";
import PostDrawer from '../../Trades/PostDrawer.jsx'
import FollowingPosts from './FollowingPosts.jsx';
import AllPosts from './AllPosts.jsx'
const DiscoverMiddle = () => {

  const { isAllPostActive, setIsAllPostActive } = useGlobalContext()

  const postRef = useRef(null);

  const [ openPostDrawer, setOpenPostDrawer ] = useState(false)
  const [ toggleEdit, setToggleEdit ] = useState("View")
  const [ postData, setPostData ] = useState(null)

  const scrollToTop = () =>{
    console.log("cliked")
    postRef.current.scrollTo({top:0, left:0, behavior:'smooth'})
  }

  return (
    <div className="flex flex-col gap-4 px-[1rem] items-center h-screen w-screen overflow-y-scroll relative" ref ={postRef}>
      <PostDrawer openTradeDrawer={openPostDrawer} setOpenTradeDrawer={setOpenPostDrawer} data={postData} />
      <div className='mt-[5.5rem] flex-col gap-6 w-full max-w-[42rem] flex items-start justify-center'>
        <div className="flex p-1 rounded-lg dark:bg-darkGray bg-lightGray">
          <button 
            className={`${isAllPostActive ?'dark:bg-lightBlack bg-white':'bg-transparent'} p-1 rounded-md px-4 flex items-center justify-center  w-32`}
            onClick={()=>{setIsAllPostActive(true)}}
          >
            <span className={`${isAllPostActive ?'dark:text-white2 text-darkBlue font-medium':'dark:text-darkWhite text-gray'} text-md font-main`}>
              All
            </span>
          </button>
          <button 
            className={`${isAllPostActive ?'bg-transparent':'dark:bg-lightBlack bg-white'} p-1 rounded-md px-4 flex items-center justify-center  w-32`}
            onClick={()=>{setIsAllPostActive(false)}}
          >
            <span className={`${isAllPostActive ?'dark:text-darkWhite text-gray':'dark:text-white2 text-darkBlue font-medium'} text-md font-main`}>
              Followings
            </span>
          </button>
        </div>

        { isAllPostActive ? (
          <AllPosts 
            scrollToTop={scrollToTop} 
            setOpenTradeDrawer={setOpenPostDrawer} 
            setToggleEdit={setToggleEdit}
            setData={setPostData}
          />
        ) : (
          <FollowingPosts
            scrollToTop={scrollToTop} 
            setOpenTradeDrawer={setOpenPostDrawer} 
            setToggleEdit={setToggleEdit}
            setData={setPostData}
          />
        )}
      </div>
    </div>
  );
};

export default DiscoverMiddle;
