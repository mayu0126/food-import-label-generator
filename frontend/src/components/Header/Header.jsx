import { Link } from 'react-router-dom';
import { React, useContext, useState } from 'react';
import { UserContext } from '../../index.js';

const navigation = [
  { name: 'About us', href: 'aboutus' },
  { name: 'Features', href: 'features' },
  { name: 'Company', href: 'company' },
  { name: 'Feedbacks', href: 'feedbacks' },
];

function Header() {

  const context  = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="relative group">
            <button
              className="mr-12 text-sm font-bold leading-6 text-rose-600 hover:text-rose-500 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              My profile {isMenuOpen ? <span aria-hidden="true">&uarr;</span> : <span aria-hidden="true">&darr;</span>}
            </button>
            {isMenuOpen && (
              <ul className="absolute w-[max-content] left-0 mt-2 space-y-2 bg-white border border-gray-200 rounded-lg p-2" onMouseLeave={() => setIsMenuOpen(false)}>
                <li className="px-4 py-2 font-semibold text-gray-900 pointer-events-none">
                  {context.user.userName}
                </li>
                <li>
                  <hr className="w-full border-t border-gray-200 my-1" />
                </li>
                <li>
                  <Link to="/myprofile" className="text-sm block px-4 py-2 text-gray-900 hover:bg-gray-100">
                    Account information
                  </Link>
                </li>
                <li>
                  <Link to="/mylabels" className="text-sm block px-4 py-2 text-gray-900 hover:bg-gray-100">
                    My labels
                  </Link>
                </li>
                <li>
                  <Link to="/addnewlabel" className="text-sm block px-4 py-2 text-gray-900 hover:bg-gray-100">
                    Add new label
                  </Link>
                </li>
              </ul>
            )}
          </div>
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