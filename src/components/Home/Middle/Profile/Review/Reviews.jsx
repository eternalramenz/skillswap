import React, { useEffect, useRef, useState } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchReviews } from '../../../../../redux/api/ReviewRequest.js';
import Review from './Review.jsx';

const Reviews = ({ id }) => {

  const fetchData = async ({ pageParam = 0 } = {}) => {
    const response = await fetchReviews(id, pageParam);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['reviews', id],
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastReviewRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastReviewRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);


  if (status === 'loading') return null;

  return (
    <div className="w-full max-w-[42rem] rounded-2xl h-40 mb-4">
      <div className="w-full  rounded-t-2xl  flex flex-col gap-6">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.reviewGroup.map((review, index) => (
              <div
                className="p-6 w-full bg-white rounded-2xl ring-1 ring-lightGray dark:shadow-black/20 dark:bg-lightBlack/70 dark:backdrop-blur-3xl  dark:ring-darkGray"
                ref={index === page.reviewGroup.length - 1 ? ref : null}
              >
                <Review props={review}/>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {/* skeletal system */}
    </div>
  );
};

export default Reviews;
