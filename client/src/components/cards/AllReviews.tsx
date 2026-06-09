import { useQuery } from "@tanstack/react-query"
import { fetchReviews } from "../../api/reviews"
import type { Review } from "../../types"

export const AllReviews = ({ gameId }: { gameId: number }) => {
  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ["reviews", gameId],
    queryFn: () => fetchReviews(gameId),
  });

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <section className="all-reviews-container">
      <h2>All Reviews ({allReviews.length})</h2>

      <div className="all-reviews-list">
        {allReviews.length > 0 ? (
          allReviews.map((review: Review) => (
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