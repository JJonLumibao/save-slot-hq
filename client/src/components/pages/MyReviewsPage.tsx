import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserReviews } from "../../api/reviews"
import { Header } from "../sections/Header";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { GroupedReviewList } from "../cards/GroupedReviewList";

export function MyReviewsPage () {
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  const { data: userReviews = [], isLoading } = useQuery({
    queryKey: ["userReviews", user?.id],
    enabled: user?.role === "PREMIUM" && !!token,
    queryFn: () => fetchUserReviews(user!.id, token!),
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
      queryClient.invalidateQueries({ queryKey: ["userReviews", user?.id]});
    }
  });
  
  return (
    <>
      <Header />    
      {isLoading && <p className="section-status">Loading reviews...</p>}
      <GroupedReviewList 
        title={"My Reviews"}
        reviews={userReviews}
        showUsername={false}
        onDelete={(reviewId) => handleDelete.mutate(reviewId)}
      />
    </>
  );
};