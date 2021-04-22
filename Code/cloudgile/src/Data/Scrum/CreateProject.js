import firebase from 'firebase/app'
import 'firebase/firestore'; 
import { getCurrentUser } from '../../auth';
import { SendReminders } from '../Reminders/SendReminders';

export const CreateProject = async (project, project_id) => {
    // console.log(project)
    await firebase.firestore().collection('projects').doc(project_id).set(project);
    await SendReminders(`A new project "${project.name}" has been created.`, [getCurrentUser().id, getCurrentUser().id])
}