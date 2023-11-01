//import { useState } from 'react'
//import { Dialog } from '@headlessui/react'
//import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
//import { Outlet, Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import React from 'react';
import Header from './components/Header';

import HomePage from './pages/HomePage';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import UserProfile from './pages/UserProfile';
import UserLabels from './pages/UserLabels';
import LabelTranslation from './pages/LabelTranslation';


function App() {
  return (
    <div className="bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="/mylabels" element={<UserLabels />} />
        <Route path="/addnewlabel" element={<LabelTranslation />} />
      </Routes>
    </div>
  );
}

export default App;