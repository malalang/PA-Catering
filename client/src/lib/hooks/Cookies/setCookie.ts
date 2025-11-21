'use server'
import { cookies } from "next/headers"
const COOKIE_EXPIRY = 60 * 60 * 24 * 5;
export type CookieName = "userId" | "userRole"

export default async function setCookie(Name: CookieName, Value: string) {
  try {
    const cookieStore = await cookies()
    cookieStore.set(Name, Value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_EXPIRY,
      path: '/'
    })

    // Verify the cookie was set
    const verifyValue = cookieStore.get(Name)?.value;
    if (verifyValue !== Value) {
      console.error(`Failed to set cookie ${Name}. Expected: ${Value}, Got: ${verifyValue}`);
      throw new Error("Failed to set cookie");
    }

    return true;
  } catch (error) {
    console.error(`Error setting cookie ${Name}:`, error);
    throw new Error("Authentication failed");
  }
}