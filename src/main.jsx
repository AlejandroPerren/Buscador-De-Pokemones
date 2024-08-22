import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ListaPokemones } from './buscadorPokemones';
import './styles/movieSearch.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ListaPokemones />
  </StrictMode>,
);