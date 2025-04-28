"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { env } from '@/../lib/env';
import { RegisterData, TokenData, UserData } from "@/types/users";
import Loader from "./loader";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleLogin = async (): Promise<void> => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
  
      if (!code) {
        console.error("No code found in URL");
        return;
      }
  
      try {
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code: code,
            client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            client_secret: env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            redirect_uri: `${env.NEXT_PUBLIC_FRONT_URL}/auth/google/callback`,
            grant_type: "authorization_code",
          }),
        });
  
        const tokenData: TokenData = await tokenRes.json();
        if (!tokenData.access_token) {
          console.error("Failed to get access token");
          return;
        }
        const accessToken = tokenData.access_token;
  
        const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData: UserData = await userRes.json();
  
        if (!userData.email) {
          console.error("Failed to fetch user data");
          return;
        }
  
        const res = await fetch(
          `https://fundforfoun-strapi.onrender.com/api/users?filters[email][$eq]=${encodeURIComponent(
            userData.email
          )}`,
          {
            headers: {
              Authorization: `Bearer ${env.NEXT_PUBLIC_STRAPI_ADMIN_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const user = await res.json();
  
        if (user && user[0]?.email) {
          router.push("/auth/logIn");
        } else {
          const registerRes = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: userData.name || userData.email.split("@")[0],
                email: userData.email,
                password: env.NEXT_PUBLIC_GOOGLE_USER_PASSWORD,
              }),
            }
          );
          const registerData: RegisterData = await registerRes.json();
  
          const userId = registerData.user.id;
          await fetch(
            `${env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
            {
              method: "PUT",
              headers: {
                Authorization:
                  `Bearer ${env.NEXT_PUBLIC_STRAPI_ADMIN_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ confirmed: true }),
            }
          );
  
          const loginRes = await fetch(
            `${env.NEXT_PUBLIC_API_URL}/api/auth/local`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                identifier: userData.email,
                password: env.NEXT_PUBLIC_GOOGLE_USER_PASSWORD,
              }),
            }
          );
          const loginData = await loginRes.json();
  
          if (loginData.jwt) {
            localStorage.setItem("token", loginData.jwt);
            router.push("/auth/dashboard");
          } else {
            console.error("Login failed");
            router.push("/auth/logIn");
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
        router.push("/auth/logIn");
      }
    };
    handleGoogleLogin();
  }, [router]);

  return <div><Loader /></div>;
}
