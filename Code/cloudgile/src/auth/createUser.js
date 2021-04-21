import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import { getCurrentUser } from './getCurrentUser';

export const createUser = async (userid) => {

    await firebase.database().ref('users/' + userid).once('value', snapshot => {
        if (snapshot.exists()) {
            return;
        } else {
            snapshot.ref.update(getCurrentUser())
        }
    })

    const userRef = firebase.firestore().collection('users').doc(userid);
    await userRef.get().then(async (doc) => {
        if (!doc.exists) {
            await userRef.set({
                ...getCurrentUser(),
                numProjects: 0,
                firstUser: true,
                reminders: []
            })
        }
    })
}
