/* ShoeCard.jsx */
import React from "react";

function ShoeCard({ shoe }) {
  return (
    <div style={{
      background: '#F4F3F0',
      borderRadius: '6px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(196,30,58,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ background: '#ece9e3', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img
          src={shoe.image}
          alt={shoe.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85)' }}
        />
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <h3 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          fontWeight: 600,
          color: '#1A1A1F',
          margin: '0 0 4px',
          letterSpacing: '0.3px',
        }}>{shoe.name}</h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          color: '#6B6B78',
          margin: '0 0 10px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>{shoe.brand}</p>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '22px',
          fontWeight: 700,
          color: '#C41E3A',
          margin: '0 0 16px',
        }}>₹{shoe.price}</p>
        <button style={{
          width: '100%',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          background: 'transparent',
          color: '#1A1A1F',
          border: '1px solid rgba(26,26,31,0.15)',
          padding: '11px',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
          onMouseEnter={e => { e.target.style.background = '#C41E3A'; e.target.style.borderColor = '#C41E3A'; e.target.style.color = '#fff'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(26,26,31,0.15)'; e.target.style.color = '#1A1A1F'; }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ShoeCard;