import type { Dispatch, SetStateAction } from "react"
import { PlayerList } from "./PlayerList"
import type { Game } from "../../types"
import { ReviewForm } from "../forms/ReviewForm";
import { GameReviews } from "./GameReviews";

export const GameModal = ({
  setMoreInfoState,
  game,
}: {
  setMoreInfoState: Dispatch<SetStateAction<boolean>>,
  game: Game,
}) => {
  const { name, description } = game;

  return (
    <div className="game-modal">
      <div 
        className="backdrop"
        onClick={() => setMoreInfoState(false)}
      >
      </div>
      <div className="content-container">
        <div className="btn-close-modal"
          onClick={() => setMoreInfoState(false)}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
        <div className="modal-body">
          <div className="content">
            <div className="content-headings">
              <h1 className="content-header">{name}</h1>
              <p className="content-description">{description}</p>
            </div>
            <div className="player-list-container">
              <h2>Other players who like this game:</h2>
              <div className="player-list">
                <PlayerList game={game}/>
              </div>
            </div>
          </div>
          <ReviewForm gameId={game.id}/>
          <GameReviews gameId={game.id}/>
        </div>
      </div>
    </div>
  )
}