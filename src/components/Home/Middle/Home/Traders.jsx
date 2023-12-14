import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LocationIcon from '../../../../icons/LocationIcon.jsx';
import StarIcon from '../../../../icons/StarIcon.jsx'
import Colors from '../../../../constants/Colors.ts'

const Traders = () => {
  const { userInformation } = useSelector((state)=>state.authReducer.userData)

  const fetchTraders = async ({ pageParam = 0 } = {}) => {
    const response = await axios.get(`https://skillswap-server.onrender.com/trader/${userInformation._id}?cursor=${pageParam}`);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['traders', userInformation],
    queryFn: fetchTraders,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });


  const lastTradersRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastTradersRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  const generateRandomColors = () => {
    for (let i = Colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [Colors[i], Colors[j]] = [Colors[j], Colors[i]];
    }

    return Colors;
  };


  const calculateAverageRating = (reviewsData) => {
    if (reviewsData.length === 0) return 0;
    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviewsData.length;
  };

  if (status === 'loading') return null;

  return (
    <div className="relative">
      <div className="w-full sticky top-0 h-16"></div>
      <div className="flex flex-col gap-5 w-full max-w-[42rem]">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.traderGroup.map((trader, index) => {
              const averageRating = calculateAverageRating(trader.reviewsData);
              const badgeColors = generateRandomColors();

              return (
                <Link to={`/profile/${trader._id}`}>
                  <div key={trader._id} className="dark:bg-lightBlack/70 dark:backdrop-blur-3xl ring-1  ring-lightGray relative flex flex-col p-4 bg-card shadow-xl shadow-zinc-200 rounded-2xl gap-2 mb-1 dark:shadow-black/20 dark:ring-darkGray" ref={index === page.traderGroup.length - 1 ? ref : null}>
                    <div className="flex items-center mt-2">
                      <div className="flex pl-2 ">
                        <div className="rounded-3xl min-w-[3rem] min-h-[3rem] w-16 h-16 flex-shrink">
                          <img src={trader.profilePicture} alt="" className="rounded-2xl object-cover" />
                        </div>
                        <div className="flex flex-col pl-4">
                          <div className="flex items-center">
                            <span className="font-main font-medium text-gray mr-1 text-sm dark:text-darkWhite">
                              {trader.firstName + " " + trader.lastName}
                            </span>
                            <div className="w-4 h-4">
                              <StarIcon color="stroke-yellow-500 fill-yellow-500"/>
                            </div>
                            <span className="font-main font-semibold text-darkBlue ml-1 text-sm dark:text-white2">
                            {averageRating.toFixed(1)} 
                            </span>
                            <span className="font-main dark:text-darkWhite text-gray ml-1 text-sm">
                              {"("+ trader.reviewsData.length+ ")"}
                            </span>
                          </div>
                          <span className="font-main font-semibold dark:font-medium text-darkBlue text-lg dark:text-white2 ">{trader.expertise}</span>
                          <div className="flex flex-wrap mt-1 ">
                            {trader.skills.map((skill, index) => (
                              <div
                                className={`mr-2 mb-2 rounded-lg px-2 py-1 flex items-center justify-center text-xs font-medium font-main ${badgeColors[index].background} ${badgeColors[index].text} rounded-md`}
                                key={index}
                              >
                                <span className="">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="font-main text-gray text-sm mt-2 mx-2 line-clamp-2 dark:text-darkWhite">
                        {trader.bio}
                      </span>
                    </div>
                    {/* <div className="absolute right-6 mt-2 w-8 h-8 flex items-center justify-center" onClick={(e)=>{e.preventDefault()}}>
                      <BookMarkIcon/>
                    </div> */}
                    <hr className="text-lightGray mt-2 dark:text-darkGray"/>
                    <div className="flex justify-between items-center">
                      <div className="">
                        <div className="flex mt-2 ">
                          <LocationIcon />
                          <span className="font-main text-gray text-sm ml-1 dark:text-darkWhite dark:font-normal">{trader.address}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-main font-medium mr-2">{trader.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </Link>  
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};




export default Traders;

