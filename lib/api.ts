/**
 * Centralized API base URL for the Website.
 * Reads from NEXT_PUBLIC_API_URL env var, auto-detects localhost:5000 in local dev,
 * or falls back to Railway production backend.
 */
const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "");
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000";
    }
  }
  return "https://ua-engineering-pte-ltd-backend-production.up.railway.app";
};

export const API_BASE = getApiBaseUrl();

/**
 * Normalizes image paths so uploaded images (Base64 data URLs, uploaded server files, or local assets)
 * load correctly from the active backend API or database.
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "/images/logo.png";
  
  if (imagePath.startsWith("data:") || imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  if (imagePath.startsWith("/images/uploads/")) {
    return `${API_BASE}${imagePath}`;
  }
  
  return imagePath; // Falls back to local static assets
};

export const getBlogImageUrl = getImageUrl;
