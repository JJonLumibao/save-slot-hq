import { useNavigate } from "react-router-dom";
import { AllGamesSection } from "../sections/AllGamesSection";
import { FavoritesSection } from "../sections/FavoritesSection";
import { useAuth } from "../../context/AuthContext";

export function HomePage() {
  const { user, setUser, setToken } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero">
          <h1>Welcome to the home page {user ? user.firstName : "Guest"}</h1>
          <h2>{user ? user.role : "Not logged in"} View</h2>
        </div>
        <button onClick={handleLogout}>Log out</button>
      </section>
      <FavoritesSection />
      <AllGamesSection />
      <div className="games-list-container">

      </div>
    </div>
  );
}