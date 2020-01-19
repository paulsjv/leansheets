import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import Avatar from '../../Avatar/Avatar'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <div><Logo /></div>
        <nav>
            <ul>
                <li><Avatar /></li>
            </ul>
        </nav>
    </header>
)

export default toolbar