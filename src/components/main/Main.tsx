import { useEffect, useRef, useState } from "react";
import { X, List, CheckCheck } from 'lucide-react';


const Main: React.FC = () => {
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
            <li key={index} className="text-white relative pl-6 list-disc mb-2 sm:mb-1 text-xl sm:text-md flex flex-row items-center">
                <input checked={el.done} value={index} onChange={isChecked} type="checkbox" className="left-0 absolute mt-2" />
                <p className={el.done ? "text-dark-blue" : "" }>
                    {el.text}
                </p>
                <button className="ml-2 sm:ml-1 cursor-pointer" onClick={() => {removeElement(index)}}>
                    <X className="mt-1.5 borde sm:border-0 rounded-full p-0.5 text-black" size={22} />
                </button>
            </li>
        )
    });

    return (
        <div className="px-4 sm:px-20 py-5 flex flex-col items-center w-full">
            <div className="flex flex-col items-center w-full sm:w-auto">
                <div className="text-left font-playwrite shadow-box-light bg-beige-light w-full sm:w-96 h-96 rounded-t-xl p-4">
                    {myListElements}
                </div>
                <div className="w-full flex flex-col sm:flex-row mt-2">
                    <input className="border h-12 sm:h-auto rounded-b-xl w-full p-2" value={newElements} name="addValue" onChange={event => setNewElements(event.target.value)} title="ajouter à la liste" placeholder="Ajouter un éléments"></input>
                    <button className="bg-green-dark text-white px-4 py-2 mt-4 sm:mt-0 h-12 sm:h-auto rounded-xl sm:rounded-b-xl sm:ml-2" onClick={addElement}>Ajouter</button>
                </div>
            </div>

        </div>
    )
}

export default Main;
