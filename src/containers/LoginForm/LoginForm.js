import React, { useState } from 'react';

import log from '../../services/logger';
import { googleSignIn } from '../../services/auth';

export default function LoginForm() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGoolgeLogin = async event => {
        event.preventDefault()
        log.debug('Auth.js - handleGoogleLogin')
        setLoading(true)
        try {
            await googleSignIn();
            // do not set state because component 
            // unmounts and there will be an error.
            // setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
            log.error('Auth.js - handleGoogleLogin error:', error)
        }
    };

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

        </div>
    );
};