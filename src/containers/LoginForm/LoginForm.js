import React, { useState } from 'react'

import log from '../../services/logger'
import { googleSignIn, guestSignIn, guestSignUp } from '../../services/auth/auth'

export default function LoginForm() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleGoolgeLogin = async event => {
        event.preventDefault()
        log.debug('LoginForm.js - handleGoogleLogin')
        setLoading(true)
        try {
            await googleSignIn();
            // do not set state because component 
            // unmounts and there will be an error.
            // setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
            log.error('LoginForm.js - handleGoogleLogin error:', error)
        }
    }

    const handleGuestSignIn = async event => {
        event.preventDefault()
        log.debug('LoginForm.js - handleGuestSignIn')
        setLoading(true)
        try {
            await guestSignIn()
        } catch(error) {
            setLoading(false)
            setError(error)
            log.error('LoginForm.js - handleGuestSignIn error:', error)
        }
    }

    const handleGuestSignUp = async event => {
        event.preventDefault()
        log.debug('LoginForm.js - handleGuestSignUp')
        setLoading(true)
        try {
            const guest = {
                email: 'guest@leansheets.com',
                password: '',
                displayName: 'Guest',
                photoURL: '',
                joined: new Date()
            }
            await guestSignUp(guest)
        } catch(error) {
            setLoading(false)
            setError(error)
            log.error('LoginForm.js - handleGuestSignUp error:', error)
        }
    }

    return ( 
        <div>
            { error && (
                <div>
                    <p>Oops, there was an error logging you in.</p>
                    <p>
                        <i>{error.message}</i>
                    </p>
                </div>
            )}

            <button onClick={handleGoolgeLogin}>{ loading ? "Loading..." : "Google Sign In" }</button>
            <br/>
            <button onClick={handleGuestSignIn}>{ loading ? "Loading..." : "Guest Sign In" }</button>
            <br/>
            <button onClick={handleGuestSignUp}>{ loading ? "Loading..." : "Guest Sign Up" }</button>

        </div>
    );
};