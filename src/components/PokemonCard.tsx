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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPokemonName(input.trim().toLowerCase() || null);
    setInput("");
  };

  const types = pokemon?.types?.length ? pokemon.types : ["unknown"];

  return (
    <div className="min-w-[450px] min-h-[450px] p-8 border-2 border-black rounded-xl bg-gray-300">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter a Pokémon"
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md pr-12"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 h-full px-4 bg-red-700 text-white rounded-r-md"
          >
            Go!
          </button>
        </div>
      </form>

      {loading && <div className="text-center text-gray-500">Loading...</div>}

      {!loading && error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {!loading && pokemonName && (
        <>
          {pokemon ? (
            <>
              <img
                src={
                  pokemon.sprites?.officialArtwork ||
                  `/images/unknown_pokemon.png`
                }
                alt={pokemon.name || "???"}
                className="w-64 h-64 mx-auto"
              />
              <h1 className="text-xl font-bold text-center capitalize">
                {pokemon.name || "???"}
              </h1>
              <div className="flex justify-center mt-2">
                {types.map((type, index) => {
                  const typeImagePath = `/images/types/${type}.png`;

                  return (
                    <span key={index} className="flex items-center gap-1">
                      <img
                        src={typeImagePath}
                        alt={type}
                        className="w-24 h-8 object-contain"
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
                className="w-64 h-64 mx-auto"
              />
              <h1 className="text-xl font-bold text-center capitalize">???</h1>
              <div className="flex justify-center gap-2 mt-2">
                <img
                  src="/images/types/unknown.png"
                  alt="unknown"
                  className="w-24 h-8 object-contain"
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
