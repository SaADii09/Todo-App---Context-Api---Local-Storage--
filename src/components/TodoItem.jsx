import React, { useState } from "react";
import { useTodo } from "../contexts";

const TodoItem = ({ todo }) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const { deleteTodo, updateTodo, toggleDone } = useTodo();
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const [todoDesc, setTodoDesc] = useState(todo.desc);
    const [todoStartTime, setTodoStartTime] = useState(todo.startTime);

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg, desc: todoDesc });
        setIsTodoEditable(false);
    };

    const handleToggleDone = () => {
        toggleDone(todo.id);
    };

    return (
        <div>
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.isdone}
                onChange={handleToggleDone}
            />
            <input
                type="text"
                style={{
                    textDecoration: todo.isdone ? "line-through" : undefined,
                    color: todo.isdone ? "gray" : undefined,
                    border: isTodoEditable ? "1px solid white" : "none",
                }}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <input
                type="text"
                style={{
                    textDecoration: todo.isdone ? "line-through" : undefined,
                    color: todo.isdone ? "gray" : undefined,
                    border: isTodoEditable ? "1px solid white" : "none",
                }}
                value={todoDesc}
                onChange={(e) => setTodoDesc(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <input
                type="time"
                style={{
                    textDecoration: todo.isdone ? "line-through" : undefined,
                    color: todo.isdone ? "gray" : undefined,
                    border: isTodoEditable ? "1px solid white" : "none",
                }}
                value={todoStartTime}
                onChange={(e) => setTodoStartTime(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <button
                // className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.isdone}
            >
                {isTodoEditable ? "Save" : "Edit"}
            </button>
            {/* Delete Todo Button */}
            <button
                // className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        </div>
    );
};

export default TodoItem;