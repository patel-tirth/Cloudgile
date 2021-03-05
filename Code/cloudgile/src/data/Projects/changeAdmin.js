import firebase from 'firebase/app'
import 'firebase/database'

export const changeAdmin = async(project_id, request_id, admin_id) => {
    try {
        const ref = await firebase.database().ref('/projects/' + project_id)
        ref.once('value', snapshot => {
            if (snapshot.child('/admin/').val() === request_id)   {
                ref.child('/admin/').update(admin_id)
            }
        })
    } catch (e) {
        throw new Error (e.message)
    }
}
