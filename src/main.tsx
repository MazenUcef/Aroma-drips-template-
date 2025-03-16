import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AccessibilitySettings from './components/AccessibilitySettings.tsx'
import { ThemeProvider } from './context/themeContext.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <AccessibilitySettings />
    </ThemeProvider>
  </StrictMode>
);
