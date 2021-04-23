import firebase from 'firebase/app'

export const AddToSprint = async (projectId, issue) => {
    // console.log(projectId, issue);
    await firebase.firestore().collection('projects').doc(projectId).update({
        sprint: firebase.firestore.FieldValue.arrayUnion(issue)
    })
}