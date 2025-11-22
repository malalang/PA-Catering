import { createClient } from '@/lib/supabase/client';

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  phoneNumber?: string
) => {
  const supabase = createClient();

  // Sign up user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        phone_number: phoneNumber || '',
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  // Create user profile in public.profiles table
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      // @ts-ignore - Supabase type inference issue with Database types
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        display_name: displayName,
        phone: phoneNumber || '',
      });

    if (profileError) {
      console.error('Error creating user profile:', profileError);
    }
  }

  return authData.user;
};
