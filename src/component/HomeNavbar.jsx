import  { useState } from 'react';
import './css/navabar.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEditProfile } from '../features/userSlice';
function HomeNavbar() {
    const [isDropdownVisible,setIsDropdownVisible]=useState(false)
    
   const deispatch= useDispatch()
    
    const navigate=useNavigate()
    const toggleDropdown = () => {
        setIsDropdownVisible((prevState) => !prevState);
      };
      const handleLogout=()=>{
        localStorage.removeItem('Id');
navigate('/login')
      }
      const editClickprofile=()=>{
        deispatch(setEditProfile(true))
        
        
      }
  return (
    <div>
         <header className='allheader'>

<h1 className='hedingname'>Todo App</h1>
<nav>
 <ul className='urloflist'>
     
     <li className="dropdown" onClick={toggleDropdown}>
        <img src="https://cdn-icons-png.flaticon.com/512/3682/3682281.png" alt="" className='imageofnav'/>
        {isDropdownVisible && (
                <ul className="dropdown-menu">
                  <li><button href="/edit-profile" className="logoutbutton" onClick={editClickprofile}>Edit Profile</button></li>
                  <li><button className="logoutbutton" onClick={handleLogout}>Logout</button></li>
                </ul>
              )}
     </li>

 </ul>
 
</nav>
</header>
    </div>
  )
}

export default HomeNavbar
