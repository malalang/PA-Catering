'use server'
import { cookies } from "next/headers"
import type { CookieName } from "./setCookie"

export default async function deleteCookie(Name: CookieName,) {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(Name)

  } catch (error) {
    console.error(`Error setting cookie ${Name}:`, error);
    throw new Error("Authentication failed");
  }
}