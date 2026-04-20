import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Auth.css"; // Using existing auth CSS for styling

function StaticPage({ title, content }) {
  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1>{title}</h1>
            </div>
            <div className="static-content">
              {content}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StaticPage;