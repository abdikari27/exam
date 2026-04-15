import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "customer" | "producer" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  loyaltyPoints: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<string, User & { password: string }> = {
  "customer@glh.co.uk": { id: "u1", name: "Sarah Johnson", email: "customer@glh.co.uk", role: "customer", loyaltyPoints: 245, password: "password" },
  "producer@glh.co.uk": { id: "u2", name: "James Meadow", email: "producer@glh.co.uk", role: "producer", loyaltyPoints: 0, password: "password" },
  "admin@glh.co.uk": { id: "u3", name: "Admin User", email: "admin@glh.co.uk", role: "admin", loyaltyPoints: 0, password: "password" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, _password: string, _role?: UserRole) => {
    const found = mockUsers[email.toLowerCase()];
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    const newUser: User = { id: `u${Date.now()}`, name, email, role: "customer", loyaltyPoints: 0 };
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
