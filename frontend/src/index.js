import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import HomePage from './pages/HomePage';
import Register from './pages/Register';
import LogIn from './pages/LogIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },      
    ],
  },
]);

export const UserContext = React.createContext();
const root = ReactDOM.createRoot(document.getElementById('root'));

const Index = () => {
  const [user, setUser] = React.useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      <React.StrictMode>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </React.StrictMode>
    </UserContext.Provider>
  );
};

root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
