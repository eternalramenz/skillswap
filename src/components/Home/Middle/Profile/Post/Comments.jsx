import { useInfiniteQuery } from '@tanstack/react-query';
import Comment from './Comment.jsx';
import React from 'react';
import { fetchProfileComments } from '../../../../../redux/api/CommentRequest.js';

const Comments = ({ props }) => {

  const fetchData = async ({ pageParam = 0 } = {}) => {
    const response = await fetchProfileComments(props._id, pageParam);
    return response.data;
  };


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['profileComments', props],
    fetchData,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextCursor) {
          return lastPage.nextCursor;
        }
        return undefined;
      },
    }
  );

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="w-full  flex flex-col">
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex} className="">
          {page.commentGroup.map((comment, index) => (
            <div key={index} className="mb-6">
              <Comment comment={comment} post={props} />
            </div>
          ))}
        </div>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="font-main text-sm text-gray dark:text-white2"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Comments;
