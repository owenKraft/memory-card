import React, { useEffect, useState }  from 'react';

const Card = (props) => {
    let prevClickText;
    if(props.prevClick === false){
        prevClickText = "false";
    } else if(props.prevClick === true){
        prevClickText = "true";
    }

    return (
        <div className="card" id={props.randomID} name={props.nickname}>
            <img className="team-logo" src={props.src} alt=""></img>
            <div className="school">
                {props.school}
            </div>
            <div className="nickname">
                {props.nickname}
            </div>
            {/* <div>{prevClickText}</div> */}
        </div>
    )
}

export default Card;