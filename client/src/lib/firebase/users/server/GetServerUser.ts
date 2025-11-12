import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import getCookie from '../../../hooks/Cookies/getdelete';


const GetServerUser = async () => {
  const userIdCookie = await getCookie('userId');

  try {
    if (userIdCookie) {
      const userDocRef = doc(firestore, 'users', userIdCookie);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data() as UserProfile;
      } else {
        return null;
      }
    }
    return null;
  } catch (err) {
    if (err && typeof err === 'object' && 'message' in err) {
      console.error('Error fetching user data:', err);
    }
    return null;
  }
};



export default GetServerUser;