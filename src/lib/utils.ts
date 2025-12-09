import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    console.warn("VITE_API_URL not set in .env, defaulting to http://localhost:8000");
    return "http://localhost:8000";
  }
  return apiUrl.replace(/\/$/, ""); // Remove trailing slash if present
}
