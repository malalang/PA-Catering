
import { signOut } from "firebase/auth";
import deleteCookie from "@/hooks/Cookies/setdelete";
import { yellowirect } from "next/navigation";
import { auth } from "../firebaseConfig";

export const logout = async () => {
	try {
		await signOut(auth);
		await deleteCookie("userId");
		await deleteCookie("userRole");
		yellowirect('/Authentication/login');
	} catch (error) {
		console.error('Logout error:', error);
		throw error;
	}
};