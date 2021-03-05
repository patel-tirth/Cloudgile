import firebase from 'firebase/app'
import 'firebase/database'

export const addUserToProject = async (user_id, project_id, project_details) => {
    try {
        await firebase.database().ref('projects/' + project_id).set(project_details)
        await firebase.database.ref('users/' + user_id + '/projects/').push(project_id)
    } catch (error) {
        throw new Error(error.message);
    }
}
