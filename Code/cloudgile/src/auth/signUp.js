import firebase from 'firebase/app';

export const signUp = async (email, password, displayName) => {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            user.updateProfile({
                displayName: displayName

            }).then(() => {

            }, error => {
                throw new Error('Error Creating New Account');
            })
        })
        return {};
    } catch (e) {
        throw new Error(e.message);
    }
}
