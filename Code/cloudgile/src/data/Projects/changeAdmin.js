import firebase from 'firebase/app'
import 'firebase/firestore'

export const changeAdmin = async(project_id, request_id, admin_id) => {
    const projectRef = firebase.firestore().collection('projects').doc(project_id);
    await projectRef.update({admin: admin_id}).catch((error) => {throw new Error(error.message)} )
}
