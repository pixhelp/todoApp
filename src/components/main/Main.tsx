import { useEffect, useRef, useState } from "react";
import { X, List } from 'lucide-react';

const Main: React.FC = () => {
    let hasMounted = useRef(false);
    const [elements, setElements] = useState<string[]>([]);
    const [newElements, setNewElements] =  useState('');

    useEffect(() => {
        const valueStorage = localStorage.getItem('todoList');
        console.log(valueStorage);
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
            <li key={index} className="list-disc flex flex-row items-center">
                {el}
                <button className="ml-2 cursor-pointer" onClick={() => {removeElement(index)}}>
                    <X size={15} />
                </button>
            </li>
        )
    });

    return (
        <div className="px-20 py-5">
            <div className="flex flex-col items-center">
                <h1 className="flex items-center flex-row text-2xl py-2"><List className="mr-2" /> Ma todo list</h1>
                <div className="text-left border border-gray-200 bg-green-200 w-70 rounded-xl p-4">
                    {myListElements}
                </div>
            </div>

            <div>
                <input className="border rounded-sm w-60 p-2 mt-2" value={newElements} name="addValue" onChange={event => setNewElements(event.target.value)} title="ajouter à la liste" placeholder="Ajouter un éléments"></input>
                <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={addElement}>Ajouter</button>
            </div>
        </div>
    )
}

export default Main;
