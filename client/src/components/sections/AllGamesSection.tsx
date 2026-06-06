import { GameCard } from "../cards/GameCard";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../../api/games";
import type { Game } from "../../types";

export function AllGamesSection() {
  const { data: allGames = [], isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  })

  const displayGames = 
    allGames.length > 0
      ? allGames.map((game: Game) => (
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