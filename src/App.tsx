import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundLayer from './components/BackgroundLayer';
import { hasPendingSarasScrollRestore } from './utils/sarasScrollRestore';

// Route pages are code-split so each chunk loads only when its route is visited.
const HomePage = lazy(() => import('./pages/HomePage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ExperienceDetailPage = lazy(() => import('./pages/ExperienceDetailPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ProjectArchitecturePage = lazy(() => import('./pages/ProjectArchitecturePage'));
const MePage = lazy(() => import('./pages/MePage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AppleExperiencePage = lazy(() => import('./pages/AppleExperiencePage'));
const EyExperiencePage = lazy(() => import('./pages/EyExperiencePage'));
const OyoExperiencePage = lazy(() => import('./pages/OyoExperiencePage'));
const TestbookExperiencePage = lazy(() => import('./pages/TestbookExperiencePage'));
const SarasExperiencePage = lazy(() => import('./pages/SarasExperiencePage'));
const SarasSystemArchitecturePage = lazy(
  () => import('./pages/saras/SarasSystemArchitecturePage')
);

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
        <Suspense fallback={null}>
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
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          {/* Old orphan route — keep any saved links working */}
          <Route path="/thoughts" element={<Navigate to="/blogs" replace />} />
          <Route path="/me" element={<MePage />} />
        </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
