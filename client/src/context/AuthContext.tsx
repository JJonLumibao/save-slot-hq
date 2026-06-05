import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { Game, User } from "../types";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  favorites: Game[];
  setFavorites: Dispatch<SetStateAction<Game[]>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode,
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Game[] | []>([]);

  useEffect(() => {
    const loadFavoriteState = async () => {
      if (!token) return;

      const res = await fetch("http://localhost:3000/users/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFavorites(data);
    };
    loadFavoriteState();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, favorites, setFavorites }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
