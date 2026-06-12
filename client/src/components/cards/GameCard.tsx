import type { Game } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { GameModal } from "./GameModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { ConfirmModal } from "./ConfirmModal";

export const GameCard = ({
  game,
}: {
  game: Game;
}) => {
  const { id, name } = game;
  const { token, user } = useAuth();
  const queryClient = useQueryClient();
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

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

  const handleDelete = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/games/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        toast.error("Failed to delete game");
        throw new Error("Failed to delete game");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Game deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["games"]});
    }
  });

  return (
    <>
      <div className="game-card">
        <h2>{name}</h2>
        <div className="game-btn-container">
          {user?.role === "ADMIN"
            ? <i 
                className="fa-solid fa-trash-can"
                onClick={() => setConfirmDeleteVisible(true)}
              />
            : <></>
          }
          <i 
            className={`fa-solid ${isFavorited ? "fa-heart favorited" : "fa-heart-crack"}`} 
            onClick={() => handleFavorite.mutate()}
          />
          <button className="btn-more-info" onClick={() => setMoreInfoVisible(true)}>More Info</button>
        </div>
      </div>
      {confirmDeleteVisible && (
        <ConfirmModal 
          data={game}
          setShowState={setConfirmDeleteVisible}
          onClickEvent={() => handleDelete.mutate()}
        />
      )}
      {moreInfoVisible &&
        <GameModal setMoreInfoState={setMoreInfoVisible} game={game}/>
      }
    </>
  );
}