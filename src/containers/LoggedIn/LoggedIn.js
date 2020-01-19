import React, { useEffect } from 'react'

import SignOut from '../SignOut/SignOut'
import { useAppState } from '../../appState';

function LoggedIn(params) {
    const [{auth, user}, dispatch] = useAppState()

    useEffect(() => {
        if (!user) {
            // get user

            // dispatch LOAD_USER
        }
    }, [user, auth.id, dispatch])

    return (
        <div>
            <p>Logged In</p>
            <SignOut />
        </div>
    )
}

export default LoggedIn