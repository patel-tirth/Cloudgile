import firebase from 'firebase/app'
import 'firebase/database'

export const CreateProject = async (project, project_id, users) => {
    await firebase.database().ref('projects/' + project_id).set(project, (error) => {
        if (error) throw new Error(error)
    });
    const ref2 = await firebase.database().ref('users/').then(() => {
        users.forEach(user => {
            ref2.child(user + '/projects/').push(project_id, (error) => {
                if (error) throw new Error(error)
            })
        });
    })
}