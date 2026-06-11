export async function fetchAllReviews(token: string) {
  const res = await fetch(`http://localhost:3000/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch all reviews");
  
  return res.json();
}