import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

export const SendReminders = async (reminder, users) => {
    try {
        await firebase.database().ref('/users/').once('value', snapshot => {
            users.array.forEach(user => {
                snapshot.child(user + '/reminders/').push(reminder)
            });
        })
    } catch (e) {
        throw new Error (e.message);
    }
}
