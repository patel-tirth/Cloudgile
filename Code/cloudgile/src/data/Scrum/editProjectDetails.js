import firebase from 'firebase/app'
import 'firebase/firestore'

export const editProjectDetails = async (project_id, project) => {
    // await firebase.database().ref('projects/' + project_id).once('value', snapshot => {
    //     for (let key in project) {
    //         snapshot.ref.child(key).set(project[key])
    //     }
    // }, error => {
    //     throw new Error(error.message)
    // })
    await firebase.firestore().collection('projects').doc(project_id).update({...project})
}
