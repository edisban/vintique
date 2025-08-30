import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/index.css";
import { useCart } from "../context/CartContext";

function Header({ onAddClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          VINTIQUE
        </NavLink>

        {/* Burger Icon */}
        <button
          className="burger"
          aria-label="Άνοιγμα μενού"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <NavLink to="/" end onClick={closeMenu}>
            Αρχική
          </NavLink>
          <NavLink to="/categories" onClick={closeMenu}>
            Κατηγορίες
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            Επικοινωνία
          </NavLink>

          <NavLink to="/cart" className="cart-button" onClick={closeMenu}>
            🛒 Καλάθι ({totalItems})
          </NavLink>

          <button
            type="button"
            className="add-button"
            onClick={() => {
              closeMenu();
              onAddClick?.();
            }}
          >
            ➕ Προσθήκη Προϊόντος
          </button>
        </nav>

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
