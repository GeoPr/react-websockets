import React, { useEffect, useRef, useState } from 'react';
import { Form } from './Form/Form';
import { Messages } from './Messages/Messages';
import './App.scss';

export interface IMessage {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = (text: string) => {
    const message = {
      text,
      id: Date.now(),
    };
    
    ws.current?.send(JSON.stringify(message));
  };

  useEffect(() => {
    const onOpen = () => {
      console.log('Opened !');
    };

    const onClose = () => {
      console.log('Trying to reconnect');
      setTimeout(createWsConnection, 3000);
    };

    const createWsConnection = () => {
      if (ws.current) {
        ws.current.removeEventListener('open', onOpen);
        ws.current.removeEventListener('close', onClose);
        ws.current.close();
      }

      ws.current = new WebSocket('ws://localhost:2121');

      ws.current.addEventListener('open', onOpen);
      ws.current.addEventListener('close', onClose);
    };

    createWsConnection();

    return () => {
      ws.current?.removeEventListener('open', onOpen);
      ws.current?.removeEventListener('close', onClose);
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      try {
        setMessages(prev => [...prev, JSON.parse(e.data)]);
      } catch (e) {
        console.log(e);
      }
    };

    ws.current?.addEventListener('message', onMessage);

    return () => {
      ws.current?.removeEventListener('message', onMessage);
    };
  }, [messages]);

  return (
    <div className="wrapper">
      <main className="page">
        <section className="page__sc sc">
          <div className="sc__container _container">
            <div className="sc__body">
              <Messages messages={messages} />
              <Form onSend={onSend} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
