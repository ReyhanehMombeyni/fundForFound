export const env = {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env
      .NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    NEXT_PUBLIC_FRONT_URL: process.env.NEXT_PUBLIC_FRONT_URL as string,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env
      .NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string,
    NEXT_PUBLIC_GOOGLE_USER_PASSWORD: process.env
      .NEXT_PUBLIC_GOOGLE_USER_PASSWORD as string,
    NEXT_PUBLIC_STRAPI_ADMIN_TOKEN: process.env
      .NEXT_PUBLIC_STRAPI_ADMIN_TOKEN as string,
    JWT_SECRET: process.env
      .JWT_SECRET as string,
  };
  
  if (!env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    throw new Error(
      "Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID in environment variables"
    );
  }
  
  if (!env.NEXT_PUBLIC_FRONT_URL) {
    throw new Error("Missing NEXT_PUBLIC_FRONT_URL in environment variables");
  }
  
  if (!env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET) {
      throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_SECRET in environment variables");
    }
  
    if (!env. NEXT_PUBLIC_API_URL) {
      throw new Error("Missing  NEXT_PUBLIC_API_URL in environment variables");
    }
  
    if (!env.NEXT_PUBLIC_GOOGLE_USER_PASSWORD) {
      throw new Error("Missing NEXT_PUBLIC_GOOGLE_USER_PASSWORD in environment variables");
    }
  
    if (!env.NEXT_PUBLIC_STRAPI_ADMIN_TOKEN) {
      throw new Error("Missing NEXT_PUBLIC_STRAPI_ADMIN_TOKEN in environment variables");
    }

    // if (!env.JWT_SECRET) {
    //   throw new Error("Missing JWT_SECRET in environment variables");
    // }
  