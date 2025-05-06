import * as React from "react";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Todo {
    text: string;
    done: boolean;
    crucial: boolean;
    createdDate: number;
}

interface TodoContextProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    filterDoneOnly: boolean;
    setFilterDoneOnly: React.Dispatch<React.SetStateAction<boolean>>;
    filerCrucialOnly:boolean;
    setFilerCrucialOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filterDoneOnly, setFilterDoneOnly] = useState(false);
    const [filerCrucialOnly, setFilerCrucialOnly] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("todoList");
        if (saved) {
        setTodos(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoContext.Provider value={{ todos, setTodos, filterDoneOnly, setFilterDoneOnly, filerCrucialOnly, setFilerCrucialOnly }}>
        {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
};