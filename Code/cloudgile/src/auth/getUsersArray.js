import firebase from 'firebase/app';

export const getUsersArray = async () => {
    let users = [];
    await firebase.database().ref('users/').once('value', snapshot => {
        const data = snapshot.val()
        users = data;
    }, error => {
        throw new Error(error.message)
    })
    return users;
}