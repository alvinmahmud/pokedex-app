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
    setPokemonName(input.trim().toLowerCase().replace(/\s+/g, "-") || null);
    setInput("");
  };

  const formatPokemonName = (name: string): string => {
    const formMapping: { [key: string]: string } = {
      mega: "Mega",
      gmax: "(Gigantamax)",
      primal: "(Primal)",
      alola: "(Alola)",
      galar: "(Galar)",
      hisui: "(Hisui)",
      paldea: "(Paldea)",
      incarnate: "(Incarnate Forme)",
      therian: "(Therian Forme)",
      origin: "(Origin)",
      crowned: "(Crowned)",
      ash: "(Ash)",
      zen: "(Zen Mode)",
      dusk: "(Dusk Mane)",
      dawn: "(Dawn Wings)",
      complete: "(Complete)",
      "10": "(10% Forme)",
      "50": "(50% Forme)",
      ice: "(Ice Rider)",
      shadow: "(Shadow Rider)",
      normal: "(Normal Forme)",
      attack: "(Attack Forme)",
      defense: "(Defense Forme)",
      speed: "(Speed Forme)"
    };

    const specialNames: Record<string, string> = {
      "mr-mime": "Mr. Mime",
      "mr-rime": "Mr. Rime",
      "mime-jr": "Mime Jr.",
      "type-null": "Type: Null",
      "porygon-z": "Porygon-Z",
      "ho-oh": "Ho-Oh",
      "farfetchd": "Farfetch’d",
      "sirfetchd": "Sirfetch’d",
    };
  
    const parts = name.split("-");
    const baseName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const suffix = parts[1];
  
    // Mega Pokémon
    if (suffix && suffix.startsWith("mega")) {
      const nameParts = name.split("-");
      [nameParts[0], nameParts[1]] = [nameParts[1], nameParts[0]];
    
      const capitalizedParts = nameParts.map((name) => 
        name.charAt(0).toUpperCase() + name.slice(1)
      );
    
      return capitalizedParts.join(" ");
    }
  
    // Other forms
    if (suffix && formMapping[suffix]) {
      return `${baseName} ${formMapping[suffix]}`;
    }

    // Special cases
    if (specialNames[name]) {
      return specialNames[name]
    }
  
    return name.replace("-", " ");
  };

  console.log(pokemon ? formatPokemonName(pokemon!.name) : 'None');

  const types = pokemon?.types?.length ? pokemon.types : ["unknown"];

  return (
    <div className="min-w-[500px] min-h-[500px] p-8 border-2 border-black rounded-xl bg-gray-300">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter a Pokémon"
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md pr-12 font-pokemon"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 h-full px-4 bg-red-700 text-white rounded-r-md font-pokemon"
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
                alt={formatPokemonName(pokemon?.name) || "???"}
                className="w-72 h-72 mx-auto"
              />
              <h1 className="font-pokemon text-xl text-center capitalize">
                {formatPokemonName(pokemon.name) || "???"}
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
                className="w-72 h-72 mx-auto"
              />
              <h1 className="font-pokemon text-xl text-center">???</h1>
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
