import axios from 'axios'

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

export const createReview = (data:any) => API.post(`/review/`,data)
export const fetchReviews = (id:string) => API.get(`/review/${id}`)
