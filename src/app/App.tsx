import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { HomePage } from '@/pages/feeds/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ReadPostPage } from '@/pages/posts/ReadPostPage';
import { UserPage } from '@/pages/feeds/UserPage';
import { EditPostPage } from '@/pages/posts/EditPostPage';
import Layout from './Layout';
import Secret from '@/features/secret/Secret';
import { Conversation } from '@/pages/conversation/Conversation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FriendFeed } from '@/pages/feeds/FriendFeed';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <div id="page-content" className="w-full flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/friends" element={<FriendFeed />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<UserPage />} />
              <Route path="/user/:userId" element={<UserPage />} />
              <Route path="/posts/:id" element={<ReadPostPage />} />
              <Route path="/posts/edit/:id" element={<EditPostPage />} />
              <Route path="/empty" element={<Secret />} />
              <Route path="/conversation/:id" element={<Conversation />} />
            </Routes>
          </div>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
