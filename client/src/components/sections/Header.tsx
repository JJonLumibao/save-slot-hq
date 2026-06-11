import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, setUser, setToken } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 
          className="header-title"
          onClick={() => navigate("/home")}
        >
          Save Slot HQ
        </h1>
        <div 
          className="account-wrapper"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <div className="account-container">
            <i className="fa-solid fa-circle-user"/>
            <div className="account-details">
              <h3>{user!.username}</h3>
              <p>{user!.role}</p>
            </div>
          </div>
          <div 
            className={`page-options ${openMenu ? "visible" : ""}`}
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
          >
            <div className="option" onClick={() => navigate("/account")}>Account Details</div>
            {user?.role === "PREMIUM"
              ? <div className="option" onClick={() => navigate("/my-reviews")}>My Reviews</div>
              : <></>
            }
            {user?.role === "ADMIN"
              ? 
                <>
                  <div className="option" onClick={() => navigate("/manage-user-roles")}>Manage User Roles</div>
                  <div className="option" onClick={() => navigate("/add-new-game")}>Add New Game</div>
                  <div className="option" onClick={() => navigate("/all-reviews")}>All Reviews</div>
                </>
              : <></>
            }
            <div className="option" onClick={handleLogout}>Sign Out</div>
          </div>
        </div>
      </div>
    </header>
  )
}