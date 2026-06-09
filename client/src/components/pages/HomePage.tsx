import { useNavigate } from "react-router-dom";
import { AllGamesSection } from "../sections/AllGamesSection";
import { FavoritesSection } from "../sections/FavoritesSection";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export function HomePage() {
  const { user, setUser, setToken } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-container">
          <h1 className="header-title">Save Slot HQ</h1>
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
              <div className="option">Account Details</div>
              <div className="option">My Favorites</div>
              <div className="option">My Reviews</div>
              <div className="option" onClick={handleLogout}>Sign Out</div>
            </div>
          </div>
        </div>
      </header>
      <FavoritesSection />
      <AllGamesSection />
      <div className="games-list-container">

      </div>
    </div>
  );
}