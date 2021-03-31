import firebase from 'firebase/app';

export const getUserForProject = async () => {
    let users = [];
    await firebase.database().ref('users/').once('value', snapshot => {
        const data = snapshot.val()
        console.log(data)
    }, error => {
        throw new Error(error.message)
    })
    return users;
}