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
    filterCrucialOnly:boolean;
    setFilterCrucialOnly: React.Dispatch<React.SetStateAction<boolean>>;
    toogleCrucialOnly: () => void;
    toggleDoneOnly: () => void;

}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filterDoneOnly, setFilterDoneOnly] = useState(false);
    const [filterCrucialOnly, setFilterCrucialOnly] = useState(false);

    const toggleDoneOnly = () =>(
        setFilterDoneOnly((prev) => {
            if (!prev) setFilterCrucialOnly(false);
            return !prev;
        })
    ) 

    const toogleCrucialOnly = () => {
        setFilterCrucialOnly((prev) => {
            if (!prev) setFilterDoneOnly(false);
            return !prev;
        })
    }

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
        <TodoContext.Provider value={{ todos, setTodos, filterDoneOnly, filterCrucialOnly, setFilterDoneOnly, setFilterCrucialOnly, toggleDoneOnly, toogleCrucialOnly }}>
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