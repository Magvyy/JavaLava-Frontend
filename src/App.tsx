import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'

import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import Register from './pages/auth/Register';
import Secret from "./pages/secret/Secret"
import PostCard from "./pages/posts/PostCard"
import Logout from "./pages/auth/Logout"


export default function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/secret">secret</Link> |{" "}
        <Link to="/post/create">post</Link> |{" "}
        <Link to="/logout">logout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/post/:mode/:id" element={<PostCard />} />
        <Route path="/post/:mode" element={<PostCard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}
