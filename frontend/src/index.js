import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
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
*/

export const UserContext = React.createContext();
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
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

reportWebVitals();
