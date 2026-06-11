import { useQuery } from "@tanstack/react-query"
import type { Review } from "../../types"
import { Header } from "../sections/Header";
import { useAuth } from "../../context/AuthContext";
import { fetchAllReviews } from "../../api/allReviews";

type GroupedReview = {
  gameId: number;
  gameName: string;
  reviews: Review[];
}

export function AllReviewsPage () {
  const { user, token } = useAuth();
  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ["allReviews", user?.id],
    enabled: user?.role === "ADMIN" && !!token,
    queryFn: () => fetchAllReviews(token!),
  });

 const groupedMap = new Map<number, GroupedReview>();

  allReviews.forEach((review: Review) => {
    const gameId = review.game.id;

    if (!groupedMap.has(gameId)) {
      groupedMap.set(gameId, {
        gameId,
        gameName: review.game.name,
        reviews: [],
      });
    }

    groupedMap.get(gameId)!.reviews.push(review);
  });
  
  const groupedReviews = Array.from(groupedMap.values());

  return (
    <>
      <Header />    
      {isLoading && <p className="section-status">Loading reviews...</p>}
      <div className="user-reviews-container">
        <h2 className="form-header">All Reviews ({allReviews.length})</h2>

        <div className="user-reviews-list">
          {groupedReviews.length > 0 ? (
            groupedReviews.map((group: GroupedReview) => (
              <div key={group.gameId} className="game-review-group">
                <h3>{group.gameName}</h3>
                {group.reviews.map((review) => (
                  <div className="user-review-card" key={review.id}>
                    <h3>{review.user.username}</h3>
                    {Array.from({ length: review.rating }).map(() => (
                      <i className="fa-solid fa-star" />
                    ))}
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>There are no reviews</p>
          )}
        </div>
      </div>
    </>
  );
};