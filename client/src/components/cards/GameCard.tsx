import type { Game } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { GameModal } from "./GameModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const GameCard = ({
  game,
}: {
  game: Game;
}) => {
  const { id, name, description } = game;
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);


  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/users/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
    enabled: !!token,
  });

  const isFavorited = favorites.some((g: Game) => g.id === id);

  const handleFavorite = useMutation({
    mutationFn: async () => {
      const method = isFavorited ? "DELETE" : "PATCH";
      const res = await fetch(`http://localhost:3000/users/favorites/${id}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["favoritedBy", id]});
    }
  });

  return (
    <>
      <div className="game-card">
        <h2>{name}</h2>
        <p>{description}</p>
        <div className="game-btn-container">
          <i 
            className={`fa-solid ${isFavorited ? "fa-heart favorited" : "fa-heart-crack"}`} 
            onClick={() => handleFavorite.mutate()}
          />
          <button className="btn-more-info" onClick={() => setMoreInfoVisible(true)}>More Info</button>
        </div>
      </div>
      {moreInfoVisible &&
        <GameModal setMoreInfoState={setMoreInfoVisible} game={game}/>
      }
    </>
  );
}