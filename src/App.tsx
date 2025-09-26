import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import StreamPage from './pages/StreamPage.jsx';
import GovJobs from './pages/GovJobs.jsx';
import Analytics from './pages/Analytics.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stream/:id" element={<StreamPage />} />
        <Route path="/government-jobs" element={<GovJobs />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}

export default App;