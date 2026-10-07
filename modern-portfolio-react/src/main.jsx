import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import NotFound from './pages/NotFound.jsx';
import { hideLoader } from './utils/loader.js';
import './styles/index.css';

// Any path other than the site root renders the 404 page
// (covers dev server & hosts that fall back to index.html).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
const path = window.location.pathname.replace(/\/+$/, '').replace(/\/index\.html$/, '');
const isHome = path === base || path === '';

if (!isHome) {
  document.title = 'Page not found | Ledion Imeri';
  document.documentElement.classList.add('no-loader');
}

createRoot(document.getElementById('root')).render(<StrictMode>{isHome ? <App /> : <NotFound />}</StrictMode>);
hideLoader();
