import React, { useState, useEffect, useMemo } from 'react';
import UserItem from './components/UserItem';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Error al cargar los usuarios');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // 3. Agregar o quitar de favoritos
  const toggleFavorite = (id) => {
    const nextFavorites = new Set(favorites);
    nextFavorites.has(id) ? nextFavorites.delete(id) : nextFavorites.add(id);
    setFavorites(nextFavorites);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Gestor de Usuarios (React)</h1>
      
      <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
        Favoritos: {favorites.size}
      </p>

      {/* Input de Búsqueda */}
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Filtrar por nombre..." 
        style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }}
      />

      {/* Estados de carga y error exigidos por la rúbrica */}
      {loading && <p style={{ color: 'orange', fontWeight: 'bold' }}>Cargando...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {/* Listado de tarjetas reutilizando UserItem */}
      <div>
        {filteredUsers.map(user => (
          <UserItem 
            key={user.id}
            user={user} 
            isFavorite={favorites.has(user.id)}
            onToggle={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}