import { useQuery } from "@tanstack/react-query"
import { fetchUserReviews } from "../../api/userReviews"
import type { Review } from "../../types"
import { Header } from "../sections/Header";
import { useAuth } from "../../context/AuthContext";

type GroupedReview = {
  gameId: number;
  gameName: string;
  reviews: Review[];
}

export function MyReviewsPage () {
  const { user, token } = useAuth();
  const { data: userReviews = [], isLoading } = useQuery({
    queryKey: ["userReviews", user?.id],
    enabled: !!user?.id && !!token,
    queryFn: () => fetchUserReviews(user!.id, token!),
  });

 const groupedMap = new Map<number, GroupedReview>();

  userReviews.forEach((review: Review) => {
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
        <h2 className="form-header">My Reviews ({userReviews.length})</h2>

        <div className="user-reviews-list">
          {groupedReviews.length > 0 ? (
            groupedReviews.map((group: GroupedReview) => (
              <div key={group.gameId} className="game-review-group">
                <h3>{group.gameName}</h3>
                {group.reviews.map((review) => (
                  <div className="user-review-card" key={review.id}>
                    {Array.from({ length: review.rating }).map(() => (
                      <i className="fa-solid fa-star" />
                    ))}
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>You don't have any reviews!</p>
          )}
        </div>
      </div>
    </>
  );
};