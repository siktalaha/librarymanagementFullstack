import {axiosInstance } from "./axiosInstance";
export const AddBook=async(payload)=>{
    try{
        const response=await axiosInstance.post("/api/books/add-book",payload);
        return response.data;
    }catch(error)
    {
        throw error;
    }
}
export const GetAllBooks= async (payload)=>{
  try{
      const response=await axiosInstance("/api/books/get-all-book",payload)
      return response.data
  }catch(error)
  {
    throw(error)
  }
}
export const UpdateBook=async(payload)=>
{
    try{
        const response=await axiosInstance.put(`/api/books/update-book/${payload._id}`,payload);
        return response.data;
    }catch(error)
    {
        throw error;
    }
}
export const DeleteBook=async(id)=>
{
    try{
        const response=await axiosInstance.delete(`/api/books/delete-book/${id}`);
        return response.data;
    }catch(error)
    {
        throw error;
    }
}
export const GetBookById=async(id)=>{
    try{
        const response=await axiosInstance.get(`/api/books/get-book-by-id/${id}`)
        return response.data
    }
    catch(error)
    {
        throw error;
    }
}