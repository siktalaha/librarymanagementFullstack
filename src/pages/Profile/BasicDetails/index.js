import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

function BasicDetails() {
    const {user}=useSelector((state)=>state.users)
  return (
    <div className='rounded w-50  bg-secondary text-white flex flex-column p-2'>
        <div className='flex justify-between'>
            <h1 className="text-md">Name</h1>
            <h1 className="text-md">{user.name}</h1>
        </div>
        <div className='flex justify-between'>
            <h1 className="text-md">Email</h1>
            <h1 className="text-md">{user.email}</h1>
        </div>
        <div className='flex justify-between'>
            <h1 className="text-md">Phone num</h1>
            <h1 className="text-md">{user.phone}</h1>
        </div>
        <div className='flex justify-between'>
            <h1 className="text-md">Role</h1>
            <h1 className="text-md">{user.role}</h1>
        </div>
        <div className='flex justify-between'>
            <h1 className="text-md">Registered at</h1>
            <h1 className="text-md">{moment(user.createdAt).format("MMMM Do YYYY, h:mm")}</h1>
        </div>
    </div>
  )
}

export default BasicDetails