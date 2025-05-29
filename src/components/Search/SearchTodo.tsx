import { useState } from "react";
import { useTodo } from "../../context/todoContext";
import { Search } from "lucide-react";

const SearchTodo = ({searchTodos, setSearch}: {searchTodos: string, setSearch: React.Dispatch<React.SetStateAction<string>>}) => {
    const { todos } = useTodo();

   

    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
                type="text"
                value={searchTodos}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher une tâche"
                className="w-full pl-10 pr-4 py-1 h-12 lg:h-auto border rounded-xl border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
        </div>
    )
}

export default SearchTodo;