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
        const data = await getPokemonByName("charizard");
        setPokemon(data);
      } catch (err) {
        setError("Failed to get Pokémon data.");
        console.error(err);
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
    return (
      <div className="text-center text-gray-500">
        No Pokémon data available.
      </div>
    );
  }

  console.log("Current Pokémon state:", pokemon);

  return (
    <div className="max-w-sm mx-auto p-4 border rounded-lg shadow-md bg-white">
      <img
        src={pokemon.sprites?.officialArtwork || ""}
        alt={pokemon.name || "???"}
        className="w-32 h-32 mx-auto"
      />
      <h1 className="text-xl font-bold text-center capitalize">
        {pokemon.name || "???"}
      </h1>
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types?.map((type, index) => {
          const typeName = type || "unknown";
          const typeImagePath = `/images/types/${typeName}.png`;

          return (
            <span key={index} className="flex items-center gap-1">
              <img
                src={typeImagePath}
                alt={typeName}
                className="w-12 h-4 object-contain"
                style={{ height: "75px", width: "75px" }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
