import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { HomePage } from '@/pages/feeds/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ReadPostPage } from '@/pages/posts/ReadPostPage';
import { UserPage } from '@/pages/user-profile/UserPage';
import { EditPostPage } from '@/pages/posts/EditPostPage';
import { CreatePostPage } from '@/pages/posts/CreatePostPage';
import Layout from './Layout';
import Secret from '@/features/secret/Secret';
// import { Conversation } from '@/pages/conversation/Conversation';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div id="page-content" className="py-5 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
            <Route path="/post/:id" element={<ReadPostPage />} />
            <Route path="/post/edit/:id" element={<EditPostPage />} />
            <Route path="/post/create" element={<CreatePostPage />} />
            <Route path="/empty" element={<Secret />} />
            {/* <Route path="/conversation/:id" element={<Conversation />} /> */}
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  )
}
