"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { postJson } from "@/src/lib/api/http";
import { PUBLIC_API_BASE_URL } from "@/src/lib/api/config";
import { API_ROUTES } from "@/src/lib/api/routes";

// 1. Định nghĩa Interface chuẩn
export type UserRole = "LECTURER" | "STUDENT";

export interface AuthUser {
  created_at: string;
  email: string;
  full_name: string;
  is_active: number;
  role: UserRole;
  uni_id: number;
  user_id: number;
  username: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

// 2. Khởi tạo Context với Type rõ ràng
const AuthContext = createContext<AuthContextType | null>(null);

const LS_KEY = "auth_user";

const normalizeRole = (value: string | undefined): UserRole => {
  const normalized = String(value || "").trim().toUpperCase();
  if (["LECTURER", "INSTRUCTOR", "TEACHER"].includes(normalized)) {
    return "LECTURER";
  }
  return "STUDENT";
};

const normalizeUser = (user: AuthUser): AuthUser => ({
  ...user,
  role: normalizeRole(user.role),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as AuthUser;
      setUser(normalizeUser(parsed));
    } catch {
      localStorage.removeItem(LS_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const url = PUBLIC_API_BASE_URL
      ? `${PUBLIC_API_BASE_URL}${API_ROUTES.auth.login}`
      : "/api/auth/login";

    const res = await postJson<{
      success: boolean;
      data?: { user?: AuthUser };
    }>(url, { email, password });

    const u = res.data?.user;
    if (!res.success || !u) {
      throw new Error("Login failed");
    }

    const normalizedUser = normalizeUser(u);
    setUser(normalizedUser);
    localStorage.setItem(LS_KEY, JSON.stringify(normalizedUser));
    return normalizedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook có kiểm tra an toàn (Giúp bạn biết ngay nếu quên bọc AuthProvider)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Lỗi rồi! useAuth phải được dùng bên trong AuthProvider tại layout.tsx nhé.");
  }
  return context;
};