import firebase from 'firebase/app'
import 'firebase/database'
import { getCurrentUser } from '../../auth'

export const closeIssue = async (project_id, issue_id, key) => {
    const today = new Date(Date.now())
    await firebase.database().ref('projects/' + project_id).once('value', snapshot => {
        const numBacklog = snapshot.child('numBacklog').val()
        if (numBacklog === 1)    {
            snapshot.ref.child('backlog').set([])
            snapshot.ref.child('numBacklog').set(0)
        } else if (numBacklog > 1) {
            const backlog = snapshot.child('backlog').val()
            backlog.splice(key, 1)
            snapshot.ref.child('backlog').set(backlog)
            snapshot.ref.child('numBacklog').set(numBacklog - 1)
        }
        
        const numTimeline = snapshot.child('numTimeline').val()
        
        if (numTimeline === 0){
            snapshot.ref.child('timeline').set([issue_id])
            snapshot.ref.child('numTimeline').set(numTimeline + 1)
        }else {
            const timeline = snapshot.child('timeline').val()
            timeline.push(issue_id)
            snapshot.ref.child('timeline').set(timeline)
            snapshot.ref.child('numTimeline').set(numTimeline + 1)
        }

        snapshot.ref.child('issues/' + issue_id + '/open').set(false);
        snapshot.ref.child('issues/' + issue_id + '/closedBy').set(getCurrentUser().id)
        snapshot.ref.child('issues/' + issue_id + '/closedOn').set(today.toLocaleDateString())
    }, error => {
        throw new Error(error.message)
    })
}