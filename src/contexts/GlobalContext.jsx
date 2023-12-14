import { createContext, useContext, useState } from 'react';
const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}

export const GlobalContextProvider = ({ children }) => {
  const [ currentChat, setCurrentChat ] = useState(null);
  const [ schedules, setSchedules ] = useState([])
  const [ searchQuery, setSearchQuery] = useState('');
  const [ onlineUsers, setOnlineUsers ] = useState([])
  const [ openFollowersDrawer, setOpenFollowersDrawer ] = useState(false)
  const [ toggleFollowersDrawer, setToggleFollowersDrawer ] = useState(false)
  const [ isFollowerTabActive, setIsFollowerTabActive ] = useState(false)
  const [ showSignIn, setShowSignIn] = useState(true);
  const [ isTradeDetailsActive, setIsTradeDetailsActive ] = useState(true);
  const [ isAllPostActive, setIsAllPostActive ] = useState(true);


  return (
    <GlobalContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        schedules,
        setSchedules,
        searchQuery,
        setSearchQuery,
        onlineUsers,        
        setOnlineUsers,
        openFollowersDrawer,
        setOpenFollowersDrawer,
        toggleFollowersDrawer,
        setToggleFollowersDrawer,
        isFollowerTabActive,
        setIsFollowerTabActive,
        showSignIn,
        setShowSignIn,
        isTradeDetailsActive,
        setIsTradeDetailsActive,
        isAllPostActive, 
        setIsAllPostActive,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
