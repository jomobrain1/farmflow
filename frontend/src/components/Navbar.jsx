import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/NavbarStyle.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__top">
          <NavLink to="/" className="navbar__brand" onClick={handleCloseMenu}>
            FarmFlow
          </NavLink>

          <button
            type="button"
            className="navbar__toggle"
            onClick={handleToggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation menu"
          >
            <span className="navbar__toggle-line" />
            <span className="navbar__toggle-line" />
            <span className="navbar__toggle-line" />
          </button>
        </div>

        <nav
          id="primary-navigation"
          className={`navbar__links${isMenuOpen ? " navbar__links--open" : ""}`}
          aria-label="Primary"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            onClick={handleCloseMenu}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/fields"
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            onClick={handleCloseMenu}
          >
            Fields
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `navbar__link${isActive ? " navbar__link--active" : ""}`
            }
            onClick={handleCloseMenu}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `navbar__link navbar__link--button${isActive ? " navbar__link--active" : ""}`
            }
            onClick={handleCloseMenu}
          >
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
