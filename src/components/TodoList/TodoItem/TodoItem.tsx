import { Trash2, Clock, ClockAlert } from 'lucide-react';

interface TodoItemsProps {
    index:number;
    showElement: {
        text: string,
        done: boolean,
        crucial: boolean,
        createdDate: number,
    }
    check:(event: React.ChangeEvent<HTMLInputElement>) => void;
    remove:(index: number) => void;
    totalElements: number;
    changeCrucialElements: (indexElement: number) => void;
}

const TodoItem = ({index, showElement, check, remove, totalElements, changeCrucialElements}: TodoItemsProps) => {
    const createdDate = showElement.createdDate; 
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
    const relativeDate = formatter.format(value, unit); 

    return (
        <div className={index !== totalElements - 1 ? 'border-b border-green-dark mb-2 w-full' : ''}>
            <div key={index} className="px-2 text-white relative list-disc text-xl sm:text-md flex flex-row justify-between items-center">
                <div className='relative'>
                    <input checked={showElement.done} value={index} onChange={check} type="checkbox" 
                    className="
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
                    <span className={showElement.done ? "text-green-dark transition-colors text-sm" : "transition-colors text-sm" }>
                        {showElement.text}
                    </span>
                </div>

                <div className='flex flex-row items-center absolute right-0 top-2'>
                    <div className='relative'>
                        <input checked={showElement.crucial} value={index} onChange={() => changeCrucialElements(index)} className='hidden' type="checkbox" />
                        <span onClick={() => {changeCrucialElements(index)}} className={`cursor-pointer ${showElement.crucial ? 'text-red-800' : 'text-white'}`}>
                            <ClockAlert />
                        </span>
                    </div>
                    <button className="ml-2 sm:ml-1 cursor-pointer" onClick={() => {remove(index)}}>
                        <Trash2 className="sm:border-0 rounded-full p-0.5 text-white transition-all hover:text-green-dark" size={22} />
                    </button>
                </div>
            </div>
            <span className='py-2 pl-2 text-2xs font-monserrat_medium flex flex-row items-center'><Clock className='mr-1' size={10} /> Créé {relativeDate}</span>
        </div>
    )
}

export default TodoItem;