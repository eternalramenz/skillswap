import * as UserApi from "../api/UserRequest.ts";
import { Dispatch } from "redux";
export const setupProfile = (id:string, payload:any)=> async (dispatch:Dispatch<any>)=> {
  try{
    const { data } = await UserApi.setupProfile(id, payload)
    
    dispatch({type: "SETUP_SUCCESS", data: data})
  }
  catch(error){
    console.log(error)
  }
}

export const generateBio = (data:any)=> async (dispatch:Dispatch<any>) => {
  try{
    const response = await UserApi.generateBio(data)
    console.log(response.data.text)
  }
  catch(error){
    console.log(error)
  }
}

export const followRequestUser = (id:string, userId:any)=> async(dispatch:Dispatch<any>)=> {
  try{
    const {data} = await UserApi.followRequest(id, userId)
    dispatch({type: "FOLLOW_USER", data: data})
  }
  catch(error){
    console.log(error)
  }
}

export const unFollowRequestUser = (id:string, userId:string)=> async(dispatch:Dispatch<any>)=> {
  try{
    const {data} = await UserApi.followRequest(id, userId)
    dispatch({type: "REVOKE_USER", data: id})
  }
  catch(error){
    console.log(error)
  }
}


export const followAcceptUser = (id:string, userId:string)=> async(dispatch:Dispatch<any>)=> {
  try{
    const { data } = await UserApi.followAccept(id, userId)
    console.log(data)
    dispatch({type: "ACCEPT_USER", data: data})
  }
  catch(error){
    console.log(error)
  }
}


export const unFollowUser = (id:string, userId:string)=> async(dispatch:Dispatch<any>)=> {
  try{
    await UserApi.unFollow(id, userId)
    console.log(id)
    dispatch({type: "UNFOLLOW_USER", data: id})
  }
  catch(error){
    console.log(error)
  }
}

export const followDeclineUser = (id:string, userId:string)=> async(dispatch:Dispatch<any>)=> {
  try{
    await UserApi.declineRequest(id, userId)
    dispatch({type: "DECLINE_USER", data: id})
  }
  catch(error){
    console.log(error)
  }
}
