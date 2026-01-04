export const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  if (!url) throw new Error('NEXT_PUBLIC_BASE_URL is not set');
  return url;
};

export const BASE_URL = getBaseUrl();

export const checkIsSecured = () => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  if (!environment) throw new Error('NEXT_PUBLIC_ENVIRONMENT is not set');

  return environment === 'PRODUCTION';
};
