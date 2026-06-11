import { Header } from "../sections/Header";
import { FavoritesSection } from "../sections/FavoritesSection";
import { AllGamesSection } from "../sections/AllGamesSection";

export function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <FavoritesSection />
      <AllGamesSection />
    </div>
  );
}