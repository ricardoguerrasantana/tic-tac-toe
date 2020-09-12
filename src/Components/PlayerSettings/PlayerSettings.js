import React from 'react';

export const PlayerSettings = (props) => {
    return(
        <div className="player-settings">
            <p 
                className="player-name-input-title"
            >Player {props.playerMark}'s Name:</p>
            <input 
                className={`player-name-input player${props.playerMark}-color`} 
                onChange={(e) => 
                    props.changePlayerName(e, 
                    props.playerMark)}
            ></input>
            <button 
                className={`player-color-button player${props.playerMark}-background-color white-color`}
                onClick={(playerMark) => 
                    props.changeColor(props.playerMark)}
            >Pick Color</button>
        </div>
    );
}