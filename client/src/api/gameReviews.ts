export async function fetchGameReviews(gameId: number) {
  const res = await fetch(`http://localhost:3000/games/${gameId}/reviews`);
  
  if (!res.ok) throw new Error("Failed to fetch game reviews");
  
  return res.json();
}