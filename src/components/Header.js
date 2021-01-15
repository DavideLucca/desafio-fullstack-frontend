import React from 'react';

import '../App.css';
import reactLogo from '../assets/react.png';

export default function Header(props) {
    return (
        <>
            <header>
                <div className="image-div">
                    <img width={100} src={reactLogo} />
                </div>
                <div className="title-div">
                    <h1 id="title-h1">{props.title}</h1>
                </div>
            </header>
        </>
    );
}