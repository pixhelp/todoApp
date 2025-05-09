import { Trash2, Clock, ClockAlert } from 'lucide-react';
import { useTodo } from "../../../context/todoContext";

interface TodoItemsProps {
    index:number;
    showElement: {
        text: string,
        done: boolean,
        crucial: boolean,
        createdDate: number,
    }

    check:(event: React.ChangeEvent<HTMLInputElement>) => void;
    totalElements: number;
    changeCrucialElements: (indexElement: number) => void;
    sortCrucialElementFilter: (event:React.ChangeEvent<HTMLInputElement>) => void;
}


const TodoItem = ({index, showElement, check, totalElements, changeCrucialElements, sortCrucialElementFilter}: TodoItemsProps) => {
    const { relativeDate } = useTodo();
    const { removeElement } = useTodo();

    return (
        <div className={
                "w-full p-2 " +
                (index !== totalElements - 1 ? "border-b border-gray-400 " : "") +
                (showElement.crucial && !showElement.done ? "bg-beige-light " : "") +
                (showElement.done ? "bg-green-light " : "")}>
            <div key={index} className="px-2 text-black relative list-disc text-xl sm:text-md flex flex-row justify-between items-center">
                <div className='relative pr-14'>
                    <input checked={showElement.done} value={index} onChange={check} type="checkbox" 
                    className="border
                        peer cursor-pointer relative appearance-none shrink-0 w-3.5 h-3.5 border-dark-blue rounded-sm mt-1 bg-white
                        focus:outline-none focus:ring-offset-0 focus-visible:outline-none focus:ring-1 focus:ring-blue-100
                        checked:bg-green-dark mr-2
                        disabled:border-steel-400 disabled:bg-steel-400"/>
                    <svg
                    className="absolute top-1.5 left-[1px] w-3 h-3 pointer-events-none hidden peer-checked:block stroke-white mt-1"
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
                    <span className={showElement.done ? "text-green-dark transition-colors text-sm" : "transition-colors text-sm text-gray-800" }>
                        {showElement.text}
                    </span>
                </div>

                <div className='flex flex-row items-center absolute right-0 top-3.5'>
                    <div className='relative group'>
                        <input checked={showElement.crucial} value={index} onChange={(event) => sortCrucialElementFilter(event)} type="checkbox" className="border
                        peer cursor-pointer relative appearance-none z-10  shrink-0 w-5 h-5
                        focus:outline-none focus:ring-offset-0 focus-visible:outline-none
                        border-none"/>
                        <span className={`cursor-pointer absolute left-0 top-1 transition-all text-mytodo-red-800 group-hover:text-red-600`}>
                            <ClockAlert size={20} />
                        </span>
                    </div>
                    <button className="ml-2 sm:ml-1 cursor-pointe" onClick={() => {removeElement(index)}}>
                        <Trash2 className="sm:border-0 rounded-full hover:text-green-dark transition-all p-0.5 text-gray-800" size={22} />
                    </button>
                </div>
            </div>
            <span className='py-2 pl-2 text-xs mt-2 text-dark-blue font-monserrat_medium flex flex-row items-center'>
                <Clock className='mr-1' size={15} />
                {showElement.done
                ? showElement.crucial
                    ? 'Tâche urgente terminée'
                    : 'Tâche terminée'
                : `Créé ${relativeDate(showElement.createdDate)}`}
            </span>
        </div>
    )
}

export default TodoItem;