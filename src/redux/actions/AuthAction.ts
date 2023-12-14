import * as AuthApi from '../api/AuthRequest'
import { Dispatch } from 'redux'

export const localSignIn = (formData: any) => async(dispatch: Dispatch<any>) =>{
  dispatch({type: "AUTH_START"})
  try {
    const {data} = await AuthApi.localSignIn(formData)
    dispatch({type: "AUTH_SUCCESS", data: data})
  } catch (error) {
    console.log(error)
    if (error.response) {
      if (error.response.status === 400) {
        dispatch({ type: "AUTH_FAILED", error: "Invalid email or password. Please check your credentials and try again." });
      } else if (error.response.status === 404) {
        dispatch({ type: "AUTH_FAILED", error: "We couldn't find an account with the provided email address. Please make sure you've entered the correct email." });
      } else if (error.response.status === 403) {
        dispatch({ type: "AUTH_FAILED", error: "Email is not verified" });
      } else {
        dispatch({ type: "AUTH_FAILED", error: "An error occurred while processing your request. Please try again later." });
      }
    } else {
      dispatch({ type: "AUTH_FAILED", error: "Network error. Please check your internet connection and try again." });
    }
  }
}



export const localSignUp = (formData: any) => async(dispatch: Dispatch<any>) =>{
  dispatch({type: "AUTH_START"})
  try {
    const { data } = await AuthApi.localSignUp(formData)
    // dispatch({type: "AUTH_SUCCESS", data: data})
    return data
  } catch (error) {
    console.log(error)
    dispatch({type: "AUTH_FAILED"})
  }
}




export const signOut = () => async(dispatch: Dispatch<any>)=> {
  dispatch({type: "AUTH_SIGN_OUT"})
}
