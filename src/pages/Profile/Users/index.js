import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { GetAllUsers } from '../../../apicalls/users'
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice'
import { Table,Modal} from 'antd'
import moment from 'moment'
import Button from '../../../components/Button'
// import IssuesModel from '../../../../../server/models/issuesModel'
import IssuedBooks from './issuedBooks'
function Users({role}) {
  const [selectedUser,setSelectedUser]=useState(null)
  const[showIssuedBooks,setShowIssuedBooks]=useState(false)
  const [users,SetUsers]=useState([])
  const dispatch=useDispatch();
  const getUsers=async()=>{
    try{
      dispatch(ShowLoading())
      const response =await GetAllUsers(role);
      dispatch(HideLoading())
      if(response.success)
      {
        SetUsers(response.data)
      }else{
        message.error(response.message)
      }

    }catch(error)
    {
      dispatch(HideLoading())
      message.error(error.message)
    }
  }
  useEffect(() => {
    getUsers();
  }, [])
  const columns=[
    {title:"Id",
    dataIndex:"_id"}, ,
    {title:"Name",
    dataIndex:"name"}, 
     {title:"Email",
      dataIndex:"email"},
      {title:"Phone",
      dataIndex:"phone"},
        {title:"Created At",
        dataIndex:"createdAt",
      render:(createdAt)=>moment(createdAt).format("DD-MM-YY"),
    },{title:"Actions",
        dataIndex:"actions",
        render:(actions,record)=>(
          <div>
            <Button title="Books" variant="outlined"
            onClick={()=>{
                    setSelectedUser(record)
                    setShowIssuedBooks(true)
            }}
            />      
            
            
            </div>
        )

    }
  ]
  
  return (

    <div>
      <Table dataSource={users}  columns={columns}/>
      {showIssuedBooks && (<IssuedBooks showIssuedBooks={showIssuedBooks} setShowIssuedBooks={setShowIssuedBooks} selectedUser={selectedUser}/>)}
    </div>
  )
}

export default Users

// admin-entire app librarian -except reports patron-avaliable books and issued books