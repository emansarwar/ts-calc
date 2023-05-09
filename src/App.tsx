import React, { useCallback, useReducer, useRef, useState } from "react";
import "./App.css";


interface Todo {
  id: number;
  text: string;
}
// Todo[]
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const [myState, setMyState] = useState<Todo>();

  
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);

  // [{}, {}, {}]

  const newTodoRef = useRef<HTMLInputElement>(null);
  
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    

    <div className="App">
      
      <input type="text"  ref={newTodoRef} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
      {/* <input type="text" ref={newTodoRef} /> */}
      {/* <button className="btn btn-secondary">Button</button> */}
      <button className="btn m-2 btn-outline" onClick={onAddTodo}>Input</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button className="btn m-2 btn-outline" onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            Clear
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;