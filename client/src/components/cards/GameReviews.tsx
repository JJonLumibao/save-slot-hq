import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchGameReviews } from "../../api/reviews"
import type { Review } from "../../types"
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const GameReviews = ({ 
  gameId,
}: { 
  gameId: number;
}) => {
  const queryClient = useQueryClient();
  const { token, user } = useAuth();
  const { data: gameReviews = [], isLoading } = useQuery({
    queryKey: ["gameReviews", gameId],
    queryFn: () => fetchGameReviews(gameId),
  });

  const handleDelete = useMutation({
    mutationFn: async (reviewId: number) => {
      const res = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        toast.error("Failed to delete review");
        throw new Error("Failed to delete review");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["gameReviews", gameId]});
    }
  });

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <section className="game-reviews-container">
      <h2>Reviews ({gameReviews.length})</h2>

      <div className="all-reviews-list">
        {gameReviews.length > 0 ? (
          gameReviews.map((review: Review) => (
            <div className="all-review-card game-review-card" key={review.id}>
              {(user?.role === "PREMIUM" && user.username === review.user.username) || user?.role === "ADMIN"
                ? <i 
                    className="fa-solid fa-trash-can review-trash"
                    onClick={() => handleDelete.mutate(review.id)}
                  />
                : <></>
              }
              <h3>{review.user?.username}</h3>
              {Array.from({ length: review.rating }).map(() => (
                <i className="fa-solid fa-star" />
              ))}
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="section-status">Be the first to leave a review!</p>
        )}
      </div>
    </section>
  );
};