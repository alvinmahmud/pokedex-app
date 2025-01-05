import { Pokemon } from "@/types/pokemon";

const API_BASE = "https://pokeapi.co/api/v2";

export const getPokemonByName = async (name: string): Promise<Pokemon | null> => {
  try {
    const response = await fetch(`${API_BASE}/pokemon/${name.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data for Pokémon: ${name}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      sprites: {
        frontSprite: data.sprites.front_default,
        officialArtwork: data.sprites.other["official-artwork"].front_default,
      },
      types: data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
    };
  } catch (error) {
    console.error(`Error fetching Pokémon data: ${error}`);
    return null;
  }
};
