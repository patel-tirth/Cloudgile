import firebase from 'firebase/app'
import 'firebase/database'

export const updateIssue = async (project_id, issue) => {
    await firebase.database().ref('/projects/' + project_id + '/issues/' + issue.id).set(issue, error => {
        throw new Error(error)
    })
}
