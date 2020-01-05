import React from 'react';

const Navigation = ({ onroutechange, issignin }) => {
        if(issignin) {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={ () => onroutechange('signout')} 
             className='f4 link dim black underline pa2 pointer'>Sign Out</p>
           </nav>
            );
         } else {
            return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={ () => onroutechange('signin')} 
             className='f5 link dim black underline pa2 pointer'>Sign in</p>
             <p onClick={ () => onroutechange('register')} 
             className='f5 link dim black underline pa2 pointer'>Register</p>
           </nav>
          );
         }
      
}

export default Navigation;