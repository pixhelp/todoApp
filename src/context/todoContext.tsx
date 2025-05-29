import * as React from "react";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Todo {
    text: string;
    title: string;
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
    historyItems: Todo[];
    setDeletedItems: React.Dispatch<React.SetStateAction<Todo[]>>;
    relativeDate: any | undefined;
    doneTask: () => Array<Todo>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filterDoneOnly, setFilterDoneOnly] = useState(false);
    const [filterCrucialOnly, setFilterCrucialOnly] = useState(false);
    const [deletedItems, setDeletedItems] = useState<any | undefined>([]);
    const [historyItems, setHistoryItems] = useState<any | undefined>([]);

    const toggleDoneOnly = () =>(
        setFilterDoneOnly((prev) => {
            if (!prev) setFilterCrucialOnly(false);
            return !prev;
        })
    ) 

    const removeElement = (indexArray: number) => {
        const removeElement = todos.find((el, index) => indexArray == index);;
        if (removeElement) {
            const arrayDeleted = [...deletedItems, removeElement];
            setDeletedItems(arrayDeleted);
            const historyTodos = [...historyItems, removeElement];
            setHistoryItems(historyTodos);
        }
        
        const filterTodo = todos.filter((_el, index) => indexArray != index);
        setTodos(filterTodo);
    }

    const doneTask = () => {
        const doneTaskTodo = todos.filter((el) => el.done === true);
        const doneTaskDeleted = deletedItems.filter((el:any) => el.done === true);
        const doneTask = [...doneTaskTodo, ...doneTaskDeleted];

        return doneTask;
    }


    const toogleCrucialOnly = () => {
        setFilterCrucialOnly((prev) => {
            if (!prev) setFilterDoneOnly(false);
            return !prev;
        })
    }

    const relativeDate = (createdDate:number) => {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - createdDate) / 1000);
    
        let value: number;
        let unit: "second" | "minute" | "hour" | "day";
    
        if (diffInSeconds < 60) {
            value = -diffInSeconds;
            unit = "second";
        } else if (diffInSeconds < 3600) {
            value = -Math.floor(diffInSeconds / 60);
            unit = "minute";
        } else if (diffInSeconds < 86400) {
            value = -Math.floor(diffInSeconds / 3600);
            unit = "hour";
        } else {
            value = -Math.floor(diffInSeconds / 86400);
            unit = "day";
        }
    
        const formatter = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });
        return formatter.format(value, unit);
    };

    useEffect(() => {
        const savedTodos = localStorage.getItem("todoList");
        const saveDeletedTodos = localStorage.getItem("deletedItems");
        const saveHistoryTodos = localStorage.getItem("historyItems");

        if (saveDeletedTodos) {
            setDeletedItems(JSON.parse(saveDeletedTodos));
        }

        if (saveHistoryTodos) {
            setHistoryItems(JSON.parse(saveHistoryTodos));
        }

        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }


    }, []);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todos));
        localStorage.setItem("deletedItems", JSON.stringify(deletedItems));
        localStorage.setItem("historyItems", JSON.stringify(historyItems));
    }, [todos, deletedItems]);

    return (
        <TodoContext.Provider value={{ doneTask, todos, setTodos, filterDoneOnly, filterCrucialOnly, setFilterDoneOnly, setFilterCrucialOnly, toggleDoneOnly, toogleCrucialOnly, removeElement, deletedItems, setDeletedItems, relativeDate, historyItems }}>
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