import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{ max : 75 }} style={{ height: 150, width: 150 }} >
            <div className='Tilt-inner pa3'>
                <img alt='logo' style={{ paddingTop:'5px' }} src={brain} height='100px' width='100px'></img>
            </div>
</Tilt>
        </div>
    );
}

export default Logo;