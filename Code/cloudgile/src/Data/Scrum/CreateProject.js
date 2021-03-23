import firebase from 'firebase/app'
import 'firebase/database'

export const CreateProject = async (project, project_id) => {
    await firebase.database().ref('projects/' + project_id).set(project, (error) => {
        if (error) throw new Error(error)
    });
}