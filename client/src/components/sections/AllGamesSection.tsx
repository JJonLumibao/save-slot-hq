import { useEffect, useState } from "react"
import type { Game } from "../../types"
import { GameCard } from "../cards/GameCard";

export function AllGamesSection() {
  const [allGames, setAllGames] = useState<Game[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllGames = async () => {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/games");
      const data = await res.json();
      setAllGames(data);
      setIsLoading(false);
    }
    getAllGames();
  }, []);

  const displayGames = 
    allGames.length > 0
      ? allGames.map((game) => (
          <GameCard game={game} />
        ))
      : <p>No games found in database</p>

  return (
    <section className="games-section">
      <h2>All Games ({allGames.length})</h2>
      <div className="games-container">
        {!isLoading ? displayGames : <p>Loading games...</p>}
      </div>
    </section>
  )
}