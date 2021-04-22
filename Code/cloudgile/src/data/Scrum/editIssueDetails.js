import firebase from 'firebase/app'
import 'firebase/firestore'

export const editIssueDetails = async (project_id, issue) => {
    await firebase.database().ref('issues/' + project_id + '/' + issue.id).once('value', snapshot => {
        for (let key in issue) {
            snapshot.ref.child(key).set(issue[key])
        }
    }, error => {
        throw new Error(error.message)
    })
}
