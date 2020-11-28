import React, { useEffect, useState }  from 'react';
import Card from './card';
import Scoreboard from './Scoreboard';
import Shuffle from './Shuffle';
import Teams from './Teams';
import Emoji from 'a11y-react-emoji'

const CardArea = () => {
    const numOfCards = 12;
    const [maxArray, setMaxArray] = useState(Shuffle(arrayGenerator(numOfCards)));
    const [teamsLocal, setTeamsLocal] = useState(Teams);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameStateText, setGameStateText] = useState("You got this!");
    const [gameOver, setGameOver] = useState(false);

    function arrayGenerator(arrayLength){
        return [...Array(arrayLength).keys()]
    }; 

    const clickActions = (e) => {
        const copyOfTeamsLocal = [...teamsLocal];
        const cardNodeID = e.target.closest(".card").id;
        const localGameOver = copyOfTeamsLocal[cardNodeID].prevClick;

        if(localGameOver === true){
            setGameOver(true);
        }

        checkPrevClick(copyOfTeamsLocal, localGameOver);
        updateTeamArray(cardNodeID, copyOfTeamsLocal,localGameOver);
        setMaxArray(Shuffle([...maxArray]))
    }

    const updateTeamArray = (cardNodeID, copyOfTeamsLocal,localGameOver) => {
        if(localGameOver === false){
            copyOfTeamsLocal[cardNodeID].prevClick = true;
            setTeamsLocal(copyOfTeamsLocal);
        }
    }

    const checkPrevClick = (copyOfTeamsLocal, localGameOver) => {
        const updatedScore = currentScore + 1;

        if(updatedScore !== numOfCards && localGameOver !== true){
            setGameOver(false);
            setGameStateText("You got this!");
            document.querySelector("#game-text").classList.remove("red-text");
            document.querySelector("#game-text").classList.remove("green-text")
            setCurrentScore(updatedScore);
        } else if(updatedScore === numOfCards || localGameOver === true){
            if(updatedScore === numOfCards){
                setHighScore(updatedScore)
            } else if(currentScore > highScore){
                setHighScore(currentScore)
            }

            restartGame(copyOfTeamsLocal);

            if(localGameOver === true){
                setGameStateText("Oh no! Try again.");
                document.querySelector("#game-text").classList.add("red-text");
            } else {
                setGameStateText("Congrats! You won.");
                document.querySelector("#game-text").classList.add("green-text");
            }
        }
    }

    const restartGame = (copyOfTeamsLocal) => {
        setCurrentScore(0);

        copyOfTeamsLocal.forEach(team => 
            {
                team.prevClick = false;
            }
        );
        setTeamsLocal(copyOfTeamsLocal);
    }

    useEffect(() => {
        document.querySelectorAll('.card').forEach(item => 
            {
                item.addEventListener('click', clickActions);
            }
        )

        return () => {
            document.querySelectorAll('.card').forEach(item => 
                {
                    item.removeEventListener('click', clickActions);
                }
            )
        };
    });

    return (
        <div>
            <Scoreboard
                teamsLocal={teamsLocal}
                currentScore={currentScore}
                highScore={highScore}
                gameStateText={gameStateText}
            />
            <div className="card-area">
                {[...Array(numOfCards)].map((x, i) =>
                    <Card 
                        key={i}
                        randomID={maxArray[i]}
                        school={teamsLocal[maxArray[i]].school}
                        nickname={teamsLocal[maxArray[i]].nickname}
                        src={teamsLocal[maxArray[i]].src}
                        prevClick={teamsLocal[maxArray[i]].prevClick}
                    />
                )}
            </div>
            {/* <div className="spacer-div"></div> */}
        </div>
    )
}

export default CardArea;