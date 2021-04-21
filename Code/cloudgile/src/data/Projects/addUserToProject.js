import firebase from 'firebase/app'
import 'firebase/firestore'


export const addUserToProject = async (project_id, user) => {
    const projectsRef = firebase.firestore().collection('projects').doc(project_id);
    await projectsRef.update({
        users: firebase.firestore.FieldValue.arrayUnion(user),
        numUsers: firebase.firestore.FieldValue.increment(1)
    });
}