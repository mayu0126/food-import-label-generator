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
import LabelDetails from './pages/LabelDetails';
import GoogleTranslation from "./pages/GoogleTranslation";
import AboutUs from "./pages/AboutUs";
import Features from "./pages/Features";
import Company from "./pages/Company";
import Feedbacks from "./pages/Feedbacks";
import Glossary from "./pages/Glossary";


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
        <Route path="/details/:id" element={<LabelDetails />} />
        <Route path="/translation" element={<GoogleTranslation />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/company" element={<Company />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/glossary" element={<Glossary />} />
      </Routes>
    </div>
  );
}

export default App;