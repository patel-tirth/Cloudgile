import firebase from 'firebase/app'
import 'firebase/database'

export const linkRepo = async (project_id, user_id, url) => {
    try {
        await firebase.database().ref('/projects/' + project_id + '/admin/').once('value', snapshot => {
            if (snapshot.val() !== user_id) {
                throw new Error('You are not allowed')
            }
        }).then(async () => { await firebase.database.ref('/projects/' + project_id + '/url').set(url) })
    } catch (e) {
        throw new Error(e.message)
    }
}