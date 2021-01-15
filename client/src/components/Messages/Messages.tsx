import React, { FC, useEffect, useRef } from 'react';
import { IMessage } from '../App';
import './Messages.scss';

interface IProps {
  messages: IMessage[];
}

export const Messages: FC<IProps> = ({ messages }) => {
  const messagesEl = useRef<HTMLUListElement>(null);

  useEffect(() => {
    messagesEl.current!.scrollTop = messagesEl.current!.scrollHeight;
  }, [messages]);

  return (
    <ul className="sc__messages" ref={messagesEl}>
      {messages.map(({ text, id }) => (
        <li key={id} className="sc__message">
          {text}
        </li>
      ))}
    </ul>
  );
};
