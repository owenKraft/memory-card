import React, { useEffect, useState }  from 'react';
import Emoji from 'a11y-react-emoji'

const Scoreboard = (props) => {

    return (
        <div>
            <h2>
                Current score: <span id="current-score">{props.currentScore}</span>, High score: <span id="high-score">{props.highScore}</span>
            </h2>
            <div id="game-text">
                {props.gameStateText}
            </div>

        </div>
    )
}

export default Scoreboard;