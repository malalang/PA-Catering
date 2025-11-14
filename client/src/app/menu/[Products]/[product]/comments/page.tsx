import GetServerUser from "@/lib/firebase/users/server/GetServerUser";
import CommentsForm from "@/lib/forms/CommentsForm";
import { redirect } from "next/navigation";
interface CommentsProps {
	params: Promise<{ product: string }>;
}
const Comments:React.FC<CommentsProps> = async ({ params }) => {
		const user = await GetServerUser();
	if (!user?.uid) {
		return redirect('/Authentication/login');
	}
	const ProductName = (await params).product;
	return (
		<CommentsForm ProductName={ProductName}  />
	);
};

export default Comments;
