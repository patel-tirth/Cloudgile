import firebase from 'firebase/app'
import 'firebase/database'

export const SprintPlan = async (project_id) => {
    let data;
    await firebase.database().ref('/projects/' + project_id + '/sprint/').once('value', snapshot => {
        data = snapshot.val();
    }, error => {
        throw new Error(error)
    })
    return data;
}
