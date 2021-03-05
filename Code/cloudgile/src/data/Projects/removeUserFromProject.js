import firebase from 'firebase/app'
import 'firebase/database'

export const removeUserFromProject = async (project_id, request_id, user_id) => {
    await firebase.database().ref('/projects/' + project_id).once('value', snapshot => {
        if (snapshot.child('/admin/').val() === request_id) {
            firebase.database().ref('/projects/' + project_id + '/users/' + user_id).remove((error) => {
                throw new Error(error);
            })
        }
    }, error => {
        throw new Error (error);
    })
}
