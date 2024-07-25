import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> (отключаем, иначе при старте приложения дублирует запрос(на начальный запрос получаем два одинаковых ответа))
    <App />
  // </React.StrictMode>
);


