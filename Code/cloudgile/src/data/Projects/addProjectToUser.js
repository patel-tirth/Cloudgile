import firebase from 'firebase/app'
import 'firebase/firestore'

export const addProjectToUser = async (project_id, user) => {
    const userRef = firebase.firestore().collection('users').doc(user);
    await userRef.update({
        projects: firebase.firestore.FieldValue.arrayUnion(project_id),
        numProjects: firebase.firestore.FieldValue.increment(1)
    })
}
