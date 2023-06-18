import React, { useEffect } from 'react'
import Button from '../../../components/Button'
import Bookform from './Bookform'
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice'
import { DeleteBook, GetAllBooks } from '../../../apicalls/books'
import { Table } from 'antd'
import Issues from './Issues'
import IssueForm from './IssueForm'
import moment from "moment"
function Books() {
  const[openIssues,setOpenIssues]=React.useState(false)
  const[openIssuesForm,setOpenIssuesForm]=React.useState(false)
  const [formType,setFormType]=React.useState('add')
  const [selectedBook,setSelectedBook]=React.useState(null)
  const [openBookForm,setOpenBookform]=React.useState(false)
  const dispatch=useDispatch();
  const [books,setBooks]=React.useState([])
  const deleteBook=async(id)=>{
    try{
    dispatch(ShowLoading())
    const response =await DeleteBook(id);
  console.log(response)
    dispatch(HideLoading())
    if(response.success)
    {
      message.success(response.message)
      getBooks();

    }else{
      message.error(response.message);
    }
    }catch(error)
    {
        dispatch(HideLoading())
        message.error(error.message)
    }
  }
  const getBooks=async ()=>{
    try{
      dispatch(ShowLoading())
      const response=await GetAllBooks();
      console.log(response);
      dispatch(HideLoading())
      if(response.success)
      {
        setBooks(response.data)
      }
      else{
        message.error(response.message)
      }


    }catch(error)
    {
  dispatch(HideLoading())
message.error(error.message)
    }
  }
  useEffect(()=>{
    getBooks()

  },[])
  const columns=[
    {
      title:"Book" , 
      dataIndex:"image",
      render:(image)=><img src={image} alt="Book" width='60' height="60" className='mt-1'/>

    }
    ,{
      title:"Title",
      dataIndex:"title",
    },{
      title:"Category",
      dataIndex:"category",
    },
    {
      title:"Author",
      dataIndex:"author"
    },
    {
      title:"Publisher",
      dataIndex:"publisher"
    },{
      title:"Total Copies",
      dataIndex:"totalCopies"
    },
    {
      title:"Avaliable Copies",
      dataIndex:"avaliableCopies"
    },
    {
      title:"Added on",
      dataIndex:"createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title:"Action",
      dataIndex:"action",
      render:(text,record)=>
       (<div className='flex gap-1'>  
       <i class="ri-edit-box-line" onClick={()=>{
        setFormType('edit')
        setSelectedBook(record)
        setOpenBookform(true)
       }}></i>
<i className="ri-delete-bin-5-line" onClick={()=>{
  console.log(record);
  deleteBook(record._id)
}}></i>
<span className="underline" onClick={ ()=>{
        setOpenIssues(true)
        setSelectedBook(record)}}>Issues</span>

<span className="underline" onClick={ ()=>{
        setOpenIssuesForm(true)
        setSelectedBook(record)}}>Issue Book</span>
       </div>)
      
    }
  ]
  return (
    <div>
    <div className="flex justify-end">
      <Button title="Add Book" onClick={()=>
        {
          setFormType("add")
          setSelectedBook(null)
        setOpenBookform(true)
        }
        } 
        />
    </div>
    <Table columns={columns} dataSource={books} />
    {openIssues && (<Issues open={openIssues} setOpen={setOpenIssues}  reloadBooks={getBooks} setSelectedBook={setSelectedBook}selectedBook={selectedBook}/>)}
    {openIssuesForm && (<IssueForm open={openIssuesForm} setOpen={setOpenIssuesForm}  setSelectedBook={setSelectedBook} selectedBook={selectedBook} getData={getBooks}/>)}
    {openBookForm && <Bookform open={openBookForm} setOpen={setOpenBookform} reloadBooks={getBooks} formType={formType} setSelectedBook={setSelectedBook} selectedBook={selectedBook}/>}
    </div>
  )
}

export default Books