import { GameCard } from "../cards/GameCard";
import { useAuth } from "../../context/AuthContext";
import type { Game } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "../../api/favorites";

export function FavoritesSection() {
  const { token } = useAuth();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchFavorites(token!),
    enabled: !!token
  })

  const displayGames = 
    favorites.length > 0
      ? favorites.map((game: Game) => (
        <GameCard game={game} />
      ))
      : <p className="section-status">{`You have no favorite games :(`}</p>

  return (
    <section className="games-section favorites">
      <h2>Favorites ({favorites.length})</h2>
      <div className="games-container favorites">
        {!isLoading ? displayGames : <p className="section-status">Loading games...</p>}
      </div>
    </section>
  )
}