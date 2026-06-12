import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "../sections/Header"
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

export function AddNewGamePage() {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");

  const emptyInput = gameName.length === 0 || gameDescription.length === 0;

  const handleSubmit = useMutation({
    mutationFn: async () => {
    
      if (!token) {
        throw new Error("Not authenticated");
      };

      const res = await fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: gameName, 
          description: gameDescription,
        }),

      });
      if (!res.ok) {
        throw new Error("Failed to submit review");
      }
      return res.json();
    },
    
    onError: () => {
      toast.error("Failed to add game");
    },

    onSuccess: () => {
      setGameName("");
      setGameDescription("");
      toast.success("Game added successfully");
      queryClient.invalidateQueries({
        queryKey: ["games"],
      })
    }
  });

  return (
    <div className="default-page add-new-game-page">
      <Header />
      <p className="form-header">Add New Game</p>
      <form 
        className="new-game-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit.mutate();
        }}
      >
        <div className="input-wrap">
          <div className="input-header">Game Name</div>
          <div className="remaining-counter">{30 - gameName.length}</div>
          <input 
            className="input-wrap-input game-name"
            type="text" 
            placeholder="e.g. Snowball Fight"
            maxLength={30}
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            disabled={handleSubmit.isPending}
          />
        </div>
        <div className="input-wrap">
          <div className="input-header">Game Description</div>
          <div className="remaining-counter desc-counter">{100 - gameDescription.length}</div>
          <textarea 
            className="input-wrap-input game-description"
            placeholder="e.g. 3D competitive multiplayer snowball fight simulator"
            maxLength={100}
            value={gameDescription}
            onChange={(e) => setGameDescription(e.target.value)}
            disabled={handleSubmit.isPending}
          />
        </div>
        <button 
          className="btn-save" 
          type="submit" 
          disabled={handleSubmit.isPending || emptyInput}
        >
          Add Game
        </button>
      </form>
    </div>
  )
}