import firebase from 'firebase/app'
import 'firebase/firestore'

export const removeUserFromProject = async (project_id, user) => {
    // await firebase.database().ref('projects/' + project_id).once('value', snapshot => {  
    //     const numusers = snapshot.child('numUsers').val()
    //     let userArray = snapshot.child('users').val()
    //     userArray.splice(userArray.indexOf(user_id), 1)
    //     snapshot.ref.child('users').set(userArray);
    //     snapshot.ref.child('numUsers').set(numusers - 1)
    // }, error => {
    //     throw new Error (error);
    // })
    // await firebase.database().ref('users/' + user_id).once('value', snapshot => {
    //     const numProjects = snapshot.child('numProjects').val()
    //     let projectArray = snapshot.child('projects').val()
    //     if (projectArray.length === 1 && projectArray.includes(project_id)) {
    //         snapshot.ref.child('projects').set([])
    //         snapshot.ref.child('numProjects').set(numProjects - 1)
    //     } else {
    //         projectArray.splice(projectArray.indexOf(project_id), 1)
    //         snapshot.ref.child('projects').set(projectArray)
    //         snapshot.ref.child('numProjects').set(numProjects - 1)
    //     }
    // }, error => {
    //     throw new Error(error);
    // })

    const projectsRef = firebase.firestore().collection('projects').doc(project_id);
    const userRef = firebase.firestore().collection('users').doc(user);
    await projectsRef.update({
        users: firebase.firestore.FieldValue.arrayRemove(user),
        numUsers: firebase.firestore.FieldValue.increment(-1)
    }).then(async () => {
        await userRef.update({
            projects: firebase.firestore.FieldValue.arrayRemove(project_id),
            numProjects: firebase.firestore.FieldValue.increment(-1)
        })
    })
}