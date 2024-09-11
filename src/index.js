// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Layout from './components/Layout';
import TodoPage from './pages/TodoPage';
import AuthPage from './pages/AuthPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use the Layout component
    children: [
      {
        path: '/',
        element: <TodoPage />,
      },
      {
        path: '/login',
        element: <AuthPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={appRouter} />
      </DndProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
