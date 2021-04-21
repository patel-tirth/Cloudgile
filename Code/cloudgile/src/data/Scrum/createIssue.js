import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'

export const createIssue = async (project_id, issue, issue_id) => {
    await firebase.database().ref('issues/' + project_id + '/' + issue_id).set(issue);

    const projectRef = firebase.firestore().collection('projects').doc(project_id);
    // await projectRef.collection('issues').doc(issue_id).set(issue);
    await projectRef.update({
        numBacklog: firebase.firestore.FieldValue.increment(1),
        numIssues: firebase.firestore.FieldValue.increment(1),
        backlog: firebase.firestore.FieldValue.arrayUnion(issue_id)
    })
}
