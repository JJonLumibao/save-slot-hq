import { useQuery } from "@tanstack/react-query"
import { fetchGameReviews } from "../../api/gameReviews"
import type { Review } from "../../types"

export const GameReviews = ({ gameId }: { gameId: number }) => {
  const { data: gameReviews = [], isLoading } = useQuery({
    queryKey: ["gameReviews", gameId],
    queryFn: () => fetchGameReviews(gameId),
  });

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <section className="game-reviews-container">
      <h2>Reviews ({gameReviews.length})</h2>

      <div className="all-reviews-list">
        {gameReviews.length > 0 ? (
          gameReviews.map((review: Review) => (
            <div className="all-review-card" key={review.id}>
              <h3>{review.user?.username}</h3>
              {Array.from({ length: review.rating }).map(() => (
                <i className="fa-solid fa-star" />
              ))}
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>Be the first to leave a review!</p>
        )}
      </div>
    </section>
  );
};