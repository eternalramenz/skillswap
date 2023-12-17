import React, { useRef, useEffect } from "react";
import { fetchNotifications } from "../../../redux/api/NotificationRequest.ts";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { convertDate } from '../../../constants/DateConverters.ts';
import Notification from "./Notification.jsx";
import InboxIcon from "../../../icons/InboxIcon.jsx";

const Notifications = () => {

  const { userInformation } = useSelector((state)=>state.authReducer.userData)

  const fetchData = async ({ pageParam = 0 } = {}) => {
    const response = await fetchNotifications(userInformation._id, pageParam);
    return response.data;
  };


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['notifications', userInformation._id],
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastNotificationRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastNotificationRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);


  if (status === 'loading') return null;

  const groupedData = data.pages.reduce((acc, page) => {
    page.notificationGroup.forEach((notification) => {
      const notificationDate = notification.createdAt.slice(0, 10);
      if (!acc[notificationDate]) {
        acc[notificationDate] = [];
      }
      acc[notificationDate].push(notification);
    });
    return acc;
  }, {});

  console.log(groupedData)
  return (
    <div className=" bg-white dark:bg-lightBlack max-h-[25rem] h-full overflow-hidden w-80 rounded-lg ring-1 ring-lightGray dark:ring-darkGray">

      <div className="w-full flex items-center justify-start px-4 pt-4 pb-2 bg-white dark:bg-lightBlack">
        <span className="text-xl font-main text-darkBlue font-semibold dark:text-white2">Notifications</span>
      </div>
      <div className="overflow-y-scroll overflow-x-hidden max-h-[25rem] h-[25rem] flex flex-col gap-4 p-4 pb-14 ">  
      {Object.entries(groupedData).map(([date, notifications], index, array) => (
        <React.Fragment key={index}>
          <div className="w-full flex items-center justify-start">
            <span className="font-main font-medium text-md dark:text-white2 text-darkBlue text-left">
              {convertDate(date)}
            </span>
          </div>
          {notifications.map((notification, tradeIndex) => (
            <div
              className={`${index === array.length - 1 && tradeIndex === notifications.length - 1 ? "pb-0" : "pb-2"}`}
              ref={index === array.length - 1 && tradeIndex === notifications.length - 1 ? ref : null}
              key={tradeIndex}
            >
              <Notification props={notification}/>
            </div>
          ))}
        </React.Fragment>
      ))}
      {Object.keys(groupedData).length === 0 &&
        <div className="w-full  items-center justify-center flex flex-col gap-2 h-[25rem]">
          <div className=" h-7 w-7">
            <InboxIcon color="stroke-gray dark:stroke-darkWhite"/>
          </div>
          <p className="font-main text-sm text-gray dark:text-darkWhite">No new notifications</p>
        </div>
      }
      </div>
    </div>
  );
}

export default Notifications