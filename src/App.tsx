import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'

import Home from "./Home"
import Login from "./auth/Login"
import Register from './auth/Register';
import Secret from "./Secret"


export default function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/secret">secret</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/secret" element={<Secret />} />
      </Routes>
    </BrowserRouter>
  )
}
