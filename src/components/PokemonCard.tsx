import { useEffect, useState } from "react";
import { getPokemonByName } from "@/services/pokemonService";
import { Pokemon } from "@/types/pokemon";

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemonName, setPokemonName] = useState<string | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!pokemonName) return;
      try {
        setLoading(true);
        const data = await getPokemonByName(pokemonName);
        setPokemon(data);
        setError(null);
      } catch (err) {
        setPokemon(null);
        setError("Invalid Pokémon name. Showing unknown Pokémon.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  console.log(pokemon)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPokemonName(input.trim().toLowerCase() || null);
  };

  const types = pokemon?.types?.length ? pokemon.types : ["unknown"];

  return (
    <div className="max-w-sm mx-auto p-4 border rounded-lg shadow-md bg-white">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={input}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full mt-2 bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="text-center text-gray-500">Loading...</div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {!loading && pokemonName && (
        <>
          {pokemon ? (
            <>
              <img
                src={pokemon.sprites?.officialArtwork || `/images/unknown_pokemon.png`}
                alt={pokemon.name || "???"}
                className="w-32 h-32 mx-auto"
              />
              <h1 className="text-xl font-bold text-center capitalize">
                {pokemon.name || "???"}
              </h1>
              <div className="flex justify-center gap-2 mt-2">
                {types.map((type, index) => {
                  const typeImagePath = `/images/types/${type}.png`;

                  return (
                    <span key={index} className="flex items-center gap-1">
                      <img
                        src={typeImagePath}
                        alt={type}
                        className="w-12 h-4 object-contain"
                      />
                    </span>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center">
              <img
                src="/images/unknown_pokemon.png"
                alt="unknown"
                className="w-32 h-32 mx-auto"
              />
              <h1 className="text-xl font-bold text-center capitalize">???</h1>
              <div className="flex justify-center gap-2 mt-2">
                <img
                  src="/images/types/unknown.png"
                  alt="unknown"
                  className="w-12 h-4 object-contain"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonCard;
