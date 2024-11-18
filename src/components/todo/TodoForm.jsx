import React, { useState } from "react";
import { useTodo } from "../../contexts";
import { v4 as uuidv4 } from "uuid";

const TodoForm = () => {
    const [todo, setTodo] = useState({ todo: "", desc: "", startTime: "" });
    const { addTodo } = useTodo();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.todo || !todo.desc || !todo.startTime) return;
        addTodo({ ...todo, id: uuidv4(), isdone: false });
        setTodo({ todo: "", desc: "", startTime: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="todo"
                value={todo.todo}
                onChange={(e) => setTodo({ ...todo, todo: e.target.value })}
            />
            <input
                type="text"
                placeholder="description"
                value={todo.desc}
                onChange={(e) => setTodo({ ...todo, desc: e.target.value })}
            />
            <input
                type="time"
                value={todo.startTime}
                onChange={(e) =>
                    setTodo({ ...todo, startTime: e.target.value })
                }
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TodoForm;
