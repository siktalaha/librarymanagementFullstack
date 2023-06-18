import { message } from 'antd';
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { GetLoggedInUserDetail } from '../apicalls/users';
import { ShowLoading ,HideLoading} from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';
function ProtectedRoute({children}) {
    //  const[user,setUser]=useState(null)
    const {user} =useSelector((state)=>state.users)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const validateUserToken= async ()=>{
      try{
             dispatch(ShowLoading())
             const response=await GetLoggedInUserDetail();
             dispatch(HideLoading());
             if(response.success)
             {
                // setUser(response.data)
                dispatch(SetUser(response.data))
             }else{
                 localStorage.removeItem('token')
                 navigate("/login")
                message.error(response.message)
             }
      }
      catch(error)
      {
        localStorage.removeItem("token")
        navigate("/login")
        dispatch(HideLoading())
        message.error(error.message)
      }
    }
  
    useEffect(() => {
      const token=localStorage.getItem('token');
      if(!token)
      {
        navigate("/login");
      }
      else
      {
        validateUserToken();
      }
    
      return () => {
       
      }
    }, [])
    
  return (
    <div>{user && (
    <div className='p-1'>
          <div className='header p-2 rounded bg-primary flex justify-between items-center'>
           <h1 className='text-2xl text-white font-bold underline'  onClick={()=>navigate("/")}>
            Library
           </h1>
           <div className='flex item-center gap-1  bg-white p-1 rounded'>
           <i className="ri-user-follow-fill"></i>
           <span className='text-md underline ' onClick={()=>navigate("/profile")}>{user.name.toUpperCase()}</span>
           <i className="ri-logout-circle-r-line ml-2" onClick={()=>{
            localStorage.removeItem('token')
            navigate("/login")

           }}></i>
           </div>
          </div>
          <div className='content'>
           {children}
          </div>
          </div>
    
    )}</div>
  )
}

export default ProtectedRoute