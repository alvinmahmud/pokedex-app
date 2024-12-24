const API_BASE = import.meta.env.VITE_POKEMON_API;

export const getPokemon = async (id: number) => {
  const response = await fetch(`${API_BASE}/pokemon/${id}`);
  return response.json();
};
