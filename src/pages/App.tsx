import PokemonCard from "@/components/PokemonCard";

const App = () => {
  return (
    <div className="App flex flex-col items-center min-h-screen bg-gradient-to-b from-red-600 to-gray-900 pt-8">
      <img src={`${import.meta.env.BASE_URL}images/pokedex.png`} className="mb-4" alt="Pokedex" />
      <PokemonCard />
    </div>
  );
};

export default App;
