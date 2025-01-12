import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { setEditProfile } from "../features/userSlice";

function HomePages() {

   const [id,setId]=useState(null)
   const [todo,setTodo]=useState([])
   const [text,setText]=useState('')
   const [popUpVisible,setPopUpVisible]=useState(false)
   const [editTodoId,setEditTodoId]=useState('')
   const [editText,setEditText]=useState('')
   const [user,setUser]=useState('')
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const {editprofile}=useSelector((state)=>state.user)
   const {URl}=useSelector((state)=>state.user)
   console.log(URl);
   const dispatch=useDispatch()
useEffect(()=>{
    const storId=localStorage.getItem('Id')
setId(storId)


    const fetchUser= async()=>{
        try {
            const response=await axios.get(`${URl}/api/v1/finduser/${id}`)

  setUser(response.data)
setTodo(response.data.todo)
setName(response.data.name)
setEmail(response.data.email)
setPhone(response.data.phone)




        } catch (error) {
            console.log(error);
            
        }

    }
    fetchUser()
},[id,URl])
const updatedvalueIS= async ()=>{
try {
    if(text.length>1){
        const updatedata=[...todo,{message:text}]
        const response= await axios.patch(`${URl}/api/v1/updatedtodo/${id}`,{ todo: updatedata })
        setText('')
        toast.dark(response.data.message)
    
    }else{
        toast.warning('not a text')
    }
    

} catch (error) {
    console.log(error.response);
    
}


}

const deleteValueis= async (toid)=>{
  
    const response= await axios.delete(`${URl}/api/v1/deletetodo/${id}/${toid}`)
    setTodo(response.data.user.todo)
    
    
}
const PopUpclik=(todoId,message)=>{
    setPopUpVisible((prevesval)=>!prevesval)
    setEditText(message)
    setEditTodoId(todoId)
}
const HandleEditSave=async ()=>{
    try {
        if(editText.length>1){
            const updatetodolist=todo.map((val)=>val._id==editTodoId?{...val,message:editText}:val)
       const response= await   axios.patch(`${URl}/api/v1/updatedtodo/${id}`,{todo:updatetodolist})
       setTodo(response.data.user.todo);
       
        setPopUpVisible(false)
            
            
        }
    } catch (error) {
        console.log(error);
        
    }
}
const handleProfileUpdate= async ()=>{
    try {
        const updatevalueis={name,email,phone}
     
        
        const response = await axios.patch(`${URl}/api/v1/updateprofile/${id}`, updatevalueis);
        setUser(response.data.user)
        dispatch(setEditProfile(false))
         toast.success('Profile updated successfully');
    } catch (error) {
        console.log(error);
        
    }
}
  return (
      <div className="backgorundbody">
          <picture className="homebackgroundimg" >
            <source srcSet="/img/1.jpg" media="(max-width: 600px)"/>
            <img src="/img/picutr.jpg" alt="" />
          </picture>
          <h1 className="textforintro">Hey {user.name}, remember your tasks and stay focused on accomplishing your goals!</h1>
<div className="inputtodopage" >
<input type="text" placeholder="Add your task" value={text} onChange={(e)=>setText(e.target.value)}/>
<button onClick={updatedvalueIS}>+</button>
</div>
         

<div className="todos-container">
            
              <table>
                  <tbody>
                      {todo.map((val, ind) => (
                          <tr className="todosinhome" key={ind}>
                              <td>{val.message}</td>
                             
                              <button   onClick={()=>PopUpclik(val._id,val.message)} className="editiconbutton"><img src="/img/pen-icon-png-7.png" className="editimagebutton"></img></button>
                              <button  onClick={()=>deleteValueis(val._id)}  className="deleticonbutton"><img src="/img/delet icon.png" className="deleteimagebutton"></img></button>
                             
                              </tr>
                      ))}
                  </tbody>
              </table>
          </div>

      {
        popUpVisible &&(
            <div className="popup-container">
                <div className="popup-content">
                    <h3 className="hedingEditTodo">Edit Todo</h3>
                    <input 
                    type="text" 
                    value={editText}
                    onChange={(e)=>setEditText(e.target.value)}
                    placeholder="edit your text"
                    />
        
                    <button className="savebuttoninedit" onClick={HandleEditSave}>save</button>
                    <button onClick={()=>setPopUpVisible(false)}>cancel</button>

                </div>

            </div>
        )
      }
      {
        editprofile&&(
            <div className="popup-container">
                <div className="popup-content">
                            <h3 className="hedingEditTodo">edit your profile</h3>
                            <input 
                            type="text"
                            value={name}
                            placeholder="enter your name"
                            onChange={(e)=>setName(e.target.value)}
                             />
                             <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Edit Email"
                     />
                     <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Edit Phone"
                     />
                     <button onClick={handleProfileUpdate}>save</button>
                     <button onClick={()=>dispatch(setEditProfile(false))}>cancel</button>
                </div>
            </div>
        )
      }
         
      </div>
  );
}

export default HomePages;
