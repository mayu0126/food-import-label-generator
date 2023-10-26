//import { useState } from 'react'
//import { Dialog } from '@headlessui/react'
//import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import React from 'react';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="bg-white">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;