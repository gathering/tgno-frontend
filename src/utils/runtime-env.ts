import { getSecret } from "astro:env/server";

const requireRuntimeEnv = (name: string) => {
  const value = getSecret(name);

  if (!value) {
    throw new Error(`Missing required runtime environment variable: ${name}`);
  }

  return value;
};

export const API_URL = requireRuntimeEnv("API_URL");
export const SITE_URL = requireRuntimeEnv("SITE_URL");
export const MATOMO_SITE_ID = getSecret("MATOMO_SITE_ID");
export const MATOMO_INSTANCE_URL = getSecret("MATOMO_INSTANCE_URL");
export const TZ = getSecret("TZ");
