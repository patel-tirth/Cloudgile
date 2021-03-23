import firebase from 'firebase/app'
import 'firebase/database'

export const getAllProjects = async(user_id) => {
    try {
        let project_ids = [];
        let project_array = [];
        await firebase.database().ref('users/' + user_id + '/projects/').once('value', snapshot => {
            if (snapshot.exists())  {
                project_ids = snapshot.val();
            }
        }).then(async () => {
            await firebase.database().ref('projects/').once('value', snapshot => {
                project_ids.forEach(id => {
                    let data = snapshot.child(id).val()
                    project_array.push(data)
                })
            })
        })
        return project_array 
    } catch (e) {
        throw new Error(e.message);
    }
}
