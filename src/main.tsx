import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';

// The export MUST be named `createRoot` (vite-react-ssg convention).
export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL });
