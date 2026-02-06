import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { HomePage } from '@/pages/feeds/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { PostPage } from '@/pages/posts/PostPage';
import { UserPage } from '@/pages/user-profile/UserPage';
import { NavBar } from '@/features/navbar';

export default function App() {

  return (
    <BrowserRouter>
      <NavBar/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}
