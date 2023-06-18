import React, { useEffect } from 'react'
import { GetIssues } from "../../../apicalls/issues";
import { Button, Modal, Table, message } from 'antd'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice'
import moment from 'moment'
function IssuedBooks({showIssuedBooks,setShowIssuedBooks,selectedUser})
 {
    const [issuedBooks, setIssuedBooks] = React.useState([]);
    const dispatch=useDispatch()
    const getIssues=async()=>{
      try{
        dispatch(ShowLoading())
        const response=await GetIssues({user:selectedUser._id})
        console.log(response)
        if(response.success)
        {
          setIssuedBooks(response.data)
        }
       dispatch(HideLoading())
      }catch(error)
      {
        // console.log(error);
        dispatch(HideLoading())
        message.error(error.message)
      }
    }
    useEffect(() => {
      getIssues()
    
    }, [])
    const columns=[
        {
          title:"ID",
          dataIndex:"_id"
        },
        {
          title:"BOOK",
          dataIndex:"book",
          render:(book)=>book.title
        },
        {
          title:"Issued On",
          dataIndex:"issuedOn",
          render:(issueDate)=>moment(issueDate).format("DD-MM-YYYY")
        },
        {
          title:"Return Date(Due Date)",
          dataIndex:"returnDate",
          render:(returnDate)=>moment(returnDate).format("DD-MM-YYYY")},
          //{
        //    title:"Returned On",dataIndex:"returnedDate",
        //    render:(returnedDate)=>{
        //     if(returnedDate){
        //       return moment(returnedDate).format("DD-MM-YYYY A")
        //     }else{
        //       return "Not returned"
        //     }
        //    }
        // },
        {
          title: "Returned On",
          dataIndex: "returnedDate",
          render: (returnedDate) => {
            if (returnedDate) {
              return moment(returnedDate).format("DD-MM-YYYY hh:mm A");
            } else {
              return "Not Returned Yet";
            }
          },
        },
        {
          title:"Rent",
          dataIndex:"rent"
        },{
          title:"Fine",dataIndex:"fine"
        },
      ]
  return (
    <Modal
       open={showIssuedBooks}
       onCancel={()=>setShowIssuedBooks(false)}
       footer={null}   width={1400}>
        <h1 className='text-primary mb-1 text-xl text-center font-bold'>
            {selectedUser.name}'s Issued List
        </h1>
        <Table columns={columns} dataSource={issuedBooks} />
    </Modal>
   
  )
}

export default IssuedBooks