import React from 'react';
import './Facerecognition.css';

const Facerecognition = ({ imageurl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt=' ' src={imageurl} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>       
        </div>
    );
}

export default Facerecognition; 