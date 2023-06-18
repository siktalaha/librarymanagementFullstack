import { Modal, Table, message } from 'antd'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice'
import { GetIssues, ReturnBook } from '../../../apicalls/issues'
import moment from 'moment'
import Button from '../../../components/Button'
import IssueForm from './IssueForm'

function Issues({open=false,setOpen,selectedBook,reloadBooks}) {
    const[issues,setIssues]=React.useState([])
    const[selectedIssue,setSelectedIssue]=useState(null)
    const [showIssueForm,setShowIssueForm]=useState(false)
    const dispatch=useDispatch()
    
    const getIssues=async()=>{
      try{
        dispatch(ShowLoading())
        const response=await GetIssues({book:selectedBook._id})
        console.log(response)
        if(response.success)
        {
          setIssues(response.data)
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
      reloadBooks()
    }, [])
    const onReturnHandler=async(issue)=>{
      try{
         
          const today=moment().format("YYYY-MM-DD");
          const dueDate=moment(issue.returnDate).format("YYYY-MM-DD")
          if(today>dueDate)
          {
            const fine=moment(today).diff(dueDate,"days") *1
            issue.fine=fine;
         
          }
          issue.returnedDate=new Date()
          issue.book=issue.book._id
          console.log(issue)
          dispatch(ShowLoading())
          const response=await ReturnBook(issue)
        dispatch(HideLoading())
          if(response.success)
          {
            message.success(response.message)
            getIssues()
          }else{
            message.error(response.message)
          }
      }catch(error)
      {
        dispatch(HideLoading())
       message.error(error.message)
      }

    }

    const columns=[
      {
        title:"ID",
        dataIndex:"_id"
      },
      {
        title:"Patron/User",
        dataIndex:"user",
        render:(user)=>user.name
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
      },{
        title:"Action",
        dataIndex:"action",

        render:(action,record)=>{
          return(
            <div className="flex gap-1">
              <Button
                title="Renew"
                onClick={() => {
                  setSelectedIssue(record);
                  setShowIssueForm(true);
                }}
                variant="outlined"
              />
              <Button
                title="Return Now"
                onClick={() => onReturnHandler(record)}
                variant="outlined"
              />
              {/* <Button
                title="Delete"
                variant="outlined"
                onClick={() => deleteIssueHandler(record)}
              /> */}
            </div>
            
          )
        }
      }
    ]
  return (
   <Modal width={1400}footer={null} title="Issue Book" open={open} onCancel={()=>setOpen(false)}>
     <Table columns={columns} dataSource={issues}/>
     {showIssueForm && <IssueForm selectedBook={selectedBook} selectedIssue={selectedIssue} open={showIssueForm } setOpen={setShowIssueForm
     } setSelectedBook={()=>{}} getData={()=>{
      getIssues();
      reloadBooks();
     }} type="edit"/>}
    
   </Modal>
  )
}

export default Issues