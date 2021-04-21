import firebase from 'firebase/app'
import 'firebase/firestore'; 

export const CreateProject = async (project, project_id) => {
    console.log(project)
    await firebase.firestore().collection('projects').doc(project_id).set(project);
}