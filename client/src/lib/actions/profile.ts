"use server";

import { createClient } from "@/lib/supabase/server";

export type ProfileActionState = {
  success: boolean;
  error?: string;
};

export async function updateProfileAction(
  _prevState: ProfileActionState | null,
  formData: FormData
): Promise<ProfileActionState> {
  const displayName = String(formData.get("displayName") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim() || null;
  const photoURL = String(formData.get("photoURL") ?? "").trim() || null;

  if (!displayName) {
    return {
      success: false,
      error: "Display name is required.",
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "User not authenticated.",
      };
    }

    // Update user metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        display_name: displayName,
        phone_number: phoneNumber,
        photoURL: photoURL,
      },
    });

    if (updateError) {
      return {
        success: false,
        error: updateError.message,
      };
    }

    // Also update the profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      // @ts-ignore - Supabase type inference issue with Database types
      .update({
        display_name: displayName,
        phone: phoneNumber,
      })
      .eq("id", user.id);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      // Don't fail if profile update fails, but log it
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred while updating profile.",
    };
  }
}

export async function updateAddressAction(
  _prevState: ProfileActionState | null,
  formData: FormData
): Promise<ProfileActionState> {
  const address = String(formData.get("address") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const zipCode = String(formData.get("zipCode") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();

  if (!address || !city || !state || !zipCode || !country) {
    return {
      success: false,
      error: "All address fields are required.",
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "User not authenticated.",
      };
    }

    // Update user metadata with address information
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        address: address,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country,
      },
    });

    if (updateError) {
      return {
        success: false,
        error: updateError.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred while updating address.",
    };
  }
}





