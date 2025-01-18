import { useState } from 'react'
import '../component/css/registrationpage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

function Registration() {
  const [email,SetEmail]=useState('')
  const [password,setPassword]=useState('')
  const [phone,setPhone]=useState('')
  const [name,setName]=useState('')
  const {URl}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const onregistration=async (e)=>{
    e.preventDefault(); 
    const trimmedEmail = email.trim()

try {
  const response= await axios.post(`${URl}/api/v1/register`,{email:trimmedEmail,password,phone,name})

if(response.data.success){
  toast.success(response.data.message)
navigate('/login')
}else{
  toast.warning(response.data.message)
}

  
} catch (error) {
  
  console.log(error);
  
}




  }
  return (
    <div className='registrationbackground'>

      <div className='registrationcard'>
      <a href="/" ><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="" className='hominregistration'/></a>
                 <form onSubmit={onregistration}>
                    <div className='registrationform'>
                        <label htmlFor="email" >email</label>
                        <input type="text" placeholder='enter email' required value={email} onChange={(e)=>SetEmail(e.target.value)}/>
                    </div>
                    <div className='registrationform'>
                        <label htmlFor="password">password</label>
                        <input type="text" placeholder='enter password' required value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className='registrationform'>
                        <label htmlFor="phone" >phone</label>
                        <input type="text" placeholder='enter mobile number' value={phone} required onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    <div className='registrationform'>
                        <label htmlFor="name">name</label>
                        <input type="text" placeholder='enter name' required value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <button type='submit' className='registerbutton'>sign up</button>
                 </form>
      </div>
    </div>
  )
}

export default Registration
