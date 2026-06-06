export async function fetchFavorites(token: string) {
  const res = await fetch("http://localhost:3000/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}