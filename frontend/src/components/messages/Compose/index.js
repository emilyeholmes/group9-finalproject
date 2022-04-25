import React from 'react';
import './Compose.css';

export default function Compose(props) {
    return (
      <div className="compose">
        <input
          outline='none'
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />

        {
          props.rightItems
        }
      </div>
    );
}