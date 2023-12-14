import { useEffect,useRef, useState } from "react";
import { useSelector } from "react-redux";
import { format } from 'timeago.js'
import { useQueryClient } from "@tanstack/react-query";
import { deletePortfolio } from '../../../../../redux/api/ProfileRequest.ts'
import ThreeDotsIcon from '../../../../../icons/ThreeDotsIcon.jsx'
import CloseIcon from "../../../../../icons/CloseIcon.jsx";
import ClockIcon from "../../../../../icons/ClockIcon.jsx";
import Colors from '../../../../../constants/Colors.ts'
import TrashIcon from '../../../../../icons/TrashIcon.jsx'
import PencilIcon from '../../../../../icons/PencilIcon.jsx'

const ViewSection = ({setOpenPortfolioDrawer, setToggleEdit,data}) => {
  const menuRef = useRef(null)
  const queryClient = useQueryClient()
  const [ showMenu ,setShowMenu ] = useState(false)
  const { userInformation } = useSelector((state)=>state.authReducer.userData)

  const generateRandomColors = () => {
    for (let i = Colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [Colors[i], Colors[j]] = [Colors[j], Colors[i]];
    }

    return Colors;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const badgeColors = generateRandomColors();

  const handleDelete = async () =>{
    try {
      await deletePortfolio(data._id,userInformation._id)
    } catch (error) {
      console.log(error)
    }
    setOpenPortfolioDrawer(false)
    queryClient.invalidateQueries(['portfolio'])
  }

  return (
  <div className="flex justify-center gap-8 relative w-full h-full" ref={menuRef}>  
    <button 
      className="absolute top-6 right-6 w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20"
      onClick={() => {setOpenPortfolioDrawer((prev) => !prev); setToggleEdit(false)}}
    >
      <CloseIcon />
    </button>
    {data.userId._id === userInformation._id &&
    <div 
        className="absolute top-6 right-16 w-8 h-8 flex items-center justify-center rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 p-1"
        onClick={() => setShowMenu((prev)=>!prev)}
      >
        <ThreeDotsIcon />
        { showMenu &&
          <div className="absolute right-12 ring-1 ring-lightGray dark:ring-darkGray w-[6rem] bg-white p-1 dark:bg-lightBlack z-10 rounded-lg">
            <button className="flex items-center justify-center px-3 gap-1 "onClick={()=>setToggleEdit((prev)=>!prev)}>
              <div className="w-6 h-4">
                <PencilIcon />
              </div>
              <span className="font-main text-sm text-darkBlue dark:text-white2 py-1 text-left w-full">Edit</span>
            </button>
            <button className="flex items-center justify-center px-3 gap-1" onClick={handleDelete}>
              <div className="w-6 h-6">
                <TrashIcon />
              </div>
              <span className="font-main text-sm text-rose-500 py-1 text-left w-full">Delete</span>
            </button>
          </div>
        }
    </div>
    }
    <div className=" flex flex-col items-center  h-full w-[50%]  mt-8">
      <div className="flex justify-end items-center w-full mb-12 ">
        
      </div>
      <div className="flex justify-between w-full items-start mb-4">
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <div className="w-4 h-4 ring-[7px] ring-Primary rounded-md bg-transparent"></div>
              <span className="text-2xl text-darkBlue dark:text-white2 font-main font-semibold">{data.title}</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-8 h-8">
                <ClockIcon/>
              </div>
              <span className="text-sm text-gray dark:text-darkWhite font-main whitespace-pre-line">{format(data.createdAt)}</span>
            </div>
          </div>

          <span className="text-sm text-gray dark:text-darkWhite font-main whitespace-pre-line">{data.description}</span>
        </div>
      </div>

      <div className="w-full flex mb-12">
        {data.tags.map((tags, index) => (
          <div
            className={`mr-2 mb-2 rounded-lg px-2 py-1 flex items-center justify-center text-xs font-medium font-main ${badgeColors[index].background} ${badgeColors[index].text} rounded-md`}
            key={index}
          >
            <span className="">{tags}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full items-center justify-center rounded-2xl cursor-pointer  ">
        {data.images.map((images, index)=>(
          <div className="rounded-2xl w-full" key={index}>
            <img src={images} alt="" className="rounded-2xl w-full"/>
          </div>
        ))}
      </div>

      <div className="w-full h-12  mt-4 text-transparent">S</div>
    </div>

    {/* <div className="w-[15%] flex flex-col ">
      <div className="flex items-end justify-end flex-col ">
        
        <button 
          className="mt-8 w-8 h-8 rounded-xl bg-lightGray dark:bg-darkGray hover:bg-gray/20 "
          onClick={() => setOpenPortfolioDrawer((prev) => !prev)}
        >
          <CloseIcon />
        </button>

      </div>
      <div className="  flex gap-4">
        <div className="w-14 h-14 rounded-2xl overflow-clip">
          <img src={state?.userId.profilePicture}/>
        </div>
        <div className="flex-col flex justify-center">
          <span className="font-main text-lg text-darkBlue dark:text-white2">{state?.userId.expertise}</span>
          <span className="font-main text-sm text-gray dark:text-darkWhite">{state?.userId.firstName + " " + state?.userId.lastName}</span>
        </div>
      </div>
    </div> */}

  </div>
  )
}

export default ViewSection