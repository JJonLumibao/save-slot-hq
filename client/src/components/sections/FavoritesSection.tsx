import { useEffect, useState } from "react"
import { GameCard } from "../cards/GameCard";
import type { Game } from "../../types";
import { useAuth } from "../../context/AuthContext";

export function FavoritesSection() {
  const { token } = useAuth();

  const [favoriteGames, setFavoriteGames] = useState<Game [] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const getAllFavoriteGames = async () => {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/users/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFavoriteGames(data);
      setIsLoading(false);
    }
    getAllFavoriteGames();
  }, [token]);

  const displayGames = 
    favoriteGames.length > 0
      ? favoriteGames.map((game) => (
        <GameCard game={game} />
      ))
      : <p>No games found in database</p>

  return (
    <section className="games-section favorites">
      <h2>Favorites ({favoriteGames.length})</h2>
      <div className="games-container favorites">
        {!isLoading ? displayGames : <p>Loading games...</p>}
      </div>
    </section>
  )
}