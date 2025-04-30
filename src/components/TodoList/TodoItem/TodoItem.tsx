import { X } from 'lucide-react';

interface TodoItemsProps {
    index:number;
    showElement: {
        text: string,
        done: boolean,
    }
    check:(event: React.ChangeEvent<HTMLInputElement>) => void;
    remove:(index: number) => void;
}

const TodoItem = ({index, showElement, check, remove}: TodoItemsProps) => {
    return (
        <li key={index} className="border-b border-green-dark py-2 px-2 pl-6 text-white relative list-disc mb-2 sm:mb-1 text-xl sm:text-md flex flex-row items-center">
            <input
            checked={showElement.done} value={index} onChange={check} type="checkbox" 
            className="
                peer relative appearance-none shrink-0 w-4 h-4 border-dark-blue rounded-sm mt-1 bg-white
                focus:outline-none focus:ring-offset-0 focus-visible:outline-none focus:ring-1 focus:ring-blue-100
                checked:bg-dark-blue mr-2
                disabled:border-steel-400 disabled:bg-steel-400
            "
            />
            <svg
            className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white mt-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        <span className={showElement.done ? "text-dark-blue transition-colors" : "transition-colors" }>
            {showElement.text}

        </span>
        <button className="ml-2 sm:ml-1 cursor-pointer" onClick={() => {remove(index)}}>
            <X className="mt-1.5 absolute right-2 top-1 borde sm:border-0 rounded-full p-0.5 text-green-dark" size={22} />
        </button>
        </li>
    )
}

export default TodoItem;