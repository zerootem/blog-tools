import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import ToolsList from './pages/ToolsList';
import ToolDetail from './pages/ToolDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <MainLayout>
          <ToolsList />
        </MainLayout>
      } />
      <Route path="/tool/:id" element={
        <MainLayout>
          <ToolDetail />
        </MainLayout>
      } />
    </Routes>
  );
}

export default App;
