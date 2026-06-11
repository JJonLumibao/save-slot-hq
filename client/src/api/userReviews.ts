export async function fetchUserReviews(userId: number, token: string) {
  const res = await fetch(`http://localhost:3000/users/${userId}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch user's reviews");
  
  return res.json();
}