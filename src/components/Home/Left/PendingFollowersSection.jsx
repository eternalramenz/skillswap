import React, { useEffect, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux'
import { fetchPendingFollowers } from '../../../redux/api/UserRequest.ts'
import PendingFollowerCard from './PendingFollowerCard.jsx';

const PendingFollowersSection = ({setOpenFollowersDrawer}) => {

  const { userInformation } = useSelector((state)=>state.authReducer.userData)
  
  const fetchData = async ({ pageParam = 0 } = {}) => {
    const response = await fetchPendingFollowers(userInformation._id, pageParam);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['pendingFollowers', userInformation._id],
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastPendingFollowerRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPendingFollowerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);


  if (status === 'loading') return null;

  return (
    <div className="w-full max-w-[42rem] rounded-2xl h-40 mb-4 mt-6">
      <div className="w-full  rounded-t-2xl  flex flex-col gap-6">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.pendingFollowersGroup.map((follower, index) => (
              <div
                ref={index === page.pendingFollowersGroup.length - 1 ? ref : null}
                className="flex flex-col gap-6"
              >
                <PendingFollowerCard props={follower} setOpenFollowersDrawer={setOpenFollowersDrawer}/>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {/* skeletal system */}
    </div>
  );
};

export default PendingFollowersSection;
