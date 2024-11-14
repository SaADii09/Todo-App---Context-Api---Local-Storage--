import { useEffect, useState } from "react";
import { TodoContext } from "./contexts";
import { TodoForm, TodoItem } from "./components";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("All");

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
            <h1>📝Todo List</h1>
            <div className="wrapper">
                <TodoForm />
            </div>
            <div className="filterWrapper">
                <h4>Filters</h4>
                <button
                    style={{
                        backgroundColor: filter === "All" ? "white" : "",
                        color: filter === "All" ? "black" : "",
                    }}
                    onClick={() => setFilter("All")}
                >
                    All
                </button>
                <button
                    style={{
                        backgroundColor: filter === "Done" ? "white" : "",
                        color: filter === "Done" ? "black" : "",
                    }}
                    onClick={() => setFilter("Done")}
                >
                    Done
                </button>
                <button
                    style={{
                        backgroundColor: filter === "NotDone" ? "white" : "",
                        color: filter === "NotDone" ? "black" : "",
                    }}
                    onClick={() => setFilter("NotDone")}
                >
                    Not Done
                </button>
            </div>
            <hr />
            <div className="todoItemHeader">
                <h3>Todo</h3>
                <h3>Description</h3>
                <h3>startTime</h3>
                <h3>Actions</h3>
            </div>
            <hr />
            {todos.length > 0 ? (
                todos
                    .filter((todo) => {
                        if (filter === "All") return true;
                        if (filter === "Done") return todo.isdone;
                        if (filter === "NotDone") return !todo.isdone;
                    })
                    .map((todo) => (
                        <div className="todoItemWrapper" key={todo.id}>
                            <TodoItem todo={todo} />
                        </div>
                    ))
            ) : (
                <p className="text-center text-lg">
                    You don't have any todos yet. Add some!
                </p>
            )}
        </TodoContext.Provider>
    );
}

export default App;
