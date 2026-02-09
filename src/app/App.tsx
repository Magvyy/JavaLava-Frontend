import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { HomePage } from '@/pages/feeds/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ReadPostPage } from '@/pages/posts/ReadPostPage';
import { UserPage } from '@/pages/user-profile/UserPage';
import { useAuthenticateMe } from '@/shared/hooks/useAuthenticateMe';
import { EditPostPage } from '@/pages/posts/EditPostPage';
import { CreatePostPage } from '@/pages/posts/CreatePostPage';

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
        <Route path="/profile" element={<UserPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/post/:id" element={<ReadPostPage />} />
        <Route path="/post/edit/:id" element={<EditPostPage />} />
        <Route path="/post/create" element={<CreatePostPage />} />
      </Routes>
    </BrowserRouter>
  )
}
