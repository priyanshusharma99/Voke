import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import InterviewStudio from './pages/InterviewStudio.jsx';
import QuestionBank from './pages/QuestionBank.jsx';
import ReviewReport from './pages/ReviewReport.jsx';
import Profile from './pages/Profile.jsx';
import Help from './pages/Help.jsx';
import NotFound from './pages/NotFound.jsx';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize GSAP defaults
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.6,
    });
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-background text-foreground">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/interview" element={<InterviewStudio />} />
              <Route path="/questions" element={<QuestionBank />} />
              <Route path="/review/:id" element={<ReviewReport />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" richColors />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
