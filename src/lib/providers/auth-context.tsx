import * as React from "react";

export interface StoredUser {
  userId: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthContext {
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  user: StoredUser | null;
}

type LoginPayload =
  | { type: "email"; data: { email: string; password: string } }
  | { type: "phone"; data: { phone: string } };

const AuthContext = React.createContext<AuthContext | null>(null);

const userKey = "tanstack.auth.user";
const usersKey = "form-storage-users";

function getStoredUserId(): string | null {
  return localStorage.getItem(userKey);
}

function setStoredUserId(userId: string | null) {
  if (userId) {
    localStorage.setItem(userKey, userId);
  } else {
    localStorage.removeItem(userKey);
  }
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(usersKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<StoredUser | null>(null);
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    setStoredUserId(null);
    setUser(null);
    window.location.replace("/auth/login");
  }, []);

  const login = React.useCallback(
    async (payload: LoginPayload): Promise<{ success: boolean; message: string }> => {
      const users = getStoredUsers();

      let matchedUser: StoredUser | undefined;

      if (payload.type === "email") {
        const { email, password } = payload.data;
        matchedUser = users.find(
          (u) => u.email === email && u.password === password
        );
      } else if (payload.type === "phone") {
        const { phone } = payload.data;
        matchedUser = users.find((u) => u.phone === phone);
      }

      if (!matchedUser) {
        return { success: false, message: "Invalid credentials" };
      }

      setStoredUserId(matchedUser.userId);
      setUser(matchedUser);

      return { success: true, message: "Login successful" };
    },
    []
  );

  React.useEffect(() => {
    const userId = getStoredUserId();
    if (!userId) return;

    const users = getStoredUsers();
    const matched = users.find((u) => u.userId === userId);
    if (matched) {
      setUser(matched);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
