import firebase from 'firebase/app'

export const removeFromSprint = async (projectId, issue) => {
    console.log(projectId, issue)
    await firebase.firestore().collection('projects').doc(projectId).update({
        sprint: firebase.firestore.FieldValue.arrayRemove(issue)
    })
}