import firebase from 'firebase/app'
import 'firebase/firestore'
import { getCurrentUser } from '../../auth'

export const repoenIssue = async (project_id, issue_id, key) => {
    const projectRef = firebase.firestore().collection('projects').doc(project_id);
    
    await projectRef.update({
        numBacklog: firebase.firestore.FieldValue.increment(1),
        numTimeline: firebase.firestore.FieldValue.increment(-1),
        backlog: firebase.firestore.FieldValue.arrayUnion(issue_id),
        timeline: firebase.firestore.FieldValue.arrayRemove(issue_id)
    }).then(async () => {
        await firebase.database().ref('issues/' + project_id + '/' + issue_id).once('value', snapshot => {        
        snapshot.ref.child('open').set(true);
        snapshot.ref.child('reOpenedBy').set(getCurrentUser().id)
    }).then(() => {
        return true;
    })
    }).catch(error => {
        throw new Error(error.message)
    })
    return false;
}