export async function fetchReviews(gameId: number) {
  const res = await fetch(`http://localhost:3000/games/${gameId}/reviews`);
  
  if (!res.ok) throw new Error("Failed to fetch all reviews");
  
  return res.json();
}