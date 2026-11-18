import React from 'react';

export default function UserItem({ user, isFavorite, onToggle }) {
  return (
    <div style={{
      border: '1px solid #dcdde1',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff'
    }}>
      <div>
        <h3 style={{ margin: '0 0 0.25rem 0', color: '#2c3e50' }}>{user.name}</h3>
        <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.9rem' }}>Email: {user.email}</p>
        <p style={{ margin: 0, color: '#444', fontSize: '0.85rem' }}>Ciudad: {user.address?.city}</p>
      </div>

      <button 
        onClick={() => onToggle(user.id)}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isFavorite ? '#f1c40f' : '#ecf0f1',
          color: isFavorite ? '#000' : '#333',
          fontWeight: 'bold'
        }}
      >
        {isFavorite ? 'Quitar favorito' : 'Marcar como favorito'}
      </button>
    </div>
  );
}