import firebase from 'firebase/app'
import 'firebase/firestore'

export const ProductBacklog = async (project_id) => {
    let data = [];
    await firebase.firestore().collection('projects').doc(project_id).get().then((doc) => {
        if (doc.exists) {
            data = doc.data();
        }
        else {
            // console.log("No such data");
        }
    })
    return data;
}
