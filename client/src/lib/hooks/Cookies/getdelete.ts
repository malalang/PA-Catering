'use server'
import { cookies } from "next/headers"
import type { CookieName } from "./setCookie"

export default async function getCookie(Name: CookieName,) {
  try {
    const cookieStore = await cookies()
    return cookieStore.get(Name)?.value
  } catch (error) {
    console.error(`Error setting cookie ${Name}:`, error);
    throw new Error("Authentication failed");
  }
}