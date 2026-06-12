export async function fetchGameReviews(gameId: number) {
  const res = await fetch(`http://localhost:3000/games/${gameId}/reviews`);
  
  if (!res.ok) throw new Error("Failed to fetch game reviews");
  
  return res.json();
}

export async function fetchAllReviews(token: string) {
  const res = await fetch(`http://localhost:3000/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch all reviews");
  
  return res.json();
}

export async function fetchUserReviews(userId: number, token: string) {
  const res = await fetch(`http://localhost:3000/users/${userId}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch user's reviews");
  
  return res.json();
}