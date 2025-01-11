import Navbar from '../component/Navbar'
import HomeBody from '../component/HomeBody'
import Footer from '../component/Footer'
import { useEffect, useState } from 'react'
import HomeNavbar from '../component/HomeNavbar'
import HomePages from '../component/HomePages'


function HomePage() {
  const [id,setId]=useState(null)

useEffect(()=>{
const storId=localStorage.getItem('Id')
setId(storId)
},[])



  return (
    <div>
     
        {
          id?(
            <>
         <HomeNavbar />
       <HomePages />
       <Footer />
            </>
          ):(
            <>
               <Navbar />
        <HomeBody />
        <Footer />

            </>
          )
        }
   
      
    </div>
  )
}

export default HomePage
