import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages hydrate. The dev server serves an empty root and renders.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
