import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../index.js';

const navigation = [
  { name: 'About us', href: 'aboutus' },
  { name: 'Features', href: 'features' },
  { name: 'Company', href: 'company' },
  { name: 'Feedbacks', href: 'feedbacks' },
];

function Header() {

  const context  = useContext(UserContext);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img
              className="h-20 w-auto"
              src="https://i.pinimg.com/originals/bd/f7/54/bdf7546457ed6eabd9bafb318e4e07e0.png"
              alt=""
            />
            <span className="text-xl font-bold leading-6 text-rose-600 hover:text-rose-500">RABERU</span>
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </a>
          ))}
        </div>
        {!context.user && (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/register" className="mr-12 text-sm font-semibold leading-6 text-gray-900">
            Register <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        )}
        {context.user && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/myprofile" className="mr-12 text-sm font-bold leading-6  text-rose-600 hover:text-rose-500">
              My profile 
            </Link>
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
                <button type="button" onClick={context.logout}>
                  Log Out <span aria-hidden="true">&rarr;</span>
                </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;