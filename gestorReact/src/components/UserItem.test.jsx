import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserItem from './UserItem';
import React from 'react';

describe('Componente UserItem', () => {
  it('debe renderizar el nombre y el correo del usuario correctamente', () => {
    const mockUser = {
      id: 1,
      name: 'Fernando Martínez',
      email: 'fernando@example.com',
      address: { city: 'Cuenca' }
    };

    const mockToggle = vi.fn();

    render(
      <UserItem 
        user={mockUser} 
        isFavorite={false} 
        onToggle={mockToggle} 
      />
    );

    // Verificamos que el nombre y el correo aparezcan en pantalla
    expect(screen.getByText('Fernando Martínez')).toBeInTheDocument();
    expect(screen.getByText('Email: fernando@example.com')).toBeInTheDocument();
  });
});