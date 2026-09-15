/**
 * Centralized API base URL for the Website.
 * - If NEXT_PUBLIC_API_URL is configured in environment, use it.
 * - Otherwise default to http://localhost:5000 for local dev & backend server.
 */
export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `${protocol}//${hostname}:5000`;
    }
    // Dynamic production fallback (VPS domain/IP on port 5000)
    return `${protocol}//${hostname}:5000`;
  }
  return "http://127.0.0.1:5000";
};

export const API_BASE = getApiBaseUrl();

/**
 * Normalizes image paths so uploaded images (Base64 data URLs, uploaded server files, or local assets)
 * load correctly from the active backend API or database.
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "/images/logo.webp";

  if (imagePath.startsWith("data:") || imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  if (imagePath.startsWith("/images/uploads/")) {
    return `${getApiBaseUrl()}${imagePath}`;
  }

  return imagePath; // Falls back to local static assets
};

export const getBlogImageUrl = getImageUrl;
