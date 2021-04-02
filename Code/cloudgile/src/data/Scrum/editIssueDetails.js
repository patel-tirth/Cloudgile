import firebase from 'firebase/app'
import 'firebase/database'

export const editIssueDetails = async (project_id, issue) => {
    await firebase.database().ref('projects/' + project_id + '/issues/' + issue.id).once('value', snapshot => {
        for (let key in issue) {
            snapshot.ref.child(key).set(issue[key])
        }
    }, error => {
        throw new Error(error.message)
    })
}
