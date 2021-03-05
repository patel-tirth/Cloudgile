import React from 'react'
import firebase from 'firebase/app'

export const getReminders = async (user_id) => {
    try {
        let data;
        await firebase.database().ref('/users/' + user_id + '/reminders/').once('value', snapshot => {
            data = snapshot.val();
        })
        return data;
    } catch (e) {
        throw new Error(e.message)
    }
}
