import { createClient } from '@/lib/supabase/server';
import NavbarClient from './NavbarClient';

const Navbar = async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return <NavbarClient user={user} />;
};

export default Navbar;
