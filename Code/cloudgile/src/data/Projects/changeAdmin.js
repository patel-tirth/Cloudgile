import firebase from 'firebase/app'
import 'firebase/firestore'

export const changeAdmin = async(project_id, request_id, admin_id) => {
    // try {
    //     const ref = await firebase.database().ref('/projects/' + project_id)
    //     ref.once('value', snapshot => {
    //         if (snapshot.child('/admin/').val() === request_id)   {
    //             ref.child('/admin/').update(admin_id)
    //         }
    //     })
    // } catch (e) {
    //     throw new Error (e.message)
    // }
    
    const projectRef = firebase.firestore().collection('projects').doc(project_id);
    await projectRef.update({admin: admin_id}).catch((error) => console.log('error.message: ', error))
}
