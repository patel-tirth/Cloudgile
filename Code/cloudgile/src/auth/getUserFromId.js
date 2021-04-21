import firebase from 'firebase/app';

export const getUserForProject = async (user_list) => {
    let users = {};
    await firebase.database().ref('users/').once('value', snapshot => {
        user_list.forEach(id => {
            users[id] = snapshot.child(id).val()
        });
    }, error => {
        throw new Error(error.message)
    })
    // await firebase.firestore().collection('users').get().then(snapshot => {
        
    // });
    // await user_list.forEach(async id => {
    //     await usersRef.doc(id).get().then(doc => {
    //         if (doc.exists) {
    //             const data =  doc.data();
    //             users[id] = data;
    //         }
    //         else return null;
    //     })
    // });
    console.log("project_users: ", users);
    return users;
}