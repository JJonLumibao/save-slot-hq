import type { Game } from "../../types";
import { useAuth } from "../../context/AuthContext";

export const GameCard = ({
  game,
}: {
  game: Game;
}) => {
  const { id, name, description } = game;
  const { token, favorites, setFavorites } = useAuth();
  const isFavorited = favorites.some((g) => g.id === id);

  const handleFavorite = async () => {
    if (!token) return;

    const method = isFavorited ? "DELETE" : "PATCH";

    const res = await fetch(`http://localhost:3000/users/favorites/${id}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return;
    
    setFavorites((prev: Game[]) => 
      isFavorited
        ? prev.filter((g: Game) => g.id !== id)
        : [...prev, game]
    );
  };

  const moreInfo = () => {
    return (
      <div className="backdrop">
        <div className="game-modal">
          <h2>{name}</h2>
          <p>description</p>
        </div>
      </div>
    )
  }

  return (
    <div className="game-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="game-btn-container">
        <i 
          className={`fa-solid fa-heart ${isFavorited ? "favorited" : ""}`} 
          onClick={handleFavorite}
        />
        <button className="btn-more-info" onClick={moreInfo}>More Info</button>
      </div>
    </div>
  );
}