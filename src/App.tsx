import React, { FC } from 'react';

import './App.css';
import { Main, QrCode } from './pages';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: '/Main',
    element: <Main />
  },
  {
    path: '/code',
    element: <QrCode />
  },
  {
    path: '/:whatsapp',
    element: <Main />
  },
  {
    path: '/:query',
    element: <Main />
  },
]);

const App:FC =()=>{
  return (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  );
}

export default App;