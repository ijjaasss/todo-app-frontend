import { useSelector } from "react-redux";
import Footer from "../component/Footer"
import HomeNavbar from "../component/HomeNavbar"
import HomePages from "../component/HomePages"



function TestPage() {
 
  const {URl}=useSelector((state)=>state.user)
    console.log(URl);
    
  return (
    <div>
      <HomeNavbar />
      <HomePages />

<Footer />
    </div>
  )
}

export default TestPage
