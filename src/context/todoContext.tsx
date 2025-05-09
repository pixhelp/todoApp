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
    filterCrucialOnly: boolean;
    setFilterCrucialOnly: React.Dispatch<React.SetStateAction<boolean>>;
    toogleCrucialOnly: () => void;
    toggleDoneOnly: () => void;
    removeElement: (indexArray: number) => void;
    deletedItems: Todo[];
    setDeletedItems: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filterDoneOnly, setFilterDoneOnly] = useState(false);
    const [filterCrucialOnly, setFilterCrucialOnly] = useState(false);
    const [deletedItems, setDeletedItems] = useState<any | undefined>([]);

    const toggleDoneOnly = () =>(
        setFilterDoneOnly((prev) => {
            if (!prev) setFilterCrucialOnly(false);
            return !prev;
        })
    ) 

    const removeElement = (indexArray: number) => {
        const removeElement = todos.find((el, index) => indexArray == index);
        if (removeElement) {
            const arrayDeleted = [...deletedItems, removeElement];
            console.log(arrayDeleted);
            setDeletedItems(arrayDeleted);
        }

        const filterTodo = todos.filter((_el, index) => indexArray != index);
        setTodos(filterTodo);
    }

    const toogleCrucialOnly = () => {
        setFilterCrucialOnly((prev) => {
            if (!prev) setFilterDoneOnly(false);
            return !prev;
        })
    }

    useEffect(() => {
        const savedTodos = localStorage.getItem("todoList");
        const saveDeletedTodos = localStorage.getItem("deletedItems");

        console.log(saveDeletedTodos);  
        if (saveDeletedTodos) {
            setDeletedItems(JSON.parse(saveDeletedTodos));
        }

        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }


    }, []);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todos));
        localStorage.setItem("deletedItems", JSON.stringify(deletedItems));
    }, [todos, deletedItems]);

    return (
        <TodoContext.Provider value={{ todos, setTodos, filterDoneOnly, filterCrucialOnly, setFilterDoneOnly, setFilterCrucialOnly, toggleDoneOnly, toogleCrucialOnly, removeElement, deletedItems, setDeletedItems }}>
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