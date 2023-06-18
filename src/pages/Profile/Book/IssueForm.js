import { Modal, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../components/Button'
import moment from "moment"
import { GetUserById } from '../../../apicalls/users'
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice'
import { EditIssue, IssueBook } from '../../../apicalls/issues'

const IssueForm = ({open=false,setOpen,getData,selectedBook,setSelectedBook,selectedIssue,type}) => { 
   const {user}=useSelector(state=>state.users)
  const [validated,setValidated]=React.useState(false)
    const[patronData,setPatronData]=React.useState(null)
    const[errorMessage,setErrorMessage]=React.useState('')
    const [patronId,setPatronId]=React.useState(type==='edit'?selectedIssue.user._id:"")
  const[returnDate,setReturnDate]=React.useState(type==='edit'? moment(selectedIssue.returnDate).format("YYYY-MM-DD"):"")
  const dispatch=useDispatch()
  const validate=async ()=>{
    try{
    dispatch(ShowLoading())
    const response=await GetUserById(patronId)
    if(response.success)
    {
        dispatch(HideLoading())
        if(response.data.role!='patron')
        {
          setValidated(false)
        setErrorMessage("The user is not a patron")
        }
        else
        {
          setPatronData(response.data)
          setValidated(true)
        setErrorMessage('')
        }
    }
    else{
      dispatch(HideLoading())
        setValidated(false)
        setErrorMessage(response.message)
    }
    }catch(error)
    {
      dispatch(HideLoading())
      setValidated(false)
      setErrorMessage(error.message)
    }
  }
  const onIssue= async()=>{
    try{
      dispatch(ShowLoading())
      let response=null
     if(type!=="edit")
     {
      console.log(response)
      response =await IssueBook({
        book:selectedBook._id,
        user:patronData._id,
        issueDate:new Date(),
        returnDate,
        fine:0,
        rent:moment(returnDate).diff(moment(),'days')*selectedBook.rentPerDay
        ,issuedBy:user._id,
      })
     }
     else
     {
      response=await EditIssue({
        book:selectedBook._id,
        user:patronData._id,
        issueDate:selectedIssue.issueDate,
        returnDate,
        rent:moment(returnDate).diff(moment(),"days")*selectedBook.rentPerDay,
        fine:0,issuedBy:user._id,
        _id:selectedIssue._id
      })
     }
      dispatch(HideLoading())
      console.log(response)
      if(response.success)
      {
        message.success(response.message)
        getData()
        setPatronId("")
        setReturnDate("")
        setValidated(false)
        setErrorMessage("")
        setSelectedBook(null)
        setOpen(false)
      }else
      {
         message.error(response.message)
      }
    //  dispatch(HideLoading)
    }catch(error){
      dispatch(HideLoading())
      message.error(error.message)
    }
  }
  useEffect(() => {
    if(type==="edit")
    {
      validate();
    }
  }, [])
  
    return (
    <Modal title=""open={open}
     footer={null}  onCancel={()=>setOpen(false)}>
       <div className='flex flex-column gap-2 '>
        <h1 className='text-secondary text-centre font-bold text-xl uppercase'>{type==='edit'? "Edit Issue":"Issue Book"}</h1>
    <div>
      <span>
        Patron Id
      </span>
      <input type="text" value={patronId} onChange={(e)=>setPatronId(e.target.value)}
          placeholder='Patron Id' disabled={type==="edit"}/>
    </div>
       <div>
        <span>
          Return date
        </span>
        <input type="date" value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}
          placeholder='Return Date'min={moment().format('YYYY-MM-DD')}/>
       </div>
          
         
          {errorMessage && <span className='error-message'>{errorMessage}</span>}
          {validated && (<div className='text-sm bg-secondary text-white p-2'>
            <h1 className='uppercase'>Patron name:{patronData.name}</h1>
            <h1 className='uppercase'>Number of days:{moment(returnDate).diff(moment(),'days')}</h1>
            <h1 className='uppercase'>Rent per day:{selectedBook.rentPerDay}</h1>
            <h1>
              Rent :{moment(returnDate).diff(moment(), "days") *
                selectedBook.rentPerDay}
            </h1></div>)}
          
          <div className='flex justify-end gap-2'>
          <Button title="Cancel"  onClick={()=>setOpen(false)} variant="outline"/>
            <Button title="Validate" disabled={patronId===''|| returnDate==='' } onClick={validate}/>
           {validated && <Button onClick={onIssue} title={type==='edit'?"Update":"Issue"} disabled={patronId===''|| returnDate==='' }/>}
     
          </div>
       </div>
    </Modal>
  )
}

export default IssueForm