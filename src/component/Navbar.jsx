// import React from 'react'
import './css/navabar.css'

function Navbar() {
  return (
   
   <header className='allheader'>

   <h1 className='hedingname' >Todo App</h1>
   <nav>
    <ul className='urloflist'>
        
        <li><a href="/login" className='linkofnav'>login</a></li>
        <li><a href="/register" className='linkofnav'>register</a></li>
        <li><a href="/" className='linkofnav'><img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="" className='hominlogin'/></a></li>

    </ul>
    
   </nav>
   </header>
   
  )
}

export default Navbar
