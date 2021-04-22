import firebase from 'firebase/app'
import 'firebase/firestore'

export const removeUserFromProject = async (project_id, user) => {

    const projectsRef = firebase.firestore().collection('projects').doc(project_id);
    const userRef = firebase.firestore().collection('users').doc(user);
    await projectsRef.update({
        users: firebase.firestore.FieldValue.arrayRemove(user),
        numUsers: firebase.firestore.FieldValue.increment(-1)
    }).then(async () => {
        await userRef.update({
            projects: firebase.firestore.FieldValue.arrayRemove(project_id),
            numProjects: firebase.firestore.FieldValue.increment(-1)
        })
    })
}