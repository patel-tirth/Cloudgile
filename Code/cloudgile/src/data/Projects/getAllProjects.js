import firebase from 'firebase/app'
import 'firebase/database'

export const getAllProjects = async(user_id) => {
    try {
        let data;
        await firebase.database().ref('/users/' + user_id + '/projects/').once('value', snapshot => {
            data = snapshot.val();
        })
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
}
