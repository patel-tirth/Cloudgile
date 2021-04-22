import firebase from 'firebase/app';
import 'firebase/database'

export const getUsersArray = async () => {
    let users = [];
    await firebase.database().ref('users/').once('value', snapshot => {
        const data = snapshot.val()
        users = data;
    }, error => {
        throw new Error(error.message)
    })
    // console.log(users);
    return users;
}