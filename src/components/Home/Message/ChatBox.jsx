import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { fetchInfo } from '../../../redux/api/ProfileRequest.ts';
import { fetchMessages, addMessage } from '../../../redux/api/MessageRequest.ts';
import { fetchMessageTrade } from '../../../redux/api/TradeRequest.ts';
import { format } from 'timeago.js';
import { io } from "socket.io-client";
import { useQueryClient } from '@tanstack/react-query';
import SendIcon from '../../../icons/SendIcon';

const ChatBox = ({ chat, currentUser, setSendMessage,  receivedMessage, socket, online, setTradeData, setOpenTradeDrawer}) => {

  const queryClient = useQueryClient()
  const scrollRef = useRef(null);
  const [ userData, setUserData ] = useState(null);
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');
  const [ isTyping, setIsTyping ] = useState(false)
  const { userInformation } = useSelector((state) => state.authReducer.userData);

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((member) => member._id != currentUser);
    const getUserData = async () => {
      try {
        const { data } = await fetchInfo(userId._id);
        setUserData(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);


  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await fetchMessages(chat.chatId);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getMessages();
  }, [chat,]);


  
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 0);
    }
  }, []);
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView()
  }, [messages]);

  //SEND MEESSAGES
 const handleSend = async(e)=> {
    if(!newMessage) return
    e.preventDefault()
    const message = {
      senderId : currentUser,
      content: newMessage,
      chatId: chat.chatId,
  }

   const receiverId = chat.members.find((member)=> member._id != currentUser);
    setSendMessage({...message, receiverId: receiverId._id})
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error)
    }
    queryClient.invalidateQueries(['userChats']) 
  }


  useEffect(()=> {
    if (receivedMessage !== null && receivedMessage.chatId === chat.chatId) {
      setMessages([...messages, receivedMessage]);
    }
  
  },[receivedMessage])
  



  useEffect(() => {
    socket.current = io("https://skillswap-socket.onrender.com");
    socket.current.on("typing-message", (data) => {
      setIsTyping(true);;
      }
    );
  }, []);

  const handleTyping = () => {
    const receiver = chat.members.find((id) => id !== currentUser);
    socket.current.emit('typing-started', { receiverId: receiver});
  };

  const handleOpenTrade = async(id) =>{
    try {
      const res = await fetchMessageTrade(id)
      setTradeData(res.data[0])
      setOpenTradeDrawer((prev)=>!prev)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col justify-between h-full relative w-full bg-white rounded-2xl ring-1 ring-gray/20 dark:bg-lightBlack/70 dark:ring-darkGray">
      {chat ? (
        <>
          <div className=" flex items-center gap-4 w-full p-4 rounded-2xl bg-white dark:bg-lightBlack/70 ">
            <div className="flex relative">
              <img src={userData?.profilePicture} alt="" className="w-12 h-12 rounded-2xl" />
              <div className={`${online ? 'bg-green-500':'bg-gray dark:bg-darkWhite'} w-4 h-4  absolute rounded-md -bottom-1 -right-1 ring-2 dark:ring-lightBlack ring-white`}></div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-main text-lg text-darkBlue font-medium dark:text-white2">
                {userData?.firstName + ' ' + userData?.lastName}
              </span>
              <span className="font-main text-sm text-gray dark:text-darkWhite">
                {online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <hr className="text-lightGray dark:text-darkGray" />
          <div className="w-full overflow-y-scroll h-full bg-textbox dark:bg-lightBlack/70 "  >
            <div className="flex flex-col h-full p-8">
              <div className="w-full h-12 flex-1" ></div>
              {messages.map((message, index) => {
                const showDetails = index === 0 ? true : message.senderId !== messages[index - 1]?.senderId || new Date(message.createdAt).getTime() - (new Date(messages[index - 1]?.createdAt).getTime() || 300001) > 300000;
                return (
                  <div key={index} className={`flex ${message.senderId === currentUser ? 'justify-end' : 'justify-start'}`} ref={scrollRef}>
                    <div className={`${message.senderId !== currentUser ? 'items-start' : 'items-end'} flex flex-col`}>
                      <div className="flex flex-col ">
                        {showDetails && (
                          <div className="flex items-center gap-2 mt-4 mb-2">
                            {message.senderId !== currentUser && (
                              <>
                                <img src={userData?.profilePicture} alt="" className="w-8 h-8 rounded-lg" />
                                <span className="font-main text-md font-medium dark:text-white2 text-darkBlue">
                                  {message.senderId === currentUser
                                    ? userInformation.firstName + ' ' + userInformation.lastName
                                    : userData?.firstName + ' ' + userData?.lastName}
                                </span>
                                <span className="font-main dark:text-darkWhite text-xs text-gray ml-1">{format(message.createdAt)}</span>
                              </>
                            )}
                            {message.senderId === currentUser && (
                              <>
                                <span className="font-main dark:text-darkWhite text-xs text-gray mr-1">{format(message.createdAt)}</span>
                                <span className="font-main text-md font-medium dark:text-white2 text-darkBlue">
                                  {message.senderId === currentUser
                                    ? userInformation.firstName + ' ' + userInformation.lastName
                                    : userData?.firstName + ' ' + userData?.lastName}
                                </span>
                                <img src={userInformation.profilePicture} alt="" className="w-8 h-8 rounded-lg" />
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex">
                        { message.type === "mail" ? (
                          <div className="flex-col flex mb-12">
                            <div className="bg rounded-2xl py-4 px-4 bg-[#F1F7FF] dark:bg-blue-800/20 flex flex-col gap-2 ring-1 ring-blue-300 dark:ring-blue-700">
                              <span className="whitespace-pre-line font-main text-lg font-medium dark:font-normal dark:text-royalBlue text-royalBlue text-ellipsis line-clamp-[12] overflow-hidden">
                                {message.title}
                              </span>
                              <span className="whitespace-pre-line font-main font-normal dark:text-blue-300 text-blue-400 text-ellipsis line-clamp-[12] overflow-hidden">
                                {message.content}
                              </span>
                              
                              <div className={`flex w-full items-center  mt-8 ${message.senderId !== currentUser  ?  "justify-end" : "justify-start"}`}>
                                <button className="font-main px-20 py-2 bg-Primary rounded-lg text-white text-sm shadow-2xl shadow-Primary" onClick={()=>handleOpenTrade(message.tradeId)}>See Trade</button>
                              </div>
                              
                            </div>
                          </div>
                        ):(
                          <div className={`${
                            message.senderId === currentUser 
                              ? `bg-[#F1F7FF] dark:bg-blue-800/20`
                              : 'bg-slate-100 dark:bg-neutral-600/20'
                          } break-words max-w-[70vh] mt-1 py-2 px-4 rounded-xl dark:font-normal`}>
                            <span className={`${
                              message.senderId === currentUser 
                                ? `dark:text-royalBlue text-royalBlue`
                                : 'text-left text-darkBlue dark:text-white2'
                            } font-main text-md dark:font-normal whitespace-pre-line `}>
                              {message.content}
                            </span>
                          </div>
                        )
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
            {isTyping && <div className='w-full h-12 font-main text-sm text-darkBlue mt-4'>{userData.firstName + " "}is Typing</div>}
            </div>
          </div>
     
          <hr className="text-lightGray dark:text-darkGray " />
          <div className="w-full  flex px-4 py-2 rounded-2xl items-center justify-center ">
            <input
              type="text"
              className="w-full h-12 outline-none font-main text-sm bg-transparent placeholder:text-darkWhite dark:text-white2"
              placeholder="Type Here"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); 
                  handleSend(e); 
                  
                }
              }}
            />
            <button onClick={handleSend}>
              <SendIcon />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full relative w-full bg-white rounded-2xl ring-1 ring-gray/20 dark:bg-lightBlack/70 dark:ring-darkGray">
          <span className="font-main text-lg text-darkBlue dark:text-white2">Tap on a chat to start a conversation</span>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
