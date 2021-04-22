import firebase from 'firebase/app'

export const getReminders = async (user_id) => {
    let reminders;
    await firebase.firestore().collection('users').doc(user_id).get().then(async (doc) => {
        if (doc.exists) {
            const data = doc.data();
            reminders = data.reminders;
        }
    })
    return reminders;
}
