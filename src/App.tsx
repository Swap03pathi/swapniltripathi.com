import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundLayer from './components/BackgroundLayer';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import ProjectPage from './pages/ProjectPage';
import ProjectArchitecturePage from './pages/ProjectArchitecturePage';
import ComingSoonPage from './pages/ComingSoonPage';
import AppleExperiencePage from './pages/AppleExperiencePage';
import EyExperiencePage from './pages/EyExperiencePage';
import OyoExperiencePage from './pages/OyoExperiencePage';
import TestbookExperiencePage from './pages/TestbookExperiencePage';
import SarasExperiencePage from './pages/SarasExperiencePage';
import SarasSystemArchitecturePage from './pages/saras/SarasSystemArchitecturePage';
import { hasPendingSarasScrollRestore } from './utils/sarasScrollRestore';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (hasPendingSarasScrollRestore(location.pathname, location.state)) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.state]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-dark text-white font-sans">
        <BackgroundLayer />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/experience/saras" element={<SarasExperiencePage />} />
          <Route path="/experience/apple" element={<AppleExperiencePage />} />
          <Route path="/experience/testbook" element={<TestbookExperiencePage />} />
          <Route path="/experience/oyo" element={<OyoExperiencePage />} />
          <Route path="/experience/ey" element={<EyExperiencePage />} />
          <Route path="/experience/:slug" element={<ExperienceDetailPage />} />
          <Route
            path="/saras/systems/realtime-ingestion"
            element={<SarasSystemArchitecturePage system="realtime-ingestion" />}
          />
          <Route
            path="/saras/systems/realtime-execution"
            element={<SarasSystemArchitecturePage system="realtime-execution" />}
          />
          <Route
            path="/saras/systems/market-intelligence"
            element={<SarasSystemArchitecturePage system="market-intelligence" />}
          />
          <Route
            path="/project/:slug/architecture"
            element={<ProjectArchitecturePage />}
          />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/thoughts" element={<ComingSoonPage title="Thoughts" />} />
          <Route path="/me" element={<ComingSoonPage title="Me" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
