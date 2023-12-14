import { fetchNotificationCount, updateNotification } from '../../../redux/api/NotificationRequest.ts';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from '../../../redux/actions/AuthAction.ts';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import SkillSwap from '../../../assets/SkillSwap.png';
import BellIcon from "../../../icons/BellIcon.jsx"
import SunIcon from '../../../icons/SunIcon.jsx'
import MoonIcon from '../../../icons/MoonIcon.jsx'
import Notifications from './Notifications.jsx';
import SearchBar from './SearchBar.jsx';
import { debounce } from 'lodash'
import { useGlobalContext } from '../../../contexts/GlobalContext.jsx';


const Header = () => {
  const initialTheme = localStorage.getItem('theme');
  const queryClient = useQueryClient()
  const { userInformation } = useSelector((state) => state.authReducer.userData)
  const [ isOpen, setIsOpen ] = useState(false)
  const [ openNotification, setOpenNotification ] = useState(false)
  const [darkMode, setDarkMode] = useState(initialTheme || 'light');
  // const [ searchQuery, setSearchQuery] = useState('');
  const { searchQuery, setSearchQuery } = useGlobalContext();
  const [ debouncedSearchQuery, setDebouncedSearchQuery ] = useState(searchQuery);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dropDownRef = useRef(null);
  const searchInputRef = useRef(null);
  const notificationRef = useRef(null)



  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const handleDebouncedSearchQuery = useCallback(
    debounce((value) => {
      setDebouncedSearchQuery(value);
    }, 500), 
    []
  );

  useEffect(() => {
    handleDebouncedSearchQuery(searchQuery);
  }, [searchQuery, handleDebouncedSearchQuery]);




  const setRefs = (element) => {
    if (dropDownRef) dropDownRef.current = element;
    if (notificationRef) notificationRef.current = element;
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setOpenNotification(false);
      }
    };
  
    window.addEventListener('click', handleClickOutside);
  
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const handleProfile = () => {
    navigate(`/profile/${userInformation._id}`)
  }

  const handleHome = () => {
    navigate(`/home`)
  }

  const handleSignOut = () => {
    dispatch(signOut())
    navigate('/auth')
    queryClient.removeQueries(['notifications'])
    queryClient.removeQueries(['pendingFollowersList'])
    queryClient.removeQueries(['userContacts'])
    queryClient.removeQueries(['accountInformation'])
  }

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]); // Add darkMode to the dependency array

  const handleToggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.remove(prevMode);
      document.documentElement.classList.add(newMode);
      localStorage.setItem('theme', newMode);
      return newMode; // Return the new mode as the updated state
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'k' && event.ctrlKey) {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const fetctCount = async () => { 
    const { data } = await fetchNotificationCount(userInformation._id)
    return data;
  }

  const { data, status } = useQuery(['notificationCount', userInformation._id], fetctCount);

  const handleReadNotifications = async ( ) =>{
    setOpenNotification((prev)=>!prev) 
    setIsOpen(false)
    const newNotificationsData = {
      userId: userInformation._id
    }
    try {
      await updateNotification(newNotificationsData)
    } catch (error) {
      console.log(error)
    }
    queryClient.invalidateQueries(['notificationCount'])
    setTimeout(() => {
      queryClient.invalidateQueries(['notifications']);
    }, 5000); 
  }

  return (
    <div className="" ref={setRefs}>
      <div className="flex 2xs:px-4 sm:px-8 md:px-24 pb-4  justify-between h-12 items-center">
        <div className='flex items-center justify-center w-[12rem]'>
          <button 
            className="flex items-center justify-start" 
            onClick={handleHome}
          >
            <div className="dark:bg-black1 bg-textbox rounded-2xl w-12 h-12 flex items-center justify-center">
              <img src={SkillSwap} alt="" className=" w-12 h-12 p-2"/>
            </div>
            <span className="2xs:hidden lg:block font-main text-2xl font-bold text-darkBlue pl-4 dark:text-white2 dark:font-medium">skillswap.</span>
          </button>
        </div>

        <div className=" w-[44rem] px-4 flex items-center relative">
          <div className="flex pl-4 pr-4 py-2  justify-left items-center w-full rounded-xl h-10 ring-1 ring-gray/40 dark:bg-black1/50 dark:ring-darkGray">
            <input 
              ref={searchInputRef} 
              type="text" 
              value={searchQuery}
              className="font-main text-sm pl-2 w-full outline-none border-none bg-transparent dark:placeholder-darkWhite dark:text-white2" 
              placeholder="Search..."
              onChange={(e) => {
                handleSearchQueryChange(e.target.value);
                handleDebouncedSearchQuery(e.target.value);
              }}
            />
            <kbd className="absolute right-6 bg-white rounded-lg ring-1 h-6 px-2 ring-lightGray dark:bg-lightBlack dark:ring-darkGray">
              <div className="flex items-center justify-center gap-1 h-full ">
                <span className="text-xs font-main text-darkBlue font-medium dark:text-darkWhite">⌘</span>
                <span className="text-xs font-main text-darkBlue font-medium dark:text-darkWhite">K</span>
              </div>
            </kbd>
          </div>
          { searchQuery &&
            <div className="absolute top-12 w-full">
              <div className=" bg-white dark:bg-lightBlack w-[95%] max-h-[25rem] overflow-hidden rounded-lg ring-1 ring-lightGray dark:ring-darkGray">
                <div className="overflow-y-scroll overflow-x-hidden max-h-[25rem] flex flex-col gap-4 p-4 ">  
                  <SearchBar searchQuery={debouncedSearchQuery} />
                </div>
              </div>
            </div>
          }
        </div>

        <div className="flex items-center justify-center w-[12rem]">
          <button 
            className="px-1 mr-4 relative w-[4.5rem] h-8 bg-textbox dark:bg-darkGray rounded-xl flex items-center"
            onClick={handleToggleTheme}  
          >
            <div className='absolute left-2'>
              <SunIcon />
            </div>
            <div className='absolute right-2'>
              <MoonIcon />
            </div>
            <div className={`rounded-md transition-transform duration-300 transform ${darkMode === 'dark' ? 'translate-x-8' : 'translate-x-0'}`}>
              {darkMode === 'dark' ? (
                <div className='bg-lightBlack rounded-lg shadow-md shadow-lightBlack/50 px-1 '>
                  <MoonIcon />
                </div>
              ) : (
                <div className='bg-white rounded-lg shadow-md shadow-lightGray/50  px-1 hover:bg-lightGray'>
                  <SunIcon />
                </div>
              )}
            </div>
          </button>
  
          <button className="w-8 h-8 relative " onClick={handleReadNotifications}>
            <BellIcon />
            { openNotification &&
              <div className="absolute top-16 -right-8">
                <Notifications/>
              </div>
            }
            {data > 0 &&
              <div className="absolute -top-1 left-2 flex justify-center items-center w-5 h-5 rounded-md bg-rose-500 mr-4">
                <span className="font-main text-xs text-white font-medium z-10">{data}</span>
                <div className="bg-rose-300 animate-ping w-4 h-4 rounded-md absolute z-0"></div>
              </div>
            }
          </button>
          <div className="relative">
            <div onClick={()=>{setIsOpen((prev) => !prev), setOpenNotification(false)}} className="w-12 h-12 flex items-center justify-center cursor-pointer">
              <img src={userInformation.profilePicture} alt="" className="rounded-2xl w-12 h-12 p-1" />
            </div>
            {isOpen && (
              <div
                className="flex flex-col absolute top-16 2xs:right-0 lg-right-8 bg-white shadow-2xl shadow-lightGray rounded-lg w-64 ring-1 ring-lightGray
                transform translate-y-0 transition-transform duration-400 ease-in-out dark:bg-lightBlack dark:shadow-black/50 dark:ring-darkGray"
              >
                <div className="flex items-center justify-start mt-2">
                  <div className="ml-4 mr-2">
                    <img src={userInformation.profilePicture} alt="" className="rounded-2xl w-14 h-14 p-1" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <span className="dark:text-white font-main font-medium text-md text-darkBlue mt-4 text-ellipsis overflow-clip">
                      {userInformation.firstName} {userInformation.lastName}
                    </span>
                    <span className="dark:text-darkWhite font-main text-xs text-gray font-medium mb-4 text-ellipsis overflow-clip">
                      {userInformation.expertise}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <hr className="border-lightGray w-10/12 dark:border-darkGray" />
                </div>
                <span className="dark:text-darkWhite ml-8 z-50 cursor-pointer text-darkBlue text-sm my-4 font-medium" onClick={handleProfile}>
                  Profile
                </span>
                <span className="dark:text-darkWhite ml-8 z-50 cursor-pointer text-darkBlue text-sm mb-4 font-medium">
                  <Link to="/setting">
                    Settings
                  </Link>
                </span>
                <div className="flex items-center justify-center">
                  <hr className="border-lightGray w-10/12 dark:border-darkGray" />
                </div>
                <span className="ml-8 z-50 cursor-pointer text-rose-500 text-sm my-4 font-medium" onClick={handleSignOut}>
                  Sign Out
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
      <hr className="border-gray/20 border-1 dark:border-darkGray"/>
    </div>
  )
}


export default Header