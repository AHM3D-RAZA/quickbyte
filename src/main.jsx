import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthModalProvider } from '/src/context/AuthModalContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthModalProvider>
          console.log("API URL:", import.meta.env.VITE_API_URL);
          <App />
        </AuthModalProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);