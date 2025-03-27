
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use strict mode for development but not in production to prevent double effects
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(<App />);
