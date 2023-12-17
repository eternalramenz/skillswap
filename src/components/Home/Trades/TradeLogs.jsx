import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@mantine/hooks';
import { convertDate } from '../../../constants/DateConverters.ts';
import { format } from 'timeago.js';
import { fetchTradeLogs } from '../../../redux/api/TradeRequest.ts'
import SendIcon1 from '../../../icons/SendIcon-1.jsx'
import ImageIcon1 from '../../../icons/ImageIcon-1.jsx'
import StarIcon from '../../../icons/StarIcon.jsx'


const TradeLogs = ({props}) => {

  const fetchData = async ({ pageParam = 0 } = {}) => {
    const response = await fetchTradeLogs(props.tradeId, pageParam);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['tradeLogs', props],
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastTradeLogRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastTradeLogRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);


  if (status === 'loading') return null;

  const groupedData = data.pages.reduce((acc, page) => {
    page.tradeLogsGroup.forEach((trade) => {
      const tradeDate = trade.createdAt.slice(0, 10);
      if (!acc[tradeDate]) {
        acc[tradeDate] = [];
      }
      acc[tradeDate].push(trade);
    });
    return acc;
  }, {});


  const checkStatus = (trade) => {
    if (trade.type === "tradeReproposed" || trade.type === "tradeRescheduled") {
      let text;
      let title
      switch (trade.type) {

        case "tradeRescheduled":
          text = "rescheduled the meeting.";
          title = "Rescheduled"
          break;
        case "tradeReproposed":
          text = "sent another trade request.";
          title = "Reproposed"
          break;
        default:
          text = "Pending";
      }
      return { 
        color: "text-amber-500", 
        bar: "bg-amber-500",
        backgroundColor: "dark:bg-amber-800/20 bg-amber-400/10",
        text: text,
        title:title,
        icon: <SendIcon1 color="fill-white stroke-white"/>
      }; 
    } else if (trade.type === "tradeEdit" || trade.type === "tradeRequest" ) {
      return { 
        color: "text-sky-500",
        bar: "bg-sky-500",
        backgroundColor: "dark:bg-sky-800 bg-sky-400/10",
        text: trade.type === "tradeEdit"  ? "edited their trade request." : "sent a trade request.",
        title: "Invited",
        icon: <SendIcon1 color="fill-white stroke-white"/>

      };
    } else if (trade.type === "tradeCompleted") {
      return { 
        color: "text-neutral-500",
        bar: "bg-neutral-500",
        backgroundColor: "dark:bg-neutral-800 bg-neutral-400/10",
        text: "marked the trade as complete.",
        title: "Completed",
        icon: <SendIcon1 color="fill-white stroke-white"/>

      };
    } else if (trade.type === "tradeAccepted") {
      return { 
        color: "text-green-500",
        bar: "bg-green-500",
        backgroundColor: "dark:bg-green-800 bg-green-400/10",
        text: "accepted the trade request.",
        title: "Accepted",
        icon: <SendIcon1 color="fill-white stroke-white"/>

      };
    } else if (trade.type === "tradeCancelled") {
      return { 
        color: "text-rose-500",
        bar: "bg-rose-500",
        backgroundColor: "dark:bg-rose-800/20 bg-rose-400/10",
        text: "cancelled the trade request.",
        title: "Cancelled",
        icon: <SendIcon1 color="fill-white stroke-white"/>

      };
    } else if (trade.type === "tradePosted") {
      return { 
        color: "text-blue-500",
        bar: "bg-indigo-500",
        backgroundColor: "dark:bg-indigo-800/20 bg-indigo-400/10",
        text: "posted their trade experience.",
        title: "Posted",
        icon: <ImageIcon1 color="fill-white stroke-white"/>
      };    
    } else if (trade.type === "tradeReviewed") {
      return { 
        color: "text-yellow-500",
        bar: "bg-yellow-500",
        backgroundColor: "dark:bg-yellow-800/20 bg-yellow-400/10",
        text: "created a trade review.",
        title: "Reviewed",
        icon: <StarIcon color="fill-white stroke-white"/>,
      };

    } else {
      return { text: null, color: null };
    }
  }
  
  
  return (
    <div className='flex flex-col gap-4 w-full max-w-[42rem]'>     
      <div className='flex flex-col'>
        {Object.entries(groupedData).map(([date, trades], index)=> (
          <React.Fragment key={index}>
            <span className="font-main font-medium text-lg dark:text-white2 text-darkBlue mt-4">
              {convertDate(date)}
            </span>
            {trades.map((trade, tradeIndex) => {
              const TradeStatus = checkStatus(trade)
              return(
                <button 
                className={`mt-6 flex w-full relative rounded-2xl items-center gap-6 justify-between bg-white ring-gray/20 overflow-clip  ring-1 dark:shadow-lg dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray p-4 `}
                ref={tradeIndex === trades.length - 1 ? ref : null}
                key={tradeIndex}
                >
                  <div className={`w-1 h-16 ${TradeStatus.bar} rounded-2xl`}></div>

                  <div className="flex flex-col h-full w-11/12 gap-8 justify-center">
                    <div className="flex gap-4">
                      <div className='w-12 h-12 flex-shrink-0 relative'>
                        <img src={trade.senderData.profilePicture} className="w-12 h-12 rounded-2xl"/>
                        <div className={`w-4 h-4 rounded-md p-[3px] ${TradeStatus.bar} absolute -bottom-1 -right-1`}>
                          {TradeStatus.icon}
                        </div>
                      </div>
                      <div className="flex-col flex gap-1 w-full items-start">
                        <span className="font-main text-darkBlue font-medium flex gap-1 text-sm dark:text-white2 ">{trade.senderData.firstName + " " + trade.senderData.lastName}
                          <span className="font-main text-gray  mr-1 text-sm dark:text-darkWhite">{TradeStatus.text}</span>
                        </span>
                        <span className="font-main text-gray  mr-1 text-sm dark:text-darkWhite">{format(trade.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3 flex justify-end">
                    <div className="flex flex-col items-end gap-2 ">
                      <div className={`mb-2 rounded-md px-2 py-1 flex items-center justify-center text-xs  font-main dark:bg-${TradeStatus.backgroundColor} bg-${TradeStatus.backgroundColor}`}>
                        <span className={`font-main text-xs font-medium dark:font-medium ${TradeStatus.color}`}>
                          {TradeStatus.title}
                        </span>
                      </div>
                    </div> 
                  </div>
                </button>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default TradeLogs