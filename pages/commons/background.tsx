import React from 'react'; 
import Cmd from './cmd';

function background() {
    return (
        // <div className='background-illustration'>
        //     <img src={require('../../resources/illus.svg').default} />
        // </div>
        <>
        <div className="">
            <img className='background-windows' src={require('../../resources/background.jpg').default} />
        </div>
        {/* <Cmd /> */}
        </>
    )
}

export default background
