// contexts/UserContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { SessionData } from "@/lib/jwt";

// Types
interface UserState {
  user: SessionData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type UserAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: SessionData }
  | { type: "CLEAR_USER" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "UPDATE_USER"; payload: Partial<SessionData> };

interface UserContextType extends UserState {
  login: (user: SessionData, accessToken: string) => void;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<boolean>;
  updateUser: (updates: Partial<SessionData>) => void;
  clearError: () => void;
}

// Initial state
const initialState: UserState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

// Reducer
function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "CLEAR_USER":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
}

// Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper function to get user from cookie
function getUserFromCookie(): SessionData | null {
  if (typeof window === "undefined") return null;

  try {
    const cookies = document.cookie.split(";");
    const sessionCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("user-session="),
    );

    if (!sessionCookie) return null;

    const sessionData = sessionCookie.split("=")[1];
    const decodedData = decodeURIComponent(sessionData);
    return JSON.parse(decodedData);
  } catch (error) {
    console.error("Error parsing user session cookie:", error);
    return null;
  }
}

// Helper function to clear all auth cookies
function clearAuthCookies() {
  if (typeof window === "undefined") return;

  const cookiesToClear = ["access-token", "refresh-token", "user-session"];
  cookiesToClear.forEach((cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Initialize user from cookie on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userFromCookie = getUserFromCookie();

        if (userFromCookie) {
          // Verify the session is still valid by trying to refresh
          const isValid = await refreshAuth();
          if (!isValid) {
            dispatch({ type: "CLEAR_USER" });
            clearAuthCookies();
          }
        } else {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (user: SessionData, accessToken: string) => {
    dispatch({ type: "SET_USER", payload: user });
    if (accessToken) {
      // Optionally, you can store the access token in memory or context if needed
      // For security reasons, avoid storing it in localStorage or non-httpOnly cookies
    }
  };

  // Logout function
  const logout = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      // Call logout API
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear local state and cookies
      dispatch({ type: "CLEAR_USER" });
      clearAuthCookies();

      // Redirect to login page
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local state
      dispatch({ type: "CLEAR_USER" });
      clearAuthCookies();
      window.location.href = "/auth/login";
    }
  };

  // Refresh authentication
  const refreshAuth = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_USER", payload: data.user });
        return true;
      } else {
        dispatch({ type: "CLEAR_USER" });
        clearAuthCookies();
        return false;
      }
    } catch (error) {
      console.error("Auth refresh error:", error);
      dispatch({ type: "CLEAR_USER" });
      clearAuthCookies();
      return false;
    }
  };

  // Update user data
  const updateUser = (updates: Partial<SessionData>) => {
    dispatch({ type: "UPDATE_USER", payload: updates });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const contextValue: UserContextType = {
    ...state,
    login,
    logout,
    refreshAuth,
    updateUser,
    clearError,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// HOC for components that require authentication
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useUser();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D2145A]"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
      return null;
    }

    return <Component {...props} />;
  };
}
