import firebase from 'firebase/app';

export const signUp = async (email, password) => {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return {};
    } catch (e) {
        throw new Error('Error Creating New Account');
    }
}
