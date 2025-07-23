import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import { Toaster } from './components/ui/sonner.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster className='!font-iranyekan-medium' dir='rtl' richColors={true} position='top-center' />
    </BrowserRouter>
  </StrictMode>,
)
