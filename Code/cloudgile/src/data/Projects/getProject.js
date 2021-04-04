import firebase from 'firebase/app'
import 'firebase/database'

export const getProject = async (user_id, project_id) => {
    let access = false;
    let data;
    await firebase.database().ref('/projects/' + project_id + '/users/').once('value', snapshot => {
        if (snapshot.val().includes(user_id)) {
            access = true;
        }
    }).then(async () => {
        if (access) {
            await firebase.database().ref('/projects/' + project_id).once('value', snapshot => {
                data = snapshot.val()
            })
        }
    })
    // console.log(data)
    if (!access) {
        return false
    }
    return data;
}