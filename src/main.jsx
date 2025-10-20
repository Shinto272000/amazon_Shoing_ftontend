import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import axios from 'axios';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx';

axios.defaults.baseURL = 'https://amazon-shop-backend-zptc.onrender.com/api';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </CartProvider>
  </StrictMode>
);
