import firebase from 'firebase/app'
import 'firebase/firestore'

export const SendReminders = async (reminder, users) => {
    await users.forEach(async user => {
        const userRef = firebase.firestore().collection('users').doc(user);
        await userRef.update({
            reminders: firebase.firestore.FieldValue.arrayUnion(reminder)
        })
    });
}
