import React, { FC, useRef } from 'react';
import '../styles/InputField.css'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='input'
      onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur();
    }}>
      <input
        ref={inputRef}
        type="input"
        value={todo}
        placeholder='Enter a task'
        className='input__box'
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className='input__submit' type='submit'>Go</button>
    </form >
  );
};

export default InputField;
