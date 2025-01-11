import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import './app.css'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import TestPage from './pages/TestPage.jsx'
import Registration from './pages/Registration.jsx'

function App() {

  return (

  <BrowserRouter>
  <Routes>
    <Route path='/' element={<HomePage />}/>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Registration />}/>
    <Route path='/test' element={<TestPage />}/>
  </Routes>
  </BrowserRouter>

    
  )
}

export default App
