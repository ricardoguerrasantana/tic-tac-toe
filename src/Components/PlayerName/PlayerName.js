import React from 'react';

export const PlayerName = (props) => {
    return(
        <div className="player-name">
            <p 
                className="name-input"
            >Player {props.playerMark}'s Name: </p>
            <input 
                className="name-input"
                onChange={(e) => 
                    props.changePlayerName(e, 
                    props.playerMark)}
            ></input>
        </div>
    );
}