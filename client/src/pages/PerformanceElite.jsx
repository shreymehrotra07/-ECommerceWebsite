import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productAPI } from "../utils/api";
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MenProducts.css";

// Helper function to get image URL
function getImageUrl(imagePath) {
  if (!imagePath) return "";
  const filename = imagePath.split("/").pop();
  return new URL(`../assets/images/${filename}`, import.meta.url).href;
}

function PerformanceElite() {
  const [activeBrand, setActiveBrand] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Performance");
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeMinPrice, setActiveMinPrice] = useState("");
  const [activeMaxPrice, setActiveMaxPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch products specifically for Performance Elite collection
        // Filter for athletic/sporty products, premium brands, higher prices
        const data = await productAPI.getPaginated(currentPage, productsPerPage, { 
          sort: sortBy,
          minPrice: activeMinPrice || "100",
          maxPrice: activeMaxPrice,
          size: selectedSize,
          color: selectedColor,
          search: activeSearchQuery,
          // We'll filter client-side for "performance" themed products
        });
        
        // Client-side filtering for performance/athletic products
        let filteredProducts = data.products || [];
        
        // Filter for performance-oriented products
        filteredProducts = filteredProducts.filter(product => {
          const nameLower = product.name.toLowerCase();
          const descLower = (product.description || "").toLowerCase();
          const categoryLower = (product.category || "").toLowerCase();
          
          // Look for performance-related keywords
          const performanceKeywords = [
            'running', 'basketball', 'training', 'performance', 'elite', 
            'pro', 'athlete', 'sport', 'air', 'boost', 'react', 'flyknit'
          ];
          
          const hasPerformanceKeyword = performanceKeywords.some(keyword => 
            nameLower.includes(keyword) || 
            descLower.includes(keyword) || 
            categoryLower.includes(keyword)
          );
          
          // Also include premium/high-end products
          const isPremium = product.price > 150;
          
          return hasPerformanceKeyword || isPremium;
        });

        if (data.products && data.pagination) {
          setProducts(filteredProducts);
          setTotalPages(data.pagination.totalPages);
          setTotalProducts(filteredProducts.length);
        } else {
          setProducts(filteredProducts);
          setTotalPages(1);
          setTotalProducts(filteredProducts.length);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortBy, activeMinPrice, activeMaxPrice, selectedSize, selectedColor, activeSearchQuery]);

  const handlePriceChange = (e, type) => {
    if (type === 'min') setMinPrice(e.target.value);
    if (type === 'max') setMaxPrice(e.target.value);
  };

  const handlePriceKeyDown = (e) => {
    if (e.key === 'Enter') {
      setActiveMinPrice(minPrice);
      setActiveMaxPrice(maxPrice);
      setCurrentPage(1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setActiveSearchQuery(searchQuery);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (loading && currentPage === 1 && products.length === 0) {
    return (
      <>
        <Navbar />
        <div className="plp">
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "8rem 2rem", width: "100%" }}>
            <div className="loader"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <div className="plp">
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="plp">
        {/* SIDEBAR */}
        <aside className="plp-sidebar">
          <div className="sidebar-title">
            <FiFilter />
            <h3>Filters</h3>
          </div>

          <h4>Categories</h4>
          <ul>
            {["All Performance", "Running", "Basketball", "Training", "Lifestyle"].map((cat) => (
              <li 
                key={cat}
                className={activeCategory === cat ? "active" : ""}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat}
              </li>
            ))}
          </ul>

          <h4>Brands</h4>
          <div className="tag-group">
            {["", "Nike", "Adidas", "Jordan", "Puma", "Reebok", "Under Armour"].map((brand) => (
              <span
                key={brand}
                className={activeBrand === brand ? "active" : ""}
                onClick={() => {
                  setActiveBrand(brand);
                  setCurrentPage(1);
                }}
              >
                {brand || "All"}
              </span>
            ))}
          </div>

          <h4>Price Range</h4>
          <div className="price-inputs">
            <input 
              type="number" 
              placeholder="Min ($100)" 
              value={minPrice} 
              onChange={(e) => handlePriceChange(e, 'min')}
              onKeyDown={handlePriceKeyDown}
            />
            <input 
              type="number" 
              placeholder="Max" 
              value={maxPrice} 
              onChange={(e) => handlePriceChange(e, 'max')}
              onKeyDown={handlePriceKeyDown}
            />
          </div>

          <h4>Sizes</h4>
          <div className="size-tags">
            {["", 6, 7, 8, 9, 10, 11, 12, 13].map((size) => (
              <span
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => { setSelectedSize(size); setCurrentPage(1); }}
              >
                {size || "All"}
              </span>
            ))}
          </div>

          <h4>Colors</h4>
          <div className="color-tags">
            {["", "Black", "White", "Blue", "Red", "Grey", "Green"].map((color) => (
              <span
                key={color}
                className={selectedColor === color ? "active" : ""}
                onClick={() => { setSelectedColor(color); setCurrentPage(1); }}
              >
                {color || "All"}
              </span>
            ))}
          </div>
        </aside>

        <section className="plp-content">
          <div className="plp-search-container">
            <input 
              type="text" 
              placeholder="Search Performance Elite collection..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="plp-search-input"
            />
            <FiSearch className="search-icon" />
          </div>

          {/* Collection Header */}
          <div className="collection-header">
            <div className="collection-banner">
              <div className="collection-info">
                <h1>PERFORMANCE ELITE</h1>
                <p>Engineered for professional athletes. Maximum response, zero gravity feel.</p>
                <div className="collection-stats">
                  <span>{totalProducts} Premium Items</span>
                  <span>•</span>
                  <span>High Performance</span>
                  <span>•</span>
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>
          </div>

          <div className="plp-header">
            <div className="header-text">
              <h2>Performance Collection</h2>
              <span>Showing {products.length} of {totalProducts} elite performance items</span>
            </div>

            <div className="sort-box">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}>
                <option value="newest">Newest Arrival</option>
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* GRID */}
          <div className="plp-grid">
            {products.length === 0 ? (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "4rem",
                }}
              >
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              products.map((p, index) => {
                const productId = p._id || p.id;
                return (
                  <Link
                    to={`/product/${productId}`}
                    key={productId}
                    className="plp-card"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {p.badge && <span className="badge">{p.badge}</span>}
                    <div className="img-box">
                      <img src={getImageUrl(p.image)} alt={p.name} />
                    </div>
                    <h5>{p.name}</h5>
                    <p>
                      {p.brand} • {p.gender} • {p.category}
                    </p>
                    <span className="price">{p.priceDisplay}</span>
                  </Link>
                );
              })
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={currentPage === 1 ? "disabled" : ""}
              >
                <FiChevronLeft />
              </button>
              
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={currentPage === pageNum ? "active" : ""}
                >
                  {pageNum}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "disabled" : ""}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PerformanceElite;