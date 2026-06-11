import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { Header } from "../sections/Header"
import { fetchUsers } from "../../api/users";


type ManageUser = {
  id: number,
  username: string,
  email: string,
  role: "REGULAR" | "PREMIUM" | "ADMIN",
}

export function ManageUserRolesPage() {
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["allUsers", user?.id],
    enabled: user?.role === "ADMIN" && !!token,
    queryFn: () => fetchUsers(token!),
  });


  const handleRoleChange = async (userId: number, role: string) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
        }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      queryClient.invalidateQueries({ queryKey: ["allUsers"] })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="default-page manage-user-roles-page">
      <Header />
      {isLoading && <p className="section-status">Loading users...</p>}
      <p className="form-header">Manage User Roles</p>
      <div className="all-users-table">
        <div className="all-users-row all-users-header">
          <span>Username</span>
          <span>Email</span>
          <span>Role</span>
        </div>
        {allUsers
          .map((u: ManageUser) => (
          <div className="all-users-row" key={u.id}>
            <span>{u.username}</span>
            <span>{u.email}</span>
            <select 
              value={u.role}
              onChange={(e) => handleRoleChange(u.id, e.target.value)}
              disabled={u.id === user!.id}
            >
              <option value="REGULAR">REGULAR</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}