export const TELEGRAM_AUTH_URL = "https://t.me/RUF_System_bot";

export const AUTH_STORAGE_KEYS = {
  isAuthenticated: "ruf_is_authenticated",
} as const;

export const setAuthenticated = () => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEYS.isAuthenticated, "true");
};

export const getIsAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_STORAGE_KEYS.isAuthenticated) === "true";
};


