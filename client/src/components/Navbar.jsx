import React, { useState, useEffect } from "react";
import { FiShoppingBag, FiUser, FiSearch, FiHeart } from "react-icons/fi";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { isAuthenticated } from "../utils/auth";

function Navbar() {
  const { totalWishlist } = useWishlist();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/new-arrivals?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className={`fc-nav${scrolled ? " scrolled" : ""}`}>
      <div className="fc-nav-inner">

        <div className="fc-logo" onClick={() => navigate("/")}>
          <div className="fc-logo-slash" />
          <span className="fc-logo-name">Foot<em>Cap</em></span>
        </div>

        <nav className="fc-nav-links">
          <Link to="/">Home</Link>
          <Link to="/new-arrivals">New Arrivals</Link>
          <Link to="/menproduct">Men</Link>
          <Link to="/womenproduct">Women</Link>
          <Link to="/sale" className="sale-link">Sale</Link>
        </nav>

        <div className="fc-nav-actions">
          <div className="fc-search-wrap">
            <FiSearch className="fc-search-icon" />
            <input
              type="text"
              placeholder="Search styles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <button className="fc-btn-icon" onClick={() => navigate("/cart")}>
            <FiShoppingBag />
            {totalItems > 0 && <span className="fc-badge">{totalItems}</span>}
          </button>
          <button className="fc-btn-icon" onClick={() => navigate("/wishlist")}>
            <FiHeart />
            {totalWishlist > 0 && <span className="fc-badge">{totalWishlist}</span>}
          </button>
          <button className="fc-btn-icon" onClick={() => navigate(isAuthenticated() ? "/profile" : "/login")}>
            <FiUser />
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;