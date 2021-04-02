import firebase from 'firebase/app'
import 'firebase/database'

export const removeUserFromProject = async (project_id, user_id) => {
    await firebase.database().ref('projects/' + project_id).once('value', snapshot => {  
        const numusers = snapshot.child('numUsers').val()
        let userArray = snapshot.child('users').val()
        userArray.splice(userArray.indexOf(user_id), 1)
        snapshot.ref.child('users').set(userArray);
        snapshot.ref.child('numUsers').set(numusers - 1)
    }, error => {
        throw new Error (error);
    })
    await firebase.database().ref('users/' + user_id).once('value', snapshot => {
        const numProjects = snapshot.child('numProjects').val()
        let projectArray = snapshot.child('projects').val()
        if (projectArray.length === 1 && projectArray.includes(project_id)) {
            snapshot.ref.child('projects').set([])
            snapshot.ref.child('numProjects').set(numProjects - 1)
        } else {
            projectArray.splice(projectArray.indexOf(project_id), 1)
            snapshot.ref.child('projects').set(projectArray)
            snapshot.ref.child('numProjects').set(numProjects - 1)
        }
    }, error => {
        throw new Error(error);
    })
}
