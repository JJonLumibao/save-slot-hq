import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { Header } from "../sections/Header"
import { fetchUsers } from "../../api/users";
import toast from "react-hot-toast";
import { useState } from "react";
import { ConfirmModal } from "../cards/ConfirmModal";
import type { ManageUser } from "../../types";
import { RoleDropdown } from "../forms/RoleDropdown";


export function ManageUsersPage() {
  const queryClient = useQueryClient();
  const { user, token } = useAuth();
  const [selectedUser, setSelectedUser] = useState<ManageUser | null>(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  
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

  const handleDelete = useMutation({
    mutationFn: async (userId: number) => {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        toast.error("Failed to delete user");
        throw new Error("Failed to delete user");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allUsers", user?.id]});
    }
  });

  return (
    <>
      <div className="default-page manage-user-roles-page">
        <Header />
        {isLoading && <p className="section-status">Loading users...</p>}
        <p className="form-header">Manage Users</p>
        <div className="all-users-table">
          <div className="all-users-row all-users-header">
            <span>Username</span>
            <span>Email</span>
            <span>Role</span>
            <span>Delete User</span>
          </div>
          {allUsers
            .map((u: ManageUser) => (
            <div className="all-users-row" key={u.id}>
              <span>{u.username}</span>
              <span>{u.email}</span>
              <RoleDropdown 
                value={u.role}
                disabled={u.id === user!.id}
                onChange={(newRole) => handleRoleChange(u.id, newRole)}
              />
              {u.id !== user?.id
                ? <i 
                    className="fa-solid fa-trash-can"
                    onClick={() => {
                      setSelectedUser(u);
                      setConfirmDeleteVisible(true)
                    }}
                  />
                : <></>
              }
            </div>
          ))}
        </div>
      </div>
      {confirmDeleteVisible && selectedUser && (
        <ConfirmModal 
          data={selectedUser}
          setShowState={setConfirmDeleteVisible}
          onClickEvent={() => {
            handleDelete.mutate(selectedUser.id);
            setConfirmDeleteVisible(false);
          }}
        />
      )};
    </>
  )
}