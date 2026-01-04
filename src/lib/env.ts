export const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  if (!url) throw new Error('NEXT_PUBLIC_BASE_URL is not set');
  return url;
};

export const BASE_URL = getBaseUrl();
