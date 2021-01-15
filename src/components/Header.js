import React from 'react';

import '../App.css';
import reactLogo from '../assets/react.png';

export default function Header(props) {
    return (
        <>
            <header>
                <div>
                    <img width={100} src={reactLogo} />
                    <h1>{props.title}</h1>
                </div>
            </header>
        </>
    );
}