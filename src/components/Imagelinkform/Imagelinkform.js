import React from 'react';
import './Imagelinkform.css';

const Imagelinkform = ({ oninputchange, onpicturesubmit }) => {
    return (
        <div>
            <p className='f4'>
                {'this magic brain will detect faces in your pictures. give it a try'}
            </p>
            <div className='center'> 
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text'  onChange={oninputchange }/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onpicturesubmit}>detect</button>
                </div>
            </div>
        </div>
    );
}

export default Imagelinkform;