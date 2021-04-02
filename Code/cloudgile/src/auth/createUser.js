import firebase from 'firebase/app'
import 'firebase/database'
import { getCurrentUser } from './getCurrentUser';

export const createUser = async (userid) => {
        await firebase.database().ref('users/' + userid).once('value', snapshot => {
            if (snapshot.exists()) {
                return;
            }
            else {
                snapshot.ref.update(getCurrentUser())
                snapshot.ref.child('numProjects').set(0)
                snapshot.ref.child('firstUser').set(true)
            }
        }, error => {
            throw new Error(error.message);
        })
}
