import React, { FC, FormEvent, useState } from 'react';
import './Form.scss';

interface IProps {
  onSend: (text: string) => void | any;
}

export const Form: FC<IProps> = ({ onSend }) => {
  const [value, setValue] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim()) {
      onSend(value);
		}
		
		setValue('');
  };

  return (
    <form action="#" className="sc__form" onSubmit={onSubmit}>
      <input
        type="text"
        className="sc__input"
        autoComplete="off"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button className="sc__button" type="submit">
        send
      </button>
    </form>
  );
};
