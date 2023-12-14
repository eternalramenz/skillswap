import React, { useEffect, useRef, useState } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileFollowingCard from './ProfileFollowingCard.jsx';


const ProfileFollowingSection = ({setOpenFollowersDrawer}) => {
  
  const { id } = useParams(); 

  const fetchProfileFollowers = async ({ pageParam = 0 } = {}) => {
    const response = await axios.get(`https://skillswap-server.onrender.com/user/followings/${id}?cursor=${pageParam}`);
    return response.data || [];
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['profileUserFollowings', id],
    queryFn: fetchProfileFollowers,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastProfileFollowingRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastProfileFollowingRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);


  if (status === 'loading' || !data) return null;

  return (
    <div className="w-full max-w-[42rem] rounded-2xl h-40 mb-4 mt-6">
      <div className="w-full  rounded-t-2xl  flex flex-col gap-6">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.followingsGroup.map((follower, index) => (
              <div
                ref={index === page.followingsGroup.length - 1 ? ref : null}
                className="flex flex-col gap-6"
              >
                <ProfileFollowingCard props={follower} setOpenFollowersDrawer={setOpenFollowersDrawer}/>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {/* skeletal system */}
    </div>
  );
};

export default ProfileFollowingSection;
