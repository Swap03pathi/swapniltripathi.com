import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import StarField from './components/StarField';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import ProjectPage from './pages/ProjectPage';
import ComingSoonPage from './pages/ComingSoonPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-dark text-white font-sans">
        <StarField />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/experience/:slug" element={<ExperienceDetailPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/thoughts" element={<ComingSoonPage title="Thoughts" />} />
          <Route path="/me" element={<ComingSoonPage title="Me" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
