import { useEffect, useRef, useState } from "react";
import { X, List } from 'lucide-react';

const Main: React.FC = () => {
    let hasMounted = useRef(false);
    const [elements, setElements] = useState<string[]>([]);
    const [newElements, setNewElements] =  useState('');

    useEffect(() => {
        const valueStorage = localStorage.getItem('todoList');
        
        if (valueStorage != null && hasMounted.current === false ) {
            const oldTodoList: string[] = JSON.parse(valueStorage);
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
            setElements([...elements, newElements ]);
            setNewElements('');
        }
    }

    function removeElement(indexArray: number) {
       const filterTodo = elements.filter((_el, index) => indexArray != index);
        setElements(filterTodo);
    }

    const myListElements = elements.map((el, index) => {
        return (
            <li key={index} className="text-white list-disc text-xl flex flex-row items-center">
                {el}
                <button className="ml-2 cursor-pointer" onClick={() => {removeElement(index)}}>
                    <X size={15} />
                </button>
            </li>
        )
    });

    return (
        <div className="px-4 sm:px-20 py-5 flex flex-col items-center w-full">
            <div className="flex flex-col items-center w-full sm:w-auto">
                <div className="text-left shadow-box-light bg-beige-light w-full sm:w-96 h-96 rounded-t-xl p-4">
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
