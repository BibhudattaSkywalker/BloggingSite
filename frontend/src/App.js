import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import BlogForm from './components/BlogForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/Profile';
import WaveBackground from './components/WaveBackground';
import Example from './components/Div';
import { Loader } from './components/Common/Loader';

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
    };
    load();
  }, []);
  
  if (loading) return <Loader/>
  return (
    <AuthProvider>
      
      <Router>
        {/* Optional: Uncomment this if you want the Header on all pages */}
        {/* <Header /> */}
        <Example/>
        <WaveBackground />

        {/* Background Div */}
        <div className="relative min-h-screen bg-gray-100 py-8">
          <div className="absolute inset-0 bg-[url('/360_F_626577500_SkdU1LpQsy5pdQTp17DU8no8SsFoiPnD.jpg')] bg-cover bg-center opacity-50"></div>
          
          {/* Main Content */}
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blogs/:blogId" element={<BlogDetail />} />
              <Route path="/create" element={<BlogForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
