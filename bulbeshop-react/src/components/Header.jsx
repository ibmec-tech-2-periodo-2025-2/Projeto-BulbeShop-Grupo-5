import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  return (
    <header className="header">
      <div className="header-content">
        <div className="menu-icon" onClick={handleMenuToggle}>
          <img src="/assets/img/menu-icon.png" alt="Menu" />
        </div>

        <div className="search-bar">
          <div className="search-icon">
            <img src="/assets/img/lupa-icons.png" alt="Search" />
          </div>
          
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          
          {searchValue && (
            <div className="cancel-icon" onClick={handleClearSearch}>
              <img src="/assets/img/cancel-icons.png" alt="Clear" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
