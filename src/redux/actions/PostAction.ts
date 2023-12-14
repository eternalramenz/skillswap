import * as PostApi from '../api/DiscoverRequest.ts'

export const fetchTimelinePost = (id) => async (dispatch) => {
  dispatch({type:"POST_FETCHING_START", fetching: true, error: false})
  try {
    const { data } = await PostApi.fetchTimelinePost(id)
    dispatch({type:"POST_FETCHING_SUCCESS", data: data, fetching: false, error: false})
  } catch (error) {
    console.log(error)
    dispatch({type:"POST_FETCHING_FAIL", fetching: false, error: true})
  }
}