import axios from 'axios';

const API = axios.create({baseURL: "https://skillswap-server-ev9h.onrender.com"})


export const localSignIn = (formData:any) => API.post('/auth/signin', formData)
export const localSignUp = (formData:any) => API.post('/auth/signup', formData)
export const changePassword = (formData:any) => API.put('/auth/change-password', formData)
export const verifyAccountOtp = (otp:number , userId:string) => API.get(`/auth/verify-account-otp/${userId}?otp=${otp}`)
export const verifyAccountEmail = (email:string ) => API.get(`/auth/verify-account-email/${email}`)
export const verifyEmailTaken = (email: any ) => API.get(`/auth/verify-email-taken/${email}`)
export const forgotPassword = (id:number, data:string ) => API.put(`/auth/forgot-password/${id}`, data)
