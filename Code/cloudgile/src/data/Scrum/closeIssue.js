import firebase from 'firebase/app'
import 'firebase/firestore'
import { getCurrentUser } from '../../auth'
import { removeFromSprint } from './RemoveFromSprint'

export const closeIssue = async (project_id, issue_id, key) => {
    console.log(project_id, issue_id)
    const today = new Date(Date.now())

    await firebase.database().ref('issues/' + project_id + '/' + issue_id).once('value', snapshot => {
        snapshot.ref.child('open').set(false);
        snapshot.ref.child('closedBy').set(getCurrentUser().id)
        snapshot.ref.child('closedOn').set(today.toLocaleDateString())
    })

    removeFromSprint(project_id, issue_id);

    const projectRef = firebase.firestore().collection('projects').doc(project_id);
    await projectRef.update({
        numTimeline: firebase.firestore.FieldValue.increment(1),
        backlog: firebase.firestore.FieldValue.arrayRemove(issue_id),
        timeline: firebase.firestore.FieldValue.arrayUnion(issue_id),
        numBacklog: firebase.firestore.FieldValue.increment(-1)
    })

}