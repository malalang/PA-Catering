-- Create or replace the function with existence check
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only create a profile if one does not already exist for this id or uid
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id OR uid = NEW.id::text) THEN
    INSERT INTO public.profiles (
      id,
      email,
      display_name,
      phone,
      role,
      uid,
      email_verified,
      photo_url,
      address,
      city,
      state,
      zip_code,
      country,
      theme,
      referral_code,
      preferences,
      saved_payment_methods,
      metadata,
      created_at,
      updated_at,
      last_login
    )
    VALUES (
      NEW.id,
      NEW.email,
      NEW.raw_user_meta_data ->> 'display_name',
      NEW.raw_user_meta_data ->> 'phone_number',
      'customer',
      NEW.id::text,
      COALESCE((NEW.email_confirmed_at IS NOT NULL), false),
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      'system',
      NULL,
      jsonb_build_object(
        'dietaryRestrictions', '[]'::jsonb,
        'favoriteItems', '[]'::jsonb,
        'preferyellowPaymentMethod', 'credit_card',
        'communicationPreferences', jsonb_build_object(
          'email', true,
          'sms', false,
          'promotions', true
        )
      ),
      '[]'::jsonb,
      jsonb_build_object(
        'raw_user_meta_data', NEW.raw_user_meta_data,
        'app_metadata', NEW.raw_app_meta_data
      ),
      now(),
      now(),
      now()
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Replace trigger: drop then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();