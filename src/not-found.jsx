import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NotFound from './pages/NotFound.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotFound />
  </StrictMode>,
);
