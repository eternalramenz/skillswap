import React, { useRef, useEffect } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios'
import Post from '../Profile/Post/Post.jsx'
import SkeletonPost from './SkeletonPost.jsx'

const AllPosts = ({ scrollToTop, setOpenTradeDrawer, setToggleEdit, setData }) => {

  const fetchDiscoverPosts = async ({ pageParam = 0 } = {}) => {
    const response = await axios.get(`https://skillswap-server.onrender.com/post/discover/post?cursor=${pageParam}`);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['discoverPosts'],
    queryFn: fetchDiscoverPosts,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastDiscoverPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastDiscoverPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  if (status === 'loading') return null;

  return (
    <div className="relative">

      <div className="flex flex-col ">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.discoverPostGroup.map((post, index) => (
              <div key={post.id} ref={index === page.discoverPostGroup.length - 1 ? ref : null}>
                <Post props={post} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit} setData={setData}/>
              </div>
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <SkeletonPost />}

        {!hasNextPage && (
          <div className="flex flex-col h-40 justify-center items-center mb-4 bg-white rounded-2xl dark:bg-lightBlack ring-1 ring-lightGray dark:ring-darkGray">
            <div className="bg-white2">
              
            </div>
            <span className="font-main text-darkBlue text-lg font-bold dark:text-white2">
              You're completely up to date :)
            </span>
            <span className="font-main text-gray text-md font-base mb-4 dark:text-darkWhite">
              You've seen all the experiences of all the trader.
            </span>
            <button
              className="font-main text-white bg-Primary py-2 px-4 rounded-xl text-sm font-semibold shadow-2xl shadow-Primary"
              onClick={scrollToTop}
            >
              Go back to top
            </button>
          </div>
        )}
      </div>
    </div>

  );
};

export default AllPosts;