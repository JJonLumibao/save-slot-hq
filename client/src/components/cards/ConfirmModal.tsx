import type { Dispatch, SetStateAction } from "react";
import type { Game, ManageUser } from "../../types";

export const ConfirmModal = ({
  data,
  setShowState,
  onClickEvent,
}: {
  data: ManageUser | Game;
  setShowState: Dispatch<SetStateAction<boolean>>;
  onClickEvent: () => void;
}) => {
  const isUser = "username" in data;
  const displayName = isUser ? data.username : data.name;

  return (
    <div className="game-modal">
      <div 
        className="backdrop"
        onClick={() => setShowState(false)}
      >
      </div>
      <div className="content-container confirm-container">
        <div className="btn-close-modal"
          onClick={() => setShowState(false)}
        >
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
        <div className="content-headings">
          <h2 className="confirm-header">Confirm Delete</h2>
          <div className="confirm-description">Are you sure you want to delete?</div>
          <b className="confirm-data">{displayName}</b>
          <div className="confirm-description">Deleting this {isUser ? "user" : "game"} will result in the deletion of any data linked to this game. <b>This action cannot be undone!</b></div>
        </div>
        <button className="btn-delete" onClick={onClickEvent}>Delete {isUser ? "User" : "Game"}</button>
      </div>
    </div>
  )
}