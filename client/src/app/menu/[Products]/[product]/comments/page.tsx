import { createClient } from "@/lib/supabase/server";
import CommentsForm from "@/lib/forms/CommentsForm";
import { redirect } from "next/navigation";
interface CommentsProps {
	params: Promise<{ product: string }>;
}
const Comments:React.FC<CommentsProps> = async ({ params }) => {
		const supabase = await createClient();
		const { data: { user }, error } = await supabase.auth.getUser();
	if (error || !user?.id) {
		return redirect('/login');
	}
	const ProductName = (await params).product;
	return (
		<CommentsForm ProductName={ProductName}  />
	);
};

export default Comments;
