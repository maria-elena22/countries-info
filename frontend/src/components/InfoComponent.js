import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function InfoComponent(props){
    

    return (
        
        <div className='card-info '> {props.info} </div>
    )
}

export default InfoComponent