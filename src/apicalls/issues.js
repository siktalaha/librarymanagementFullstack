import {axiosInstance } from "./axiosInstance";

export const IssueBook=async(payload)=>{
    try{
        const response =await axiosInstance.post("/api/issues/issue-new-book",payload)
        return response.data
    }
    catch(error)
    {
        throw error
    }
}
export const  GetIssues = async(payload)=>{
    try{
        const response= await axiosInstance.post("/api/issues/get-issues",payload)
        return response.data
    }catch(error)
    {
        throw error
    }
}
export const ReturnBook= async(payload)=>{
    try{
     const response=await axiosInstance.post("/api/issues/return-book",payload)
      return response.data
    }catch(error)
    {
        throw error
    }
}
export const EditIssue =async(payload)=>{
    try{
        const response=await axiosInstance.post("/api/issues/edit-issue",payload);
        return response.data;
    }catch(error)
    {throw error;}
}