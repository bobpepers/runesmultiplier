import React, { useState } from 'react';
import { useListener } from 'polyrhythm-react';

export const ChatLog = () => {
  const [messages, setMessages] = useState([]);

  useListener(/message\/(from|create)/, (event) => {
    const message = event.payload;
    setMessages((all) => [...all, message]);
  });

  return (
    <div className="chat-log">
      {messages.map((message, i) => <ChatMessage key={i} {...message} />)}
    </div>
  );
};

const ChatMessage = ({ text, userId, myUserId = 'me' }) => {
  const isMine = userId === myUserId;
  const imgSrc = isMine ? 'avatar-b.png' : 'avatar-a.png';

  return (
    <div className={`chat-message ${isMine ? 'chat-message--right' : ''}`}>
      <span className="chat-message__avatar-frame">
        <img
          src={`images/${imgSrc}`}
          alt="avatar"
          className="chat-message__avatar"
        />
      </span>
      <p className="chat-message__text">
        {text}
        {' '}
      </p>
    </div>
  );
};
