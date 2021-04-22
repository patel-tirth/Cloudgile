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

    // console.log("project_users: ", users);
    return users;
}