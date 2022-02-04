import React, { FC, useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] relative items-center mb-[20px]"
      onSubmit={e => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        value={todo}
        placeholder="Enter a task"
        className="w-full rounded-[50px] py-[20px] px-[30px] text-[25px] border-none shadow-input focus:shadow-inputHover focus:outline-none"
        onChange={e => setTodo(e.target.value)}
      />
      <button
        className="absolute w-[50px] md:w-[100px] h-[50px] m-[12px] rounded-[50px] right-0 border-none text-[15px] text-white bg-[#2f74c0] shadow-submit transition-transform delay-[0.02s] hover:bg-[#388ae2] active:shadow-submitAc active:scale-[0.8] "
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default InputField;
