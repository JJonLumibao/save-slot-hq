export async function fetchFavorites(token: string) {
  const res = await fetch("http://localhost:3000/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch all favorites");

  return res.json();
}