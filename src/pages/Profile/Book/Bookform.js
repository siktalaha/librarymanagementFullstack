import React from 'react'
import { Modal,Form ,Row,Col,message} from 'antd'
import Button from '../../../components/Button'
import { useDispatch ,useSelector} from 'react-redux'
import { AddBook, UpdateBook } from '../../../apicalls/books';
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice';
function Bookform({open,setOpen,reloadBooks,setFormType,setSelectedBook,selectedBook,formType}) {
    const {user}=useSelector(state=>state.users)

    const dispatch=useDispatch();
    const onFinish= async(values)=>{
       try{
          dispatch(ShowLoading())
          values.createdBy=user._id
          values.avaliableCopies=values.totalCopies
          // const response=await AddBook(values);
          let response=null;
          if(formType=="add")
          {
            values.avaliableCopies=values.totalCopies
            response=await AddBook(values);
          }
          else
          {
            values._id=selectedBook._id;
            response=await UpdateBook(values);
          }
          if(response.success)
          {
            message.success(response.message)
            reloadBooks();
            setOpen(false)
          }
          else{
            message.error(response.message)
          }
          dispatch(HideLoading())
       }
       catch(error)
       {
        dispatch(HideLoading())
        message.error(error.message)

       }
    }
  return (
    <Modal title={formType ==='add'?'Add book':"Update Book"} open={open} onCancel={()=>setOpen(false)}
    centered width={800} footer={null}>
    <Form layout="vertical" onFinish={onFinish} initialValues={{...selectedBook,publishedDate:selectedBook?.publishedDate?new Date(selectedBook?.publishedDate).toISOString().split("T")[0]:null}}>
       <Row gutter={[20]}>
        <Col span={24} >
            <Form.Item label="title" name="title"
            rules={[{ required: true, message: "Please input book title" }]}>
        <input type="text"/></Form.Item>
        </Col>
        <Col span={24}>
            <Form.Item label="Description" name="description" rules={[{
                required:true,message:"Fill in the details"
            }]}>
                <textarea type="text"/>
            </Form.Item>        </Col>
        <Col span={24}>
            <Form.Item label="ImageURL" name="image" rules={[{required:true, message:"Enter the url"}]}>
                <input type="text"/>
            </Form.Item>
        </Col>
        <Col span={8}>
            <Form.Item label="Author" name="author" rules={[{required:true,message:"Please enter the details"}]}>
                <input type="text" />
            </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Publisher" name="publisher" rules={[{required:true,message:"Please enter the details"}]}>
                <input type="text" />
            </Form.Item>
        </Col>
        
        <Col span={8}>
            <Form.Item
              label="Published Date"
              name="publishedDate"
              rules={[
                { required: true, message: "Please input published date" },
              ]}
            >
              <input type="date" />
            </Form.Item>
          </Col>

        <Col span={8}>
        <Form.Item label="Category" name="category" rules={[{required:true,message:"Please enter the details"}]}>
        <select>
                <option value="">Select Category</option>
                <option value="mythology">Mythology</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="biography">Biography</option>
                <option value="poetry">Poetry</option>
                <option value="drama">Drama</option>
                <option value="history">History</option>
              </select>
            </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Rent per day" name="rentPerDay" rules={[{required:true,message:"Please enter the details"}]}>
                <input type="text" />
            </Form.Item>        </Col>
            <Col span={8}>
        <Form.Item label="Total Copies" name="totalCopies" rules={[{required:true,message:"Please enter the details"}]}>
                <input type="text" />
            </Form.Item>        </Col>

       </Row>
       <div className='flex justify-end gap-2'>
        <Button variant="outlined" type="button" title="Cancel" onClick={()=>setOpen(false)}/>
        <Button title="Save" type="submit"/>
       </div>
    </Form>
    </Modal>
  )
}

export default Bookform