import React, { useEffect, useState }  from 'react';
import Emoji from 'a11y-react-emoji'

const Description = () => {

    return (
        <div>
            <h2>
                How to play <Emoji symbol="🤔" label="thinking-face" />
            </h2>
            <p>
                This game is a test of your memory. To win, click on a unique card each turn. If you click on a card you already clicked on, you lose!
            </p>
            <p>
                After each click, the order of the cards will automatically randomize.
            </p>
        </div>
    )
}

export default Description;