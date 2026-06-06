export async function fetchGames() {
  const res = await fetch("http://localhost:3000/games");
  return res.json();
}