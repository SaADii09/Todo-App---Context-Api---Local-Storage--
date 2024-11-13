import { useEffect, useState } from "react";
import { TodoContext } from "./contexts";
import { TodoForm } from "./components";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos && storedTodos.length > 0) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos, setTodos]);

    const addTodo = (todo) => {
        setTodos((prev) => [...prev, { ...todo }]);
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const updateTodo = (id, todo) => {
        setTodos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
        );
    };

    const toggleDone = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, isdone: !prevTodo.isdone }
                    : prevTodo
            )
        );
    };

    return (
        <TodoContext.Provider
            value={{ todos, addTodo, deleteTodo, updateTodo, toggleDone }}
        >
            <TodoForm />
        </TodoContext.Provider>
    );
}

export default App;
