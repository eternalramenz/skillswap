import { io } from "socket.io-client";
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { userChats } from '../redux/api/ChatRequest.ts';
import { useQuery } from '@tanstack/react-query' 
import { useGlobalContext } from "../contexts/GlobalContext";
import { useQueryClient } from "@tanstack/react-query";
import Conversation from '../components/Home/Message/Conversation';
import HomeLeft from '../components/Home/Left/HomeLeft';
import Navbar from '../components/Home/Navbar/Navbar';
import ChatBox from '../components/Home/Message/ChatBox';
import ChatInformation from '../components/Home/Message/ChatInformation';
import FollowersDrawer from '../components/Home/Left/FollowersDrawer';
import TradeDrawer from '../components/Home/Trades/TradeDrawer'

const ChatPage = () => {
  const socket = useRef();
  const queryClient = useQueryClient()
  const { currentChat, setCurrentChat } = useGlobalContext();
  const { userInformation } = useSelector((state)=> state.authReducer.userData)
  const { onlineUsers , setOnlineUsers} = useGlobalContext();
  const [ sendMessage, setSendMessage] = useState(null);
  const [ receivedMessage, setReceivedMessage] = useState(null);
  const [ openFollowersDrawer, setOpenFollowersDrawer ] = useState(false)

  const fetchUserChats = async () => {
    const { data } = await userChats(userInformation._id);
    return data;
  };
  const { data, status, error } = useQuery(['userChats'], fetchUserChats);



  useEffect(() => {
    socket.current = io("ws://skillswap-socket.onrender.com");
    socket.current.emit("connect-user", userInformation._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.current.disconnect()
    }
  }, []);


  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
      queryClient.invalidateQueries(['userChats'])
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    if (!currentChat) return false;
    const chatMember = chat.members.find((member) => member._id !== userInformation._id);
    const online = onlineUsers.find((user) => user.userId === chatMember._id);  
    return online ? true : false;
  };

  const [ tradeData, setTradeData ] = useState('')
  const [ openTradeDrawer, setOpenTradeDrawer] = useState(false)
  const [ toggleEdit, setToggleEdit] = useState(false)

  return (
    <div className="h-screen overflow-y-clip">
      <Navbar />
      <FollowersDrawer openFollowersDrawer={openFollowersDrawer} setOpenFollowersDrawer={setOpenFollowersDrawer} />
      <TradeDrawer data={tradeData} openTradeDrawer={openTradeDrawer} setOpenTradeDrawer={setOpenTradeDrawer} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit}/>
      <div className="flex h-full pt-14 px-12 ">
        <div className="w-[3%] h-full"></div>
        <div className=" w-auto  flex 2xs:hidden xl:hidden 2xl:flex">
          <div className="my-8 w-full flex justify-center items-center flex-col">
            <HomeLeft setOpenFollowersDrawer={setOpenFollowersDrawer}/>
          </div>
        </div>

        <div className=" w-full max-w-[24rem] min-w-[20rem]  flex xs:hidden md:hidden lg:flex">
          <div className="my-8 m-6 p-4  w-full flex  flex-col bg-white rounded-2xl dark:bg-lightBlack/70 ring-1 ring-gray/20 dark:ring-darkGray">
          <span className="text-2xl font-main text-darkBlue font-semibold dark:text-white2">Messages</span>

            {/* <div className="mt-4 flex items-center justify-center p-2 ring-1 h-10 rounded-lg ring-gray/40 dark:ring-darkGray w-full ">
              <input type="text" placeholder="Search" className="bg-transparent font-main text-md w-full outline-none border-none"/>
            </div>
             */}
            <div className="flex  flex-col gap-6 mt-4">
              {data?.map((chat, id)=>(
                <div key={id} onClick={()=> setCurrentChat(chat)}>
                  <Conversation 
                    data={chat} 
                    currentUserId={userInformation._id} 
                    online={checkOnlineStatus(chat)}
                    receivedMessage={receivedMessage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        
          <div className="w-full flex h-full">
            <div className=" flex py-8 w-full gap-6">
              <ChatBox 
                chat={currentChat}
                currentUser={userInformation._id}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
                socket={socket}
                online={checkOnlineStatus(currentChat)}
                setTradeData={setTradeData}
                setOpenTradeDrawer={setOpenTradeDrawer}
              />
              {/* { currentChat &&
                <ChatInformation 
                  chat={currentChat}
                  currentUser={userInformation._id}
                />
              } */}
            </div>
          </div>

        
        
        <div className="w-[3%] h-full"></div>
      </div>


   </div>
  );
};

export default ChatPage;
