import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { convertDate, convertWeekDay } from '../../../constants/DateConverters.ts';
import { fetchAllTrades } from '../../../redux/api/TradeRequest.ts';

const AcceptedTrades = ({ setData, setOpenTradeDrawer, setToggleEdit}) => {
  const queryClient = useQueryClient();
  const { userInformation } = useSelector((state) => state.authReducer.userData);

  const fetchData = async ({ pageParam = 0 } = {}) => {
    const response = await fetchAllTrades(userInformation._id, pageParam);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['allTrades'],
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastPortfolioRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPortfolioRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  useEffect(() => {
    fetchData();
    return () => {
      queryClient.removeQueries(['allTrades']);
    };
  }, [userInformation._id]);

  if (status === 'loading') return null;
  const checkStatus = (trade, userId) => {
    if (trade.status === "Accepted") {
      return { 
        text: "Accepted",
        barColor: "bg-green-500", 
        backgroundColor: "dark:bg-green-800/20 bg-green-400/10",
        textColor: "text-green-500"
      };
    } else if (trade.status === "Pending" && userId === trade.senderId) {
      return { 
        text: "Invited",
        barColor: "bg-sky-500", 
        backgroundColor: "dark:bg-sky-800/20 bg-sky-400/10",
        textColor: "text-sky-500"
      };
    } else if (trade.status === "Pending" && userId === trade.receiverId) {
      return { 
        text: "Pending",
        barColor: "bg-amber-500", 
        backgroundColor: "dark:bg-amber-800/20 bg-amber-400/10",
        textColor: "text-amber-500"
      };
    } else if (trade.status === "Completed") {
      return { 
        text: "Completed",
        barColor: "bg-neutral-500", 
        backgroundColor: "dark:bg-neutral-800 bg-neutral-400/10",
        textColor: "dark:text-neutral-500 text-neutral-500"
      };
    } else if (trade.status === "Cancelled") {
      return { 
        text: "Cancelled",
        barColor: "bg-rose-500",
        backgroundColor: "dark:bg-rose-800/20 bg-rose-400/10",
        textColor: "text-rose-500"
      };
    } else {
      return { text: null, color: null };
    }
  }
  
  const groupedData = data.pages.reduce((acc, page) => {
    page.allTrades.forEach((trade) => {
      const tradeDate = trade.date.slice(0, 10);
      if (!acc[tradeDate]) {
        acc[tradeDate] = [];
      }
      acc[tradeDate].push(trade);
    });
    return acc;
  }, {});

  return (
    <div className='flex flex-col gap-4 w-full max-w-[42rem]'>
      <div className='flex flex-col'>
        {Object.entries(groupedData).map(([date, trades], index) => (
          <React.Fragment key={index}>
            <span className="font-main font-medium text-lg dark:text-white2 text-darkBlue mt-4">
              {convertDate(date)}
            </span>
            {trades.map((trade, tradeIndex) => {
              let tradeStatus = checkStatus(trade, userInformation._id);
              return (
                <button
                  className={`mt-6 flex w-full relative rounded-2xl items-center gap-6 justify-between bg-white ring-gray/20 overflow-clip  ring-1 dark:shadow-lg dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray p-4 `}
                  onClick={()=>{setToggleEdit("View"); setOpenTradeDrawer((prev)=>!prev); setData(trade)}}
                  ref={tradeIndex === trades.length - 1 ? ref : null}
                  key={tradeIndex}
                >
                  <div className={`w-2 h-full rounded-2xl ${tradeStatus.barColor}`}></div>

                  <div className="flex flex-col justify-center items-center px-4 h-full w-1/3">
                    <span className='font-main text-sm font-medium text-gray dark:text-darkWhite'>{convertWeekDay(trade.date)}</span>
                    <span className='font-main text-lg dark:text-white2 text-darkBlue font-medium px-2'>{(trade.time).split(" — ")[0]}</span>
                  </div>


                  <div className="flex flex-col h-full w-11/12 gap-8 justify-center">
                    <div className="flex gap-4">
                      <div className='w-16 h-16 flex-shrink-0'>
                        <img src={  userInformation._id === trade.receiverId ? trade.senderData.profilePicture :  trade.receiverData.profilePicture} className="w-16 h-16 rounded-2xl"/>
                      </div>
                      <div className="flex-col flex w-full items-start">
                        <span className="font-main text-gray mr-1 text-sm dark:text-darkWhite">{  userInformation._id === trade.receiverId ? trade.senderData.firstName + " " + trade.senderData.lastName :  trade.receiverData.firstName + " " + trade.receiverData.lastName}</span>
                        <span className="font-main font-semibold text-darkBlue text-lg dark:text-white2 ">{  userInformation._id === trade.receiverId ? trade.senderData.expertise :  trade.receiverData.expertise}</span>
                        <span className="font-main text-gray mr-1 text-sm dark:text-darkWhite">{  userInformation._id === trade.receiverId ? trade.senderData.address :  trade.receiverData.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3 flex justify-end">
                    <div className="flex flex-col items-end gap-2 ">
                      <div className={`mb-2 rounded-md px-2 py-1 flex items-center justify-center text-xs  font-main ${tradeStatus.backgroundColor}`}>
                        <span className={`font-main text-xs font-medium dark:font-medium  ${tradeStatus.textColor}`}>
                          {tradeStatus.text}
                        </span>
                      </div>

                    </div> 
                  </div>
                </button>
              );
            })}
          </React.Fragment>
        ))}
        {/* {!hasNextPage &&
        } */}
      </div>
    </div>
  );
};

export default AcceptedTrades;

