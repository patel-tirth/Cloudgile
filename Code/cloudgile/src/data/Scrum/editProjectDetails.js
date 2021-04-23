import firebase from 'firebase/app'
import 'firebase/firestore'

export const editProjectDetails = async (project_id, project) => {
    
    await firebase.firestore().collection('projects').doc(project_id).update({...project})
}
