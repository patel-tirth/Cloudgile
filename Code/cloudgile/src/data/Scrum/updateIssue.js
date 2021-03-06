import firebase from 'firebase/app'
import 'firebase/firestore'

export const updateIssue = async (project_id, issue) => {
    await firebase.database().ref('issues/' + project_id + '/' + issue.id).set(issue, error => {
        throw new Error(error)
    })
}
