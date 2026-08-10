/**
 * Centralized API base URL for the Website.
 * Reads from NEXT_PUBLIC_API_URL env var, falls back to Railway production backend.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ua-engineering-pte-ltd-backend-production.up.railway.app";

/**
 * Normalizes image paths so uploaded images (Base64 data URLs, uploaded server files, or local assets)
 * load correctly from the active backend API or database.
 */
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return "/images/logo.png";
  
  if (imagePath.startsWith("data:") || imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath.replace("http://localhost:5000", API_BASE);
  }
  
  if (imagePath.startsWith("/images/uploads/")) {
    return `${API_BASE}${imagePath}`;
  }
  
  return imagePath; // Falls back to local static assets
};

export const getBlogImageUrl = getImageUrl;
