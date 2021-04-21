import firebase from 'firebase/app'
import 'firebase/firestore'
import { getCurrentUser } from '../../auth'

export const closeIssue = async (project_id, issue_id, key) => {
    const today = new Date(Date.now())

    await firebase.database().ref('issues/' + project_id + '/' + issue_id).once('value', snapshot => {
        snapshot.ref.child('open').set(false);
        snapshot.ref.child('closedBy').set(getCurrentUser().id)
        snapshot.ref.child('closedOn').set(today.toLocaleDateString())
    })

    const projectRef = firebase.firestore().collection('projects').doc(project_id);
    await projectRef.update({
        numTimeline: firebase.firestore.FieldValue.increment(1),
        backlog: firebase.firestore.FieldValue.arrayRemove(issue_id),
        timeline: firebase.firestore.FieldValue.arrayUnion(issue_id),
        numBacklog: firebase.firestore.FieldValue.increment(-1)
    })
}