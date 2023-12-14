import axios from 'axios';

const API = axios.create({baseURL: "https://skillswap-server.onrender.com"})

//avatar
export const uploadAvatarImage = (data:any) => API.post('/upload/avatar', data)

//coverphoto
export const uploadCoverImage = (data:any) => API.post('/upload/cover', data)
export const deleteCoverPicture = ( data:any) => API.delete(`/upload/cover`, data)

//post
export const uploadPostImage = (data:any) => API.post('/upload/post', data)
//thumbnail
export const uploadPortfolioImages = (data:any) => API.post('/upload/portfolio', data)
export const uploadPortfolioThumbnail = (data:any) => API.post('/upload/thumbnail', data)

