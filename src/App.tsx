/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardView } from './views/DashboardView';
import { LoginView } from './views/LoginView';
import { BackendView } from './views/BackendView';
import './index.css';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/backend" element={<BackendView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

