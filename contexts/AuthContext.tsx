"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  slug: string;
  gender: string;
  authType: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Reusable function to fetch user data from /me
const fetchUserData = async () => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include", // Sends HTTP-only cookie automatically
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch user data");
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      setLoading(true);
      if (typeof window !== "undefined") {
        const userData = await fetchUserData(); // Use the reusable function
        setUser(userData.data);
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      setUser(null);
      localStorage.removeItem("user");
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      setUser(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkAuth();
    } else {
      console.log("window is not defined");
    }
  }, [window]);

  return (
    <AuthContext.Provider value={{ user, loading, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
