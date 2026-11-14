import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import { AboutPage, ProjectsPage, ProjectDetailPageWrapper, GalleryPage, ContactPage, BlogsPage } from './Pages';
import { ScrollBar } from './ui';
import { FloatActions } from './chrome';
import './styles.css';
import './theme.css';

function BlogRedirect() {
  useEffect(() => {
    window.location.replace('https://www.geminfinity.co.in/blog/');
  }, []);
  return null;
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { 
      window.scrollTo(0, 0); 
      return; 
    }
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <ScrollBar />
      <FloatActions />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPageWrapper />} />
        <Route path="/gallery" element={<GalleryPage />} />
        {/* Official GEM Group Insights & News Page with Header & Footer */}
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/*" element={<BlogsPage />} />
        <Route path="/blogs/*" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Legacy alias redirects to dedicated RRR Sree Sreenivasa County project page */}
        <Route path="/sree-sreenivasa-county/*" element={<ProjectDetailPageWrapper />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
