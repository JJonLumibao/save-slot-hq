export async function fetchUsers(token: string) {
  const res = await fetch("http://localhost:3000/users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  
  if (!res.ok) throw new Error("Failed to fetch all users");
  
  return res.json();
}