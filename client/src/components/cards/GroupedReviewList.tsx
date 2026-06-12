import type { Review } from "../../types";

type GroupedReview = {
  gameId: number;
  gameName: string;
  reviews: Review[];
}

export function GroupedReviewList({
  title,
  reviews,
  showUsername,
  onDelete,
}: {
  title: string,
  reviews: Review[],
  showUsername: boolean,
  onDelete: (id: number) => void,
}) {
  const groupedMap = new Map<number, GroupedReview>();

  reviews.forEach((review: Review) => {
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
    <div className="user-reviews-container">
      <h2 className="form-header">{title} ({reviews.length})</h2>
      <div className="user-reviews-list">
        {groupedReviews.length > 0 ? (
          groupedReviews.map((group: GroupedReview) => (
            <div key={group.gameId} className="game-review-group">
              <h3>{group.gameName}</h3>
              {group.reviews.map((review) => (
                <div className="user-review-card" key={review.id}>
                  {showUsername && <h3>{review.user.username}</h3>}
                  <i 
                    className="fa-solid fa-trash-can review-trash"
                    onClick={() => onDelete(review.id)}
                  />
                  {Array.from({ length: review.rating }).map(() => (
                    <i className="fa-solid fa-star" />
                  ))}
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="section-status">There are no reviews</p>
        )}
      </div>
    </div>
  )
}