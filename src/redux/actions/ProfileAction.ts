import * as ProfileApi from '../api/ProfileRequest.ts'
import { Dispatch } from 'redux'

export const fetchProfileInfo = (id:string)=> async(dispatch:Dispatch<any>)=> {
  dispatch({type:"PROFILE_INFO_FETCHING_START", loading: true, error: false})
  try {
    const { data } = await ProfileApi.fetchInfo(id)
    dispatch({type:"PROFILE_INFO_FETCHING_SUCCESS", data: data, loading: false, error: false})
  } catch (error) {
    console.log(error)
    dispatch({type:"PROFILE_INFO_FETCHING_FAIL", loading: false, error: true})
  }
}


export const uploadPortfolioData = (data:any)=> async (dispatch:Dispatch<any>)=> {
  try{
    const res =  await ProfileApi.uploadPortfolio(data);
    console.log(res)
  }
  catch(error){
    console.log(error)
  }
}


export const updateProfilePicture = (data:any)=> async (dispatch:Dispatch<any>)=> {
  dispatch({type:"UPDATE_PICTURE", data:data, loading: true, error: false})
}
