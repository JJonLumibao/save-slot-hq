export async function fetchGames() {
  const res = await fetch("http://localhost:3000/games");
  
  if (!res.ok) throw new Error("Failed to fetch all games");
  
  return res.json();
}