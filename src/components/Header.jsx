import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useCategory } from '../context/CategoryContext';

// Temporary comment to force reload

const Header = () => {
  const [user, setUser] = useState(null);
  const [isHoveringAccount, setIsHoveringAccount] = useState(false); // New state for hover
  const { cart, fetchCart, clearCart } = useCart(); // Added clearCart
  const { selectedCategory, setSelectedCategory } = useCategory();
  const navigate = useNavigate(); // Import useNavigate

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      axios.get(`/auth/user/${storedUserId}`)
        .then(response => {
          setUser(response.data.user);
          fetchCart(); // Fetch cart when user is loaded
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          // If token is invalid or user not found, clear local storage
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          setUser(null);
          clearCart();
        });
    }
  }, []);

  const cartItemCount = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    clearCart();
    navigate('/'); // Navigate to sign-in page
  };

  return (
    <header className="bg-gray-800 text-white p-2 md:p-3 flex items-center justify-between flex-wrap">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 mr-4">
        <Link to="/">
          <img
            className="w-20 md:w-24 cursor-pointer object-contain"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-grow flex items-center mx-2 md:mx-4 order-3 md:order-2 w-full md:w-auto mt-2 md:mt-0">
        {/* Category Dropdown */}
        <select
          className="p-2 h-full rounded-l-md focus:outline-none bg-gray-200 text-black text-sm border-r border-gray-300"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Women's Clothing">Women's Clothing</option>
          <option value="Men's Clothing">Men's Clothing</option>
          <option value="Electronics">Electronics</option>
        </select>
        <input
          className="p-2 h-full w-full flex-grow focus:outline-none bg-white text-black text-sm"
          type="text"
          placeholder="Search Amazon.in"
        />
        <button className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-r-md text-black">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Right Section - Account, Orders, Cart */}
      <div className="flex items-center space-x-4 md:space-x-6 whitespace-nowrap order-2 md:order-3">
        {/* Accounts & Lists with Dropdown */}
        <div
          className="relative link flex flex-col cursor-pointer"
          onMouseEnter={() => setIsHoveringAccount(true)}
          onMouseLeave={() => setIsHoveringAccount(false)}
        >
          <Link to={user ? '/home' : '/'} className="link">
            <p className="text-xs hidden sm:inline">Hello, {user ? user.fullName : 'Sign In'}</p>
            <p className="font-bold text-sm">Accounts & Lists</p>
          </Link>
          {user && isHoveringAccount && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-900 rounded-md shadow-lg z-50 py-1">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        <Link to="/orders" className="link">
          <div className="flex flex-col">
            <p className="text-xs hidden sm:inline">Returns</p>
            <p className="font-bold text-sm">& Orders</p>
          </div>
        </Link>

        <Link to="/cart" className="link relative flex items-center">
          {/* Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 md:h-10 md:w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="absolute top-0 -right-1 md:right-auto md:left-5 h-4 w-4 bg-yellow-500 rounded-full text-black font-bold text-center text-xs">
            {cartItemCount}
          </span>
          <p className="hidden md:inline font-bold text-sm mt-2">Cart</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
