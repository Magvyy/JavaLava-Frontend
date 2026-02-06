import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { HomePage } from '@/pages/feeds/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { PostPage } from '@/pages/posts/PostPage';
import { UserPage } from '@/pages/user-profile/UserPage';
import { useAuthenticateMe } from '@/shared/hooks/useAuthenticateMe';

export default function App() {
  const { user } = useAuthenticateMe();

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        {(user) && <Link to={"/user/" + user.id}>Profile</Link>}
      </nav>

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
