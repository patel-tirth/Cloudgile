import firebase from 'firebase/app'
import 'firebase/firestore'

export const getProject = async (user_id, project_id) => {

    let project_data = {};
    const projectRef = firebase.firestore().collection('projects').doc(project_id);
    await projectRef.get().then((doc) => {
        if (doc.exists) {
            project_data = doc.data();
        } else {
            // console.log('No such Document');
        }
    }).then(async () => {
        await firebase.database().ref('issues/' + project_id).once('value', snapshot => {
            project_data['issues'] = snapshot.val();
        })
    }).catch((error) => {
        // console.log("Error: ", error)
    })

    // console.log(project_data)
    return project_data;
}
