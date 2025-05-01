import { useState, useEffect,useRef } from "react";
import TodoColumn from "./TodoColumn/TodoColumn";
import TodoItem from "./TodoItem/TodoItem";
import TodoInput from "./TodoInput/TodoInput"


const TodoList: React.FC = () => {
    let hasMounted = useRef(false);
    const [elements, setElements] = useState<{ text: string; done: boolean, createdDate: number }[]>([]);
    const [newElements, setNewElements] =  useState('');

    useEffect(() => {
        const valueStorage = localStorage.getItem('todoList');
        
        if (valueStorage != null && hasMounted.current === false ) {
            const oldTodoList: { text: string; done: boolean, createdDate:number }[] = JSON.parse(valueStorage);
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
                createdDate: Date.now(),
            }

            setElements([...elements, todoElement]);
            setNewElements('');
        }
    }

    function removeElement(indexArray: number) {
       const filterTodo = elements.filter((_el, index) => indexArray != index);
       setElements(filterTodo);
    }
    
    function removeAllElement() {
       const filterAllElements = [...elements.filter((el) => el.done === false)]
       setElements(filterAllElements);
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

    const sortElements = [...elements.sort((a, b) => Number(a.done) - Number(b.done)) ];
    const myListElements = sortElements.map((el, index) => {
        return (
            <TodoItem
                key={index}
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
                    listShowElements={myListElements}
                />
                <TodoInput
                    addItemElement={addElement}
                    addNewElement={newElements}
                    creatNewElement={setNewElements}
                    addNewItemsElement={addElement}
                    removeElements={removeAllElement}
                />
            </div>
        </div>
    )
}

export default TodoList;