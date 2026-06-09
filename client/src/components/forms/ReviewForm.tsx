import { useState } from "react"
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ReviewForm = ({
  gameId,
}: {
  gameId: number;
}) => {
  const queryClient = useQueryClient();
  const { token, user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = useMutation({
    mutationFn: async () => {
    
      if (!token) {
        throw new Error("Not authenticated");
      };

      const res = await fetch(`http://localhost:3000/games/${gameId}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating, 
          comment,
        }),

      });
      if (!res.ok) {
        throw new Error("Failed to submit review");
      }
      return res.json();
    },

    onSuccess: () => {
      setRating(0);
      setComment("");
      queryClient.invalidateQueries({
        queryKey: ["reviews", gameId],
      })
    }
  });

  return (
    <div className="review-container">
      <h2 className="">Leave a Review</h2>
      <div className="rating-review">
        {[1, 2, 3, 4, 5].map((star) => (
          <>
            <i className="fa-solid fa-star star-border" />
            <i 
              key={star}
              className={`fa-solid fa-star star-click ${
                star <= rating ? "selected-star" : ""
              }`}
              onClick={() => {
                if(!handleSubmit.isPending) {
                  setRating(star);
                }
              }}
            />
          </>
        ))}
      </div>
      <div className="comment-review">
        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            if (rating === 0) return;
            handleSubmit.mutate();
          }}>
          <textarea 
            className="review-text"
            placeholder="Type your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={handleSubmit.isPending}
          />
          <button
            type="submit"
            className="log-button"
            disabled={handleSubmit.isPending || comment.length === 0 || rating === 0} 
          >
            {handleSubmit.isPending
              ? "Submitting..."
              : "Submit Review"
            }
          </button>
        </form>
      </div>
      {user?.role !== "PREMIUM"
        ? <div className="premium-block"></div>
        : ""
      }
    </div>
  )
}