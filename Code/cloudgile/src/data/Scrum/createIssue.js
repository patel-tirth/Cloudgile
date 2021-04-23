import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import {SendReminders} from '../Reminders/SendReminders'

export const createIssue = async (project_id, issue, issue_id) => {
    let data
    await firebase.database().ref('issues/' + project_id + '/' + issue_id).set(issue);

    const projectRef = firebase.firestore().collection('projects').doc(project_id);

    await projectRef.update({
        numBacklog: firebase.firestore.FieldValue.increment(1),
        numIssues: firebase.firestore.FieldValue.increment(1),
        backlog: firebase.firestore.FieldValue.arrayUnion(issue_id)
    })

    await projectRef.get().then((doc) => { data = doc.data() })
    await SendReminders(`Issue "${issue.title}" have been assigned to you from project "${data.name}"`, [issue.assignedTo])
}
