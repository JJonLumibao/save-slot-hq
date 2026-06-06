import type { Game } from "../../types";
import { useQuery } from "@tanstack/react-query";

type PlayerInfo = {
  id: number;
  username: string;
}

export const PlayerList = ({
  game
}: {
  game: Game
}) => {
  const { id } = game;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["favoritedBy", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/games/${id}/favoritedBy`);
      return res.json();
    },
  });

  const displayPlayers = 
    users.length > 0 
      ? users.map((u: PlayerInfo) => (
        <div className="player-list-item" key={u.id}>
          {u.username}
        </div>
      ))
      : <p className="section-status">
          No player has added this game to their favorites
        </p>

  return (
    <>
      {!isLoading ? displayPlayers : <p className="section-status">Loading players</p>}
    </>
  )
}