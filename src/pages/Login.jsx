import axios from 'axios'
import '../component/css/loginpage.css'
import  { useState } from 'react'
import { toast } from 'react-toastify'
import { setUser } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Login() {
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const navigate=useNavigate()
 const {URl}=useSelector((state)=>state.user)
const dispatch=useDispatch()
const onLogin= async (e)=>{
   
    e.preventDefault(); 
    try {
      const response= await  axios.post(`${URl}/api/v1/login`,{email,password})
      
      if(response.data.success){
        toast.success(response.data.message)
        
        
        dispatch(setUser({
          user: response.data.user,  
          id: response.data.user._id,  
        }));
     navigate('/')
        
     localStorage.setItem('Id', response.data.user._id);
       
      }
      
    } catch (error) {
        toast.warning(error.response.data.message)
        console.log('error is',error.response.data);
        
    }
   

    
}
  return (
    <div className='loginbackground'>

      
        <div className="cardforlogin">
            <a href="/" >
            <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="" className='hominlogin'/>
            </a>
            <form onSubmit={onLogin}>
                <div className='logininput'> 
                    <label htmlFor="email">Email</label>
                    <input type="text" required placeholder='enter email..' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='logininput'>
                    <label htmlFor="password" >password</label>
                    <input type="text" required placeholder='enter password..'value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type='submit' className='loginbutton'>login</button>
            </form>

        </div>
      
    </div>
  )
}

export default Login
