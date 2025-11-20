import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  setAuth: (data: {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: AuthState["user"];
  }) => void;
  resetAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  isAdmin: false,
  user: null,

  setAuth: ({ isLoggedIn, isAdmin, user }) =>
    set(() => ({
      isLoggedIn,
      isAdmin,
      user,
    })),

  resetAuth: () =>
    set(() => ({
      isLoggedIn: false,
      isAdmin: false,
      user: null,
    })),
}));
