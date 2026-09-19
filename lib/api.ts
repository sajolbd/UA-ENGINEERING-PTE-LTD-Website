/**
 * Centralized API base URL for the Website.
 * - If NEXT_PUBLIC_API_URL is configured in environment, use it.
 * - Otherwise default to http://localhost:5000 for local dev & backend server.
 */
const LIVE_API_FALLBACK = "https://api.uaengineering.com.sg";

export const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim().length > 0) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");
  }
  return LIVE_API_FALLBACK;
};

export const API_BASE = getApiBaseUrl();

/**
 * Normalizes image paths so uploaded images (Base64 data URLs, uploaded server files, or local assets)
 * load correctly from the active backend API or database.
 */
export const getImageUrl = (imagePath?: string, fallback: string = "/images/logo.webp", cacheKey?: string | number): string => {
  if (!imagePath || typeof imagePath !== "string") return fallback;

  const trimmed = imagePath.trim();
  if (!trimmed) return fallback;

  const withCacheKey = (url: string) => {
    if (!cacheKey || url.startsWith("data:")) return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}v=${encodeURIComponent(String(cacheKey))}`;
  };

  if (trimmed.startsWith("data:") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return withCacheKey(trimmed);
  }

  if (trimmed.startsWith("/images/uploads/")) {
    return withCacheKey(`${getApiBaseUrl()}${trimmed}`);
  }

  if (trimmed.startsWith("images/uploads/")) {
    return withCacheKey(`${getApiBaseUrl()}/${trimmed}`);
  }

  return withCacheKey(trimmed.startsWith("/") ? trimmed : `/${trimmed}`);
};

export const getBlogImageUrl = getImageUrl;
