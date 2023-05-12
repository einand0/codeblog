import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './index.css'

//pages
import Home from './components/pages/Home'
import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'
import MyPosts from "./components/pages/Posts/MyPosts"
import EditPost from './components/pages/Posts/EditPost'
import Profile from './components/pages/User/Profile'

//components
import Navbar from './components/layout/Navbar'
import Container from "./components/layout/Container"

//context
import { UserProvider } from './context/UserContext'
import AddPost from './components/pages/Posts/AddPost'

function App() {

  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/post/myposts" element={<MyPosts />}></Route>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/post/add" element={<AddPost />}></Route>
            <Route path='/post/edit/:id' element={<EditPost />}></Route>
            <Route path="/" exact element={<Home />}></Route>
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  )
}

export default App
