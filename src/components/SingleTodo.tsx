import React, { FC, useEffect, useRef, useState } from 'react';
import '../styles/SingleTodo.css'
import { Todo } from '../models/todo-model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd';
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
    setTodos(todos.map((todo: Todo): Todo => {
      return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    }))
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo: Todo): boolean => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    if (editTodo) {
      setTodos(todos.map((todo: Todo): Todo => {
        return todo.id === id ? { ...todo, todo: editTodo } : todo
      }))
      setEdit(false)
    }

  }

  useEffect(() => {
    editBox.current?.focus()
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form
            className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {
              edit ? (
                <input
                  ref={editBox}
                  type="text"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className='todos__single--text'
                />
              ) : (todo.isDone ? (
                <s className='todos__single--text'>{todo.todo}</s>
              ) : (
                <span className='todos__single--text'>{todo.todo}</span>
              )
              )

            }

            <div>
              <span className='icon' onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);

                }
              }}><AiFillEdit /></span>
              <span className='icon' onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
              <span className="icon" onClick={() => handleDone(todo.id)}><MdDone /></span>
            </div>
          </form>

        )
      }
    </Draggable>
  );
};

export default SingleTodo;
