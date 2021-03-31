import firebase from 'firebase/app'
import 'firebase/database'
import { getCurrentUser } from '../../auth'

export const repoenIssue = async (project_id, issue_id, key) => {
    await firebase.database().ref('projects/' + project_id).once('value', snapshot => {
        const numTimeline = snapshot.child('numTimeline').val()
        if (numTimeline === 1) {
            snapshot.ref.child('timeline').set([])
            snapshot.ref.child('numTimeline').set(0)
        } else if (numTimeline > 1) {
            const timeline = snapshot.child('timeline').val()
            timeline.splice(key, 1)
            snapshot.ref.child('timeline').set(timeline)
            snapshot.ref.child('numTimeline').set(numTimeline - 1)
        }

        const numBacklog = snapshot.child('numBacklog').val()
        if (numBacklog === 0) {
            snapshot.ref.child('backlog').set([issue_id])
            snapshot.ref.child('numBacklog').set(numBacklog + 1)
        } else {
            const backlog = snapshot.child('backlog').val()
            backlog.push(issue_id)
            snapshot.ref.child('backlog').set(backlog)
            snapshot.ref.child('numBacklog').set(numBacklog + 1)
        }
        
        snapshot.ref.child('issues/' + issue_id + '/open').set(true);
        snapshot.ref.child('issues/' + issue_id + '/reOpenedBy').set(getCurrentUser().id)
    }, error => {
        throw new Error(error.message)
    })
}