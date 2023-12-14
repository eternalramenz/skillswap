import React, { useRef, useEffect, useState } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import SkeletonPost from '../../Posts/SkeletonPost.jsx'
import axios from 'axios'
import Post from './Post'


const Posts = ({ scrollToTop, id, setOpenTradeDrawer, setToggleEdit, setData }) => {

  const fetchProfilePost = async ({ pageParam = 0 } = {}) => {
    const response = await axios.get(`https://skillswap-server.onrender.com/profile/post/${id}?cursor=${pageParam}`);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['profilePost', id],
    queryFn: fetchProfilePost,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastProfilePostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastProfilePostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  if (status === 'loading') return null;

  return (
    <div className="flex flex-col w-full max-w-[42rem] ">
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.profilePostGroup.map((post, index) => (
            <div key={post.id} ref={index === page.profilePostGroup.length - 1 ? ref : null}>
              <Post props={post} setOpenTradeDrawer={setOpenTradeDrawer} setToggleEdit={setToggleEdit} setData={setData}/>
            </div>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <SkeletonPost />}

      {!hasNextPage && (
        <div className="flex flex-col h-40 justify-center items-center mb-4 bg-white rounded-2xl dark:bg-lightBlack/70 ring-1 ring-lightGray dark:ring-darkGray">
          <div className="bg-white2">
            
          </div>
          <span className="font-main text-darkBlue text-lg font-bold dark:text-white2">
            You're completely up to date :)
          </span>
          <span className="font-main text-gray text-md font-base mb-4 dark:text-darkWhite">
            You've seen all the experiences of this trader.
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
  );
};

export default Posts;