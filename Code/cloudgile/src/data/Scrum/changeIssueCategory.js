import firebase from 'firebase/app'
import 'firebase/database'

export const changeIssueCategory = async (project_id, issue, issue_id) => {
    await firebase.database().ref('projects/' + project_id).once('value', snapshot => {
        const numIssues = snapshot.child('numIssues').val()
        snapshot.ref.child('issues/' + issue_id).set(issue)
        snapshot.ref.child('numIssues').set(numIssues + 1)

        const numBacklog = snapshot.child('numBacklog').val()
        if (numBacklog === 0) {
            snapshot.ref.child('backlog').set([issue_id])
            snapshot.ref.child('numBacklog').set(numBacklog + 1)
        } else {
            let backlogs = snapshot.child('backlog').val()
            backlogs.push(issue_id)
            snapshot.ref.child('backlog').set(backlogs)
            snapshot.ref.child('numBacklog').set(numBacklog + 1)
        }
    }, (error) => {
        throw new Error(error)
    });
}
