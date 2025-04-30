import { useState, useEffect,useRef } from "react";
import TodoColumn from "./TodoColumn/TodoColumn";
import TodoItem from "./TodoItem/TodoItem";


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
           <TodoItem
           index={index}
           showElement={el}
           check={isChecked}
           remove={() => removeElement(index)}
        />
        )
    });

    return (
        <div className="px-4 sm:px-20 py-5 flex flex-col items-center w-full">
            <div className="flex flex-col items-center w-full xl:w-auto">
               <TodoColumn
                listShowElements={myListElements.slice(0,10)}
               />
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