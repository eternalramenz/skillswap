import React, { useEffect, useRef, useState } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import Colors from '../../../../../constants/Colors.ts';
import PortfolioDrawer from './PortfolioDrawer.jsx';
import PortfolioSkeleton from './PortfolioSkeleton.jsx';
import axios from 'axios';

const Portfolios = ({ id }) => {
  const queryClient = useQueryClient();
  const [openPortfolioDrawer, setOpenPortfolioDrawer] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const generateRandomColors = () => {
    const randomColors = [];
    for (let i = Colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      randomColors.push(Colors[j]);
    }
    return randomColors;
  };

  const [badgeColors, setBadgeColors] = useState(generateRandomColors());

  const fetchPortfolios = async ({ pageParam = 0 } = {}) => {
    const response = await axios.get(`https://skillswap-server.onrender.com/profile/portfolio/${id}?cursor=${pageParam}`);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolios,
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
    fetchPortfolios();
    return () => {
      queryClient.removeQueries(['portfolio']);
    };
  }, [id]);

  if (status === 'loading') return 
  ( 
    <div className="w-full max-w-[42rem] ">
      <PortfolioSkeleton /> 
    </div>
  )
  ;

  return (
    <>
      <PortfolioDrawer
        openPortfolioDrawer={openPortfolioDrawer}
        setOpenPortfolioDrawer={setOpenPortfolioDrawer}
        data={selectedPortfolio}
      />
      <div className="w-full max-w-[42rem] rounded-2xl h-40 mb-4">
        <div className="w-full  rounded-t-2xl  flex flex-col gap-6">
          {data.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.portfolios.map((portfolio, index) => (
                <div
                  key={portfolio._id}
                  className="cursor-pointer w-full h-64 bg-white rounded-2xl ring-1 ring-lightGray dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray"
                  ref={index === page.portfolios.length - 1 ? ref : null}
                  onClick={() => {
                    setOpenPortfolioDrawer((prev) => !prev);
                    setSelectedPortfolio(portfolio);
                  }}
                >
                  <div className="rounded-t-2xl">
                    <img src={portfolio.thumbnail} alt="" className="h-56 w-full object-cover rounded-2xl p-1" />
                  </div>
                  <div className="flex justify-between items-center w-full h-6 px-2 pt-1 ">
                    <span className="font-main font-medium dark:text-white2">{portfolio.title}</span>
                    <div className={`${badgeColors[index].background} ${badgeColors[index].text} px-4 rounded-md flex items-center justify-center py-1`}>
                      <span className="font-main text-xs font-medium">{portfolio.tags[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div>
          <button className="w-full h-12 mt-6" disabled={!hasNextPage || isFetchingNextPage}>
            {isFetchingNextPage ? <PortfolioSkeleton /> : hasNextPage ? '' : ''}
          </button>
        </div>
      </div>
    </>
  );
};

export default Portfolios;
