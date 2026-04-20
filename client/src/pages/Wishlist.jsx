import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Wishlist.css";

// Helper function to get image URL
function getImageUrl(imagePath) {
    const filename = imagePath.split('/').pop();
    return new URL(`../assets/images/${filename}`, import.meta.url).href;
}

function Wishlist() {
    const { wishlistItems, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="wish-container">
                <div className="wish-header-section">
                    <h1>My Favorites</h1>
                    <p>{wishlistItems.length} items saved for later</p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="wish-empty-state">
                        <div className="icon-circle">
                            <FiHeart />
                        </div>
                        <h2>Your wishlist is empty</h2>
                        <p>Save items you love and they will appear here.</p>
                        <Link to="/" className="continue-btn">
                            Explore Collection <FiArrowRight />
                        </Link>
                    </div>
                ) : (
                    <div className="wish-grid-layout">
                        {wishlistItems.map((item) => (
                            <div className="wish-premium-card" key={item.id}>
                                <button 
                                    className="wish-delete-btn"
                                    onClick={() => toggleWishlist(item)}
                                >
                                    <FiTrash2 />
                                </button>

                                <Link to={`/product/${item.id}`} className="wish-img-wrapper">
                                    <img src={getImageUrl(item.image)} alt={item.name} />
                                </Link>

                                <div className="wish-content-box">
                                    <div className="wish-top">
                                        <span className="wish-brand">{item.brand}</span>
                                        <h3>{item.name}</h3>
                                        <p className="wish-cat">{item.category} • {item.gender}</p>
                                    </div>

                                    <div className="wish-bottom">
                                        <span className="wish-price-tag">₹{item.priceDisplay || item.price}</span>
                                        <button
                                            className="wish-cart-btn"
                                            onClick={async () => {
                                                try {
                                                    await addToCart(item, 9);      
                                                    await toggleWishlist(item);   
                                                    navigate("/cart");     
                                                } catch (error) {
                                                    console.error('Error adding to cart:', error);
                                                }
                                            }}
                                        >
                                            <FiShoppingBag />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Wishlist;
