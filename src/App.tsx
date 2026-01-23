import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'

import Home from "./Home"
import Login from "./auth/Login"
import Register from './auth/Register';
import Secret from "./Secret"
import Post from "./posts/Post"


export default function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/secret">secret</Link> |{" "}
        <Link to="/post">post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/post" element={<Post mode="view" />} />
      </Routes>
    </BrowserRouter>
  )
}
