import React, { useEffect, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSearchUsers} from '../../../redux/api/UserRequest.ts';
import SearchResults from './SearchResults.jsx'
const SearchBar = ({searchQuery}) => {


  const fetchResults = async ({ pageParam = 0 } = {}) => {
    const response = await fetchSearchUsers(searchQuery, pageParam);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['userSearch',searchQuery ],
    queryFn: fetchResults,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
    
  });


  const lastSearchRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastSearchRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry,]);


  
  if (status === 'loading') return (
    <>
      <div className="w-full h-6  dark:bg-lightBlack bg-lightGray rounded-lg custom-shimmer"></div>
      <div className="w-full h-6 dark:bg-lightBlack bg-lightGray rounded-lg custom-shimmer"></div>
      <div className="w-full h-6 dark:bg-lightBlack bg-lightGray rounded-lg custom-shimmer"></div>
    </>
  );

  return (
    <>
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.searchUserGroup.map((search, index) => (
            <div
              className=""
              ref={index === page.searchUserGroup.length - 1 ? ref : null}
            >
              <SearchResults props={search}/>
            </div>
          ))}
        </React.Fragment>
      ))}
      {data.pages.every(page => page.searchUserGroup.length < 1) &&
        <div>
          <span className="w-full text-left dark:text-white2 font-main text-md">
            No results found
          </span>
        </div>
      }
    </>

  )
}

export default SearchBar