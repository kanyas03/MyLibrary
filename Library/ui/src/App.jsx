import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AddBook from './pages/Addbook'
import UpdateBook from './pages/Update'
import AdminHome from './pages/Adminhome'
import Home from './pages/Userhome'
import AdminBookList from './pages/AdBooklist'
import UserList from './pages/Userdetails'
import ViewBooks from './pages/ViewBooks'
import MyCollections from './pages/Collection'




const App=()=> {


  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Signup/>}/> 
    <Route path='/login' element={<Login/>}/>
    <Route path='/addbook' element={<AddBook/>}/>
    <Route path='/update' element={<UpdateBook/>}/>
    <Route path='/adminHome' element={<AdminHome/>}/>
    <Route path='/adminbook' element={<AdminBookList/>}/>
    <Route path='/userdetails' element={<UserList/>}/>
    <Route path='/updateBook/:bookId' element={<UpdateBook/>}/>
    <Route path='/userhome' element={<Home/>}/>
    <Route path='/viewBooks' element={<ViewBooks/>}/>
    <Route path='/collections' element={<MyCollections/>}/>
    
    
  
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
