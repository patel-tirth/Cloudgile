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
        snapshot.forEach(async (doc) => {
            if (project_ids.includes(doc.id)) {
                const data = doc.data()
                await firebase.database().ref('issues/' + doc.id).once('value', snapshot=> {
                    const issueData = snapshot.val();
                    data['issues'] = issueData;
                })
                project_array.push(data);
            }
        }) 
    })

    return project_array;
}
