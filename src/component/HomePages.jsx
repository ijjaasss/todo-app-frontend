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
   const [showingPopUp,setShowingPopUp]=useState(false)
   const [editTodoId,setEditTodoId]=useState('')
   const [editText,setEditText]=useState('')
   const [user,setUser]=useState('')
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const {editprofile}=useSelector((state)=>state.user)
   const {URl}=useSelector((state)=>state.user)
   const [popupTextHeding,setPopupTextHeding]=useState('')
   const [popupDescription,setPopupDescription]=useState('')
  const [addValuePopUp,setAddValuePopUp]=useState(false)
  const [description,setDescription]=useState('')
  const [editdiscription,setEditdescription]=useState('')
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
    if(text.length>1&&description.length>1){
        const updatedata=[...todo,{message:text,description:description}]
        const response= await axios.patch(`${URl}/api/v1/updatedtodo/${id}`,{ todo: updatedata })
      
        setTodo(response.data.user.todo)
        setText('')
        setDescription('')
        setAddValuePopUp(false)
    }else{
        toast.warning('pleas fill text')
    }
    

} catch (error) {
    console.log(error.response);
    
}


}

const deleteValueis= async (toid)=>{
  
    const response= await axios.delete(`${URl}/api/v1/deletetodo/${id}/${toid}`)
    console.log(response.data.user);
    
    setTodo(response.data.user.todo)
    
    
}
const PopUpclik=(todoId,message,descriptionnn)=>{
    setPopUpVisible((prevesval)=>!prevesval)
    setEditText(message)
    setEditTodoId(todoId)
    setEditdescription(descriptionnn)
}
const HandleEditSave=async ()=>{
    try {
        if(editText.length>1){
            const updatetodolist=todo.map((val)=>val._id==editTodoId?{...val,message:editText,description:editdiscription}:val)
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
const fullShow=(hedding,description)=>{
    setPopupDescription(description)
   
    setPopupTextHeding(hedding)
    setShowingPopUp(true)
}

  return (
      <div className="backgorundbody">
          <picture className="homebackgroundimg" >
            <source srcSet="/img/1.jpg" media="(max-width: 600px)"/>
            <img src="/img/picutr.jpg" alt="" />
          </picture>
          <h1 className="textforintro">Hey {user.name}, remember your tasks and stay focused on accomplishing your goals!</h1>
<div className="inputtodopage" >
  
{/* <input type="text" placeholder="Add your task" value={text} onChange={(e)=>setText(e.target.value)}/> */}
<button onClick={()=>setAddValuePopUp(true)}>+</button>
</div>
         

<div className="todos-container">
            
              <table>
                  <tbody>
                      {todo.map((val, ind) => (
                          <tr className="todosinhome" key={ind} >
                              <td onClick={()=>fullShow(val.message,val.description)}>{val.message}</td>
                             
                              <button   onClick={()=>PopUpclik(val._id,val.message,val.description)} className="editiconbutton"><img src="/img/pen-icon-png-7.png" className="editimagebutton"></img></button>
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
                    <input 
                    type="text" 
                    value={editdiscription}
                    onChange={(e)=>setEditdescription(e.target.value)}
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
      {
        showingPopUp&&(
            <div className="popup-container">
                <div className="popup-content">
                <h3 className="hedingEditTodo">{popupTextHeding}</h3>
                <p className="valuparagraphdescription">{popupDescription}</p>
                <button onClick={()=>setShowingPopUp(false)}>back</button>
                </div>
            </div>
        )
      }
      {
        addValuePopUp&&(
            <div className="popup-container">
                   <div className="popup-content">
                   <h3 className="hedingEditTodo">add your task</h3>
                   <input 
                    type="text" 
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    placeholder="task "
                    />
                     <input 
                    type="text" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="description"
                    />
                    <button onClick={updatedvalueIS}>save</button>
                    <button onClick={()=>setAddValuePopUp(false)}>back</button>
                   </div>
            </div>
        )
      }
         
      </div>
  );
}

export default HomePages;
