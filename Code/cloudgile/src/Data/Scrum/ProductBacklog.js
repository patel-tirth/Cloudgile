import firebase from 'firebase/app'
import 'firebase/database'

export const ProductBacklog = async (project_id) => {
    let data;
    await firebase.database().ref('projects/' + project_id + '/backlog/').once('value', snapshot => {
        data = snapshot.val();
    }, (error) => {
        throw new Error(error)
    })
    return data;
}
