import PokemonCard from "@/components/PokemonCard";

const App = () => {
  return (
    <div className="App flex flex-col items-center min-h-screen bg-gray-100">
      <img src="/images/pokedex.png" className="mb-4" alt="Pokedex" />
      <PokemonCard />
    </div>
  );
};

export default App;
