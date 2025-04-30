import { useState, useEffect,useRef } from "react";
import { X } from 'lucide-react';


const TodoList: React.FC = () => {
    let hasMounted = useRef(false);
    const [elements, setElements] = useState<{ text: string; done: boolean }[]>([]);
    const [newElements, setNewElements] =  useState('');
    const [isCheckBoxChecked, setisCheckBoxChecked] = useState(Boolean);

    useEffect(() => {
        const valueStorage = localStorage.getItem('todoList');
        
        if (valueStorage != null && hasMounted.current === false ) {
            const oldTodoList: { text: string; done: boolean }[] = JSON.parse(valueStorage);
            hasMounted.current = true;
            setElements(oldTodoList);
        }
        
    }, []);

    useEffect(() => {
        const valueTodoList = JSON.stringify(elements);
        if (hasMounted.current === true) {
            localStorage.setItem('todoList', valueTodoList);
        }
    }, [elements]);

    function addElement() {
        if (newElements.trim() !== '') {
            const todoElement = {
                text: newElements,
                done: false,
            }
            setElements([...elements, todoElement]);
            setNewElements('');
        }
    }

    function removeElement(indexArray: number) {
       const filterTodo = elements.filter((_el, index) => indexArray != index);
        setElements(filterTodo);
    }

    function isChecked(event:any) {
        const arrayCheck = elements.map((checkItem, index) => {
            if (event.target.value == index.toString() && event.target.checked) {
                checkItem.done = true;
            } 
            
            if (event.target.value == index && !event.target.checked) {
                checkItem.done = false;
            }
            
            return checkItem;
        });
        

        setElements(arrayCheck);
    }

    const myListElements = elements.map((el, index) => {
        return (
            <li key={index} className="border-b border-green-dark py-2 px-2 pl-6 text-white relative list-disc mb-2 sm:mb-1 text-xl sm:text-md flex flex-row items-center">
                 <input
                    checked={el.done} value={index} onChange={isChecked} type="checkbox" 
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
                <span className={el.done ? "text-dark-blue transition-colors" : "transition-colors" }>
                    {el.text}

                </span>
                <button className="ml-2 sm:ml-1 cursor-pointer" onClick={() => {removeElement(index)}}>
                    <X className="mt-1.5 absolute right-2 top-1 borde sm:border-0 rounded-full p-0.5 text-green-dark" size={22} />
                </button>
            </li>
        )
    });

    return (
        <div className="px-4 sm:px-20 py-5 flex flex-col items-center w-full">
            <div className="flex flex-col items-center w-full xl:w-auto">
               <div className="flex flex-col xl:flex-row w-full xl:w-auto">
                    <div className="px-2 text-left font-playwrite shadow-box-light bg-beige-light w-full xl:w-96 m-h-96 pb-6 rounded-t-xl">
                        {myListElements.length === 0 && (
                            <p className="text-center mt-5 text-white">Commencez votre liste</p>
                        )}
                        {myListElements.slice(0,10)}
                    </div>
                    {myListElements.length > 10 && (
                        <div className="px-2 text-left mt-6 xl:mt-0 xl:ml-2 font-playwrite shadow-box-light bg-beige-light w-full xl:w-96 m-h-96 pb-6 rounded-t-xl">
                            {myListElements.slice(10)}
                        </div>
                    )}
                    {myListElements.length > 20 && (
                        <div className="px-2 text-left mt-6 xl:mt-0 font-playwrite shadow-box-light xl:ml-2 bg-beige-light w-full xl:w-96 m-h-96 pb-6 rounded-t-xl">
                            {myListElements.slice(20)}
                        </div>
                    )}
               </div>
                <div className="w-full xl:mt-4 sticky top-0 xl:relative bottom-4 sm:p-0 flex flex-col sm:flex-row">
                    <input  
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); 
                                addElement();
                            }
                        }} className="border h-12 sm:h-auto rounded-b-xl w-full p-2" value={newElements} name="addValue" onChange={event => setNewElements(event.target.value)} title="ajouter à la liste" placeholder="Ajouter un éléments"></input>
                    <button className="bg-green-dark text-white px-4 py-2 mt-4 sm:mt-0 h-12 sm:h-auto rounded-t-xl rounded-b-xl sm:rounded-t-none sm:rounded-b-xl sm:ml-2" onClick={addElement}>Ajouter</button>
                </div>
            </div>

        </div>
    )
}

export default TodoList;