import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            desc: "Todo Description",
            startTime: "",
            isdone: false,
        },
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleDone: (id) => {},
});

export const useTodo = () => {
    return useContext(TodoContext);
};
