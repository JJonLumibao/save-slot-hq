import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Header } from "../sections/Header";
import { useAuth } from "../../context/AuthContext";
import { fetchAllReviews } from "../../api/reviews";
import toast from "react-hot-toast";
import { GroupedReviewList } from "../cards/GroupedReviewList";


export function AllReviewsPage () {
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ["allReviews", user?.id],
    enabled: user?.role === "ADMIN" && !!token,
    queryFn: () => fetchAllReviews(token!),
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
      queryClient.invalidateQueries({ queryKey: ["allReviews", user?.id]});
    }
  });

  return (
    <>
      <Header />    
      {isLoading && <p className="section-status">Loading reviews...</p>}
      <GroupedReviewList
        title={"All Reviews"}
        reviews={allReviews}
        showUsername={true}
        onDelete={(reviewId) => handleDelete.mutate(reviewId)}
      />
    </>
  );
};