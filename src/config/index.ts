import * as dotenv from 'dotenv';
dotenv.config();

// Helper function to parse numeric environment variables safely
function parseNumericEnv(value: string | undefined, defaultValue: number): number {
  if (value === undefined) {
    return defaultValue;
  }
  const parsedValue = parseInt(value, 10);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
}

// Create a configuration object to hold environment variables
const config: Record<string, any> = {
  accessJwt: {
    secret: process.env.ACCESS_SECRET_JWT_KEY ?? '', // Provide empty string if null or undefined
    audience: process.env.ACCESS_JWT_AUDIENCE ?? undefined, // Provide undefined if null or undefined
    issuer: process.env.ACCESS_JWT_ISSUER ?? undefined, // Provide undefined if null or undefined
    expiresIn: parseNumericEnv(process.env.ACCESS_JWT_EXPIRES_IN, 0) // Provide 0 if null or undefined
  },
  refreshJwt: {
    secret: process.env.REFRESH_SECRET_JWT_KEY ?? '', // Provide empty string if null or undefined
    audience: process.env.REFRESH_JWT_AUDIENCE ?? undefined, // Provide undefined if null or undefined
    issuer: process.env.REFRESH_JWT_ISSUER ?? undefined, // Provide undefined if null or undefined
    expiresIn: parseNumericEnv(process.env.REFRESH_JWT_EXPIRES_IN, 0) // Provide 0 if null or undefined
  },
  port: parseNumericEnv(process.env.PORT, 3000), // Provide 3000 if null or undefined
  prefix: process.env.API_PREFIX ?? 'api', // Provide 'api' if null or undefined
  version: process.env.VERSION ?? 'v1', // Provide 'version' if null or undefined
  db: {
    host: process.env.DB_HOST ?? '', // Provide empty string if null or undefined
    user: process.env.DB_USER ?? '', // Provide empty string if null or undefined
    password: process.env.DB_PASSWORD ?? '', // Provide empty string if null or undefined
    database: process.env.DB_DATABASE ?? '', // Provide empty string if null or undefined
    port: process.env.DB_PORT ?? '', // Provide empty string if null or undefined
    retryCount: 5
  },
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID ?? '',
    client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    redirect_url: process.env.REDIRECT_URL ?? ''
  },
  client_url: process.env.CLIENT_URL ?? ''
};

export default config;
