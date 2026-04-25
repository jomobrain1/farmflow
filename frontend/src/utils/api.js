const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "https://farmflow-alpha.vercel.app/";

export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const apiUrl = (path) =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
