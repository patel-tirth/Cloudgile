import firebase from 'firebase/app'
import 'firebase/database'

export const Timeline = async (project_id) => {
    let data;
    // await firebase.database().ref('/projects/' + project_id + '/timeline/').once('value', snapshot => {
    //     data = snapshot.val()
    // }, error => {
    //     throw new Error(error)
    // })
    await firebase.firestore().collection('projects').doc(project_id)
    return data;
}
