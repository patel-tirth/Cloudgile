import firebase from 'firebase/app'
import 'firebase/firestore'

export const getAllProjects = async(user_id) => {
    let project_array = [];
    let project_ids = [];

    await firebase.firestore().collection('users').doc(user_id).get().then((doc) => {
        if (doc.exists) {
            if (doc.data().numProjects === 0) {}
            else {
                project_ids = doc.data().projects;
                return;
            }
        }
    })
 
    await firebase.firestore().collection('projects').get().then((snapshot) => {
        snapshot.forEach(doc => {
            if (project_ids.includes(doc.id)) {
                const data = doc.data()
                project_array.push(data);
            }
        }) 
    })

    console.log(project_array)
    return project_array;
}
