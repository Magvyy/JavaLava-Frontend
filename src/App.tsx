import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'

import Home from "./Home"
import Login from "./auth/Login"
import Register from './auth/Register';
import Secret from "./Secret"
import PostCard from "./posts/PostCard"
import Logout from "./auth/Logout"


export default function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/secret">secret</Link> |{" "}
        <Link to="/post/view/1">post</Link> |{" "}
        <Link to="/logout">logout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/post/:mode/:id" element={<PostCard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}
