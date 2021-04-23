import firebase from 'firebase/app'
import { getCurrentUser } from '../../auth'

export const removeReminders = async (reminder) => {
    await firebase.firestore().collection('users').doc(getCurrentUser().id).update({
        reminders: firebase.firestore.FieldValue.arrayRemove(reminder)
    })
}