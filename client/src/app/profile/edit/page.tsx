import Main from "@/components/ui/layout/Main";
import EditProfileForm from "@/lib/forms/EditProfileForm";


const EditProfilePage: React.FC = () => {

	return (
		<Main tittle="Edit Profile">
			<EditProfileForm />
		</Main>
	);
};

export default EditProfilePage;
