import { useEffect, useState } from "react";
import { getPokemonByName } from "@/services/pokemonService";
import { Pokemon } from "@/types/pokemon";

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonByName("pikachu");
        setPokemon(data);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
        console.error(err); // Logging errors
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!pokemon) {
    return <div className="text-center text-blue-500">No Pokemon found</div>;
  }

  return (
    <div className="max-w-sm mx-auto p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <img
        src={pokemon.sprites.frontSprite}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <h1 className="text-xl font-bold text-center capitalize">
        {pokemon.name}
      </h1>
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
