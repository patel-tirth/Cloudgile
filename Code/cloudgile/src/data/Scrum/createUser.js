// import firebase from 'firebase/app'
// import 'firebase/database'

// export const createUser = async (project_id, user) => {
//     try {
//         await firebase.database().ref('projects/' + project_id + '/users/').push(user)
//         await firebase.database().ref('users/' + user + '/projects/').push(project_id)
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }
