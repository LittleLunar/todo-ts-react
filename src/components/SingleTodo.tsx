import React, { FC, useEffect, useRef, useState } from "react";
import { Todo } from "../models/todo-model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}
const SingleTodo: FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const editBox = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo: Todo): Todo => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo: Todo): boolean => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editTodo) {
      setTodos(
        todos.map((todo: Todo): Todo => {
          return todo.id === id ? { ...todo, todo: editTodo } : todo;
        })
      );
      setEdit(false);
    }
  };

  useEffect(() => {
    editBox.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`bg-singleTodo w-full md:w-[95%] flex flex-row rounded-[5px] p-[20px] mt-[15px] transition-all hover:shadow-submitAc hover:scale-[1.03] ${
            snapshot.isDragging ? "shadow-drag" : ""
          }`}
          onSubmit={e => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={editBox}
              type="text"
              value={editTodo}
              onChange={e => setEditTodo(e.target.value)}
              className="flex-1 p-[5px] border-none text-[20px] focus:outline-none"
            />
          ) : todo.isDone ? (
            <s className="flex-1 p-[5px] border-none text-[20px] focus:outline-none">
              {todo.todo}
            </s>
          ) : (
            <span className="flex-1 p-[5px] border-none text-[20px] focus:outline-none">
              {todo.todo}
            </span>
          )}

          <div className="flex items-center gap-[20px]">
            <span
              className=" ml-[10px] text-[25px] cursor-pointer"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="ml-[10px] text-[25px] cursor-pointer"
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </span>
            <span
              className="ml-[10px] text-[25px] cursor-pointer"
              onClick={() => handleDone(todo.id)}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
