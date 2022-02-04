import React, { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../models/todo-model';
import SingleTodo from './SingleTodo';
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: FC<Props> = ({ todos, setTodos, setCompletedTodos, completedTodos }) => {
  return (
    <div className='container w-full md:w-[95%] flex flex-col md:flex-row justify-between items-start'>
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
            <div
              className={`flex flex-col items-center p-[15px] rounded-[5px] bg-[#32c3cd] w-full md:w-[47.5%] mb-[10px] md:mb-0 ${snapshot.isDraggingOver ? "bg-[#00ddec]" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className='text-white text-[30px] self-start pl-[10px]'>
                Active Tasks
              </span>
              {
                todos.map((todo: Todo, index: number): JSX.Element => {
                  return (
                    <SingleTodo
                      index={index}
                      key={todo.id}
                      todo={todo}
                      todos={todos}
                      setTodos={setTodos}
                    />
                  )
                })
              }
              {provided.placeholder}
            </div>
          )
        }

      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {
          (provided, snapshot) => (
            <div
              className={`flex flex-col items-center p-[15px] rounded-[5px] bg-[#eb6750] w-full md:w-[47.5%] mb-[10px] md:mb-0 ${snapshot.isDraggingOver ? "bg-[#ff2600]" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className='text-white text-[30px] self-start pl-[10px]' >
                Completed Tasks
              </span>
              {
                completedTodos.map((todo: Todo, index: number): JSX.Element => {
                  return (
                    <SingleTodo
                      index={index}
                      key={todo.id}
                      todo={todo}
                      todos={completedTodos}
                      setTodos={setCompletedTodos}
                    />
                  )
                })
              }
              {provided.placeholder}
            </div>

          )
        }

      </Droppable>

    </div>

  );
};

export default TodoList;
