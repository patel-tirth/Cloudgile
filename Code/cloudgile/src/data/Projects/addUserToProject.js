import firebase from 'firebase/app'
import 'firebase/database'

export const addUserToProject = async (project_id, user) => {
    await firebase.database().ref('projects/' + project_id).once('value', snapshot => {
        const numusers = snapshot.child('numUsers').val()
        if (numusers === 0) {
            snapshot.ref.child('users').set([user])
            snapshot.ref.child('numUsers').set(numusers + 1)
        } else {
            let users = snapshot.child('users').val()
            users.push(user)
            snapshot.ref.child('users').set(users)
            snapshot.ref.child('numUsers').set(numusers + 1)
        }
    }, error => {
        throw new Error(error.message)
    })

    await firebase.database().ref('users/' + user).once('value', snapshot => {
        const numProjects = snapshot.child('numProjects').val()
        if (numProjects === 0) {
            snapshot.ref.child('projects').set([project_id])
            snapshot.ref.child('numProjects').set(numProjects + 1)
        } else {
            let projects = snapshot.child('projects').val()
            projects.push(project_id)
            snapshot.ref.child('projects').set(projects)
            snapshot.ref.child('numProjects').set(numProjects + 1)
        }
    }, error => {
        throw new Error(error.message)
    })
}
