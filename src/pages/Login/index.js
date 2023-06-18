import React ,{useEffect}from 'react'
import { Form, message} from "antd";
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
function Login() {
    const dispatch=useDispatch();
    const onFinish= async(values)=>{
        try{
          dispatch(ShowLoading())
          const response= await LoginUser(values)
          dispatch(HideLoading())
          if(response.success)
          {
            message.success(response.message)
            localStorage.setItem("token",response.data)
            window.location.href="/"
          }
          else
          {
            message.error(response.message)
          }
        }
        catch(error){
            dispatch(HideLoading())
           message.error(error.message)
        }
    }
    useEffect(() => {
      const token=localStorage.getItem("token")
      if(token)
      {
        window.location.href="/"
      }
    }, [])
    
  return (
    <div className="bg-primary h-screen flex items-center justify-center">
        <div className='authentication-form bg-white p-3 '>
            <h1 className='text-secondary text-2xl text-bold mb-1'>Library--LOGIN</h1>
         <hr />
         <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="email" label="Email" rules={[{
                required:true,
                message:"You can't keep this field empty"

            }]}>
                <input type="text" placeholder="Email"/>
            </Form.Item>
            
            <Form.Item name="password" label="Password" rules={[{
                required:true,
                message:"You can't keep this field empty"

            }]}>
                <input type="password" placeholder="password"/>
            </Form.Item>
           
            <div className='text-center mt-2 flex flex-column gap-1'>
            <Button title='Login' type="submit"/>
                <Link to="/register" className="underline text-primary text-sm text-bold">Don't  have an account? Click here to register</Link>
            </div>
         </Form>
        </div>
    </div>
  )
}

export default Login