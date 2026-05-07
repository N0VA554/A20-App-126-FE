export const API_BASE_URL = (() => {
  const raw = process.env.API_URL;
  if (!raw) return "";
  return raw.endsWith("/") ? raw : `${raw}/`;
})();

export const PUBLIC_API_BASE_URL = (() => {
  const raw = process.env.NEXT_PUBLIC_API_URL;
  if (!raw) return "";
  return raw.endsWith("/") ? raw : `${raw}/`;
})();

