import { Link } from 'react-router-dom';
import { React, useContext, useState } from 'react';
import { UserContext } from '../../index.js';

const navigation = [
  { name: 'About us', href: 'aboutus' },
  { name: 'Features', href: 'features' },
  { name: 'Company', href: 'company' },
  { name: 'Feedbacks', href: 'feedbacks' },
];

const Header = () => {
  const context = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCloseIcon, setIsCloseIcon] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCloseIcon(!isCloseIcon);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">

        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <img
              className="h-16 w-auto"
              src="https://i.pinimg.com/originals/bd/f7/54/bdf7546457ed6eabd9bafb318e4e07e0.png"
              alt=""
            />
            <span className="text-6xl font-semibold ml-1 mt-1 text-rose-600" style={{ fontFamily: 'Allura, cursive' }}>
              Raberu
            </span>
          </Link>
        </div>

        <div className="lg:hidden">
          <div className="flex items-center">

            <button
              className="text-gray-900 p-2 focus:outline-none focus:ring"
              onClick={toggleMenu}
            >
              {isCloseIcon ? (
                // X ikon
                <svg
                  className="h-6 w-6 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger ikon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
            {isMenuOpen && (
              <div className="absolute top-16 right-0 w-48 bg-white border border-gray-200 rounded-lg p-2">
                {context.user ? (
                  <>
                    {navigation.map((item) => (
                      <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 block px-4 py-2 text-gray-900 hover:bg-gray-100">
                        {item.name}
                      </Link>
                    ))
                    }
                    <p className="border-t border-gray-200 px-4 py-2 font-semibold text-rose-600 pointer-events-none">{context.user.userName}</p>
                    <hr className="w-full border-t border-gray-200 my-1" />
                    <Link to="/myprofile" className="text-sm block px-4 py-2 text-gray-900 hover:bg-gray-100">
                      Account information
                    </Link>
                    <Link to="/mylabels" className="text-sm block px-4 py-2 text-gray-900 hover:bg-gray-100">
                      My labels
                    </Link>
                    <Link to="/addnewlabel" className="text-sm block px-4 py-2 text-gray-900 hover:bg-gray-100">
                      Add new label
                    </Link>
                    <Link to="/translation" className="text-sm block px-4 py-2 text-gray-900 hover:bg-gray-100">
                      Translation feature
                    </Link>
                    <Link to="/" className="border-t border-gray-200 text-sm font-semibold leading-6 block px-4 py-2 text-gray-900 hover:bg-gray-100">
                      <button type="button" onClick={context.logout}>
                        Log Out <span aria-hidden="true">&rarr;</span>
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                  {navigation.map((item) => (
                    <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 block px-4 py-2 text-gray-900 hover:bg-gray-100">
                      {item.name}
                    </Link>
                  ))
                  }
                  <Link to="/register" className="border-t border-gray-200 text-sm font-semibold leading-6 block px-4 py-2 text-rose-600 hover:bg-gray-100">
                    Register <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link to="/login" className="text-sm font-semibold leading-6 block px-4 py-2 text-rose-600 hover:bg-gray-100">
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                </>
                )}
              </div>
            )}
          </div>
        </div>


        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </Link>
          ))}
        </div>
        {!context.user && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/register" className="mr-12 text-sm font-semibold leading-6 text-rose-600">
              Register <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/login" className="text-sm font-semibold leading-6 text-rose-600">
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
                  <li className="px-4 py-2 font-semibold text-gray-900 pointer-events-none">{context.user.userName}</li>
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
                  <li>
                    <Link to="/translation" className="text-sm block px-4 py-2 text-gray-900 hover:bg-gray-100">
                      Translation feature
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
};

export default Header;