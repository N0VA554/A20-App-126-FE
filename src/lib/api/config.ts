const normalizeBaseUrl = (raw?: string) => {
  const value = (raw || "").trim();
  if (!value) return "/api/v1/";
  return value.endsWith("/") ? value : `${value}/`;
};

export const API_BASE_URL = normalizeBaseUrl(
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
);

export const PUBLIC_API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL || process.env.API_URL
);

export const DEV_AUTH_BYPASS =
  process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";

