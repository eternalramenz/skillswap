import React, { useEffect, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchProfileFollowers } from '../../../redux/api/UserRequest.ts';
import ProfileFollowerCard from './ProfileFollowerCard.jsx';

const ProfileFollowerSection = ({setOpenFollowersDrawer}) => {
  const { id } = useParams(); 

  const fetchData = async ({ pageParam = 0 } = {}) => {
    const response = await fetchProfileFollowers(id, pageParam);
    return response.data || [];
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['profileUserFollowers', id],
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });

  const lastProfileFollowerRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastProfileFollowerRef.current,
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
            {page.followersGroup.map((follower, index) => (
              <div
                ref={index === page.followersGroup.length - 1 ? ref : null}
                className="flex flex-col gap-6"
              >
                <ProfileFollowerCard props={follower} setOpenFollowersDrawer={setOpenFollowersDrawer}/>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {/* skeletal system */}
    </div>
  );
};

export default ProfileFollowerSection;
