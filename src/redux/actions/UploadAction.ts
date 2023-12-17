import * as UploadApi from '../api/UploadRequest.ts'
import * as ProfileApi from '../api/ProfileRequest.ts'

import { Dispatch } from 'redux'
export const uploadPostImage = (data:any) => async(dispatch:Dispatch<any>) =>{
  try {
    const imageUrl = await UploadApi.uploadPostImage(data)
    return imageUrl
  } catch (error) {
    console.log(error)
  }
} 

export const uploadAvatarImage = (data:any) => async(dispatch:Dispatch<any>) =>{
  try {
    const imageUrl = await UploadApi.uploadAvatarImage(data)
    return imageUrl
  } catch (error) {
    console.log(error)
  }
} 




export const uploadPost = (data:any) => async (dispatch:Dispatch<any>)=> {
  dispatch({type: "POST_UPLOAD_START"})
  try {
    const newPost = await ProfileApi.uploadPost(data)
    dispatch({type: "POST_UPLOAD_SUCCESS", data: newPost.data})
  } catch (error) {
    console.log(error)
    dispatch({type: "POST_UPLOAD_FAILED"})
  }
}