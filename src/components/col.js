import React from 'react'
import './col.css'

function Col({col,onClick}) {
    const handleClick = () =>{
        onClick(col)
    }

    return (
        <div className="App">
            <button onClick={handleClick}>{typeof col === 'number'? '' : col}</button>
        </div>
    );
}

export default Col;
