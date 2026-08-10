/**
 * Centralized API base URL for the Website.
 * - If NEXT_PUBLIC_API_URL is configured in environment, use it.
 * - Otherwise default to http://localhost:5000 for local dev & backend server.
 */
export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "");
  }
  return "http://localhost:5000";
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
