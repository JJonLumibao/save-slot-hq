import { useState } from "react";

type Role = "REGULAR" | "PREMIUM" | "ADMIN";

const roles: Role[] = ["REGULAR", "PREMIUM", "ADMIN"];

export function RoleDropdown({
  value,
  onChange,
  disabled,
}: {
  value: Role;
  onChange: (role: Role) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (role: Role) => {
    onChange(role);
    setOpen(false);
  };

  return (
    <div className="role-dropdown">
      <button
        type="button"
        className="role-dropdown-button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
      >
        {value}
        <span className="arrow">▼</span>
      </button>

      {!disabled && (
        <div className={`role-dropdown-menu ${open ? "open" : ""}`}>
          {roles.map((role) => (
            <div
              key={role}
              className={`role-dropdown-item ${role.toLowerCase()}`}
              onClick={() => handleSelect(role)}
            >
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}