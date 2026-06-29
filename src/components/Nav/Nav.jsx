import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Nav.css";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from 'react-icons/fa';
import { getCategories } from "../../services/productsService";

const slugToLabel = (slug) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const Nav = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li ref={dropdownRef} className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Categorías ▾
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              {categories.length === 0 ? (
                <li className="dropdown-empty">Sin categorías</li>
              ) : (
                categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      to={`/category/${cat}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      {slugToLabel(cat)}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </li>
        <li>
          <Link to="/carrito">
            <FaShoppingCart />
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
