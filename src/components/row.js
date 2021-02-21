import React  from 'react'
import Col from './col'
import './row.css'

function Row({row,onClick,rowIndex}) {
    const handleClick = (col) =>{
        onClick({rowIndex,col})
    }

    return (
        <div className="row">
            {row.map(col=><Col
                className='row'
                col={col} onClick={handleClick}/>)}
        </div>
    );
}

export default Row;

