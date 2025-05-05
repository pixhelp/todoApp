import { useState, useEffect,useRef } from "react";
import TodoColumn from "./TodoColumn/TodoColumn";
import TodoItem from "./TodoItem/TodoItem";
import TodoInput from "./TodoInput/TodoInput"
import { CheckIcon } from "lucide-react";


const TodoList: React.FC = () => {
    let hasMounted = useRef(false);
    const [elements, setElements] = useState<{ text: string; done: boolean, crucial: boolean, createdDate: number }[]>([]);
    const [newElements, setNewElements] =  useState('');

    useEffect(() => {
        const valueStorage = localStorage.getItem('todoList');
        
        if (valueStorage != null && hasMounted.current === false ) {
            const oldTodoList: { text: string; done: boolean, crucial: boolean, createdDate:number }[] = JSON.parse(valueStorage);
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
                crucial: false,
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
    
    function removeAllElements() {
       const filterAllElements = [...elements.filter((el) => el.done === false)]
       setElements(filterAllElements);
    }

    function sortOldElements() {
        const filterOldElements = [...elements.sort((taskA, taskB) => taskA.createdDate - taskB.createdDate)];
        setElements(filterOldElements);
    }

    function sortNewsElements() {
        const filterNewsElements = [...elements.sort((taskA, taskB) => taskB.createdDate - taskA.createdDate)];
        setElements(filterNewsElements);
    }

    function sortCrucialElements() {
        const filterCrucialElements = [...elements.sort((taskA, taskB) => Number(taskB.crucial) - Number(taskA.crucial))];
        setElements(filterCrucialElements);
    }

    function sortCrucialElement(event:any) {
        const findTargetCrucialElement = elements.find((el, index) => event.target.value == index.toString());
        const cloneCrucialElement = {
            text: findTargetCrucialElement?.text || '',
            done: findTargetCrucialElement?.done || false,
            crucial: findTargetCrucialElement?.crucial || false,
            createdDate: findTargetCrucialElement?.createdDate || Date.now(),
        };
        
        if (cloneCrucialElement.crucial === true) {
            cloneCrucialElement.crucial = false;
        } else if (cloneCrucialElement.crucial === false) {
            cloneCrucialElement.crucial = true;
        }

        const normalsElementsFilter = elements.filter((el,index) => (event.target.value != index.toString()));

        if (cloneCrucialElement.crucial === true) {
            normalsElementsFilter.unshift(cloneCrucialElement);
            const finalArray = [...normalsElementsFilter];
            setElements(finalArray);

        } else if (cloneCrucialElement.crucial === false) {
            normalsElementsFilter.push(cloneCrucialElement);

            const elementsCrucialFilter = normalsElementsFilter.filter((el,index) => el.crucial);
            const elementsNoCrucialFilter = normalsElementsFilter.filter((el,index) => !el.crucial);
            elementsNoCrucialFilter.sort((dateA, dateB) => dateA.createdDate - dateB.createdDate);
            const finalElementsFilter = elementsCrucialFilter.concat(elementsNoCrucialFilter)
            const finalArray = [...finalElementsFilter];
            setElements(finalArray);
        }
        

    }        

    function crucialElments(indexElement:number) {
        const crucialElement = [...elements.map((el, index) => {
            if (index === indexElement && el.crucial === false) {
                return {...el, crucial: true}
            } else if (index === indexElement && el.crucial === true) {
                return {...el, crucial: false}
            } else {
                return el;
            }
        })];

        setElements(crucialElement);
    }


    function isChecked(event:any) {
        const elemmentsCheck = elements.map((checkItem, index) => {
            if (event.target.value == index.toString() && event.target.checked) {
                checkItem.done = true;
            } 
            
            if (event.target.value == index && !event.target.checked) {
                checkItem.done = false;
            }
            
            
            return checkItem;
        });
        
        const elementsCrucial = elemmentsCheck.filter((el,index) => (el.crucial));
        const elementsNoCrucial = elemmentsCheck.filter((el,index) => (!el.crucial));
        elementsNoCrucial.sort((checkA, checkB) => (checkA.createdDate - checkB.createdDate));
        const elementsFilter = elementsCrucial.concat(elementsNoCrucial);

        setElements(elementsFilter);
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
                totalElements={elements.length}
                changeCrucialElements={crucialElments}
                sortCrucialElementFilter={sortCrucialElement}
            />
        )
    });

    return (
        <div>
            <div className="px-4 sm:px-20 py-5 flex flex-col items-center w-full">
                <div className={"flex flex-col items-center w-full "
                    + ((elements.length > 10 ? 'xl:w-auto' : '') + (elements.length <= 10 ? 'w-1/2' : '')) }>
                    <TodoColumn
                        listShowElements={myListElements}
                        filterOldElements={sortOldElements}
                        filterNewElements={sortNewsElements}
                        filterCrucialElement={sortCrucialElements}
                    />
                </div>
            </div>
            <TodoInput
                addItemElement={addElement}
                addNewElement={newElements}
                creatNewElement={setNewElements}
                addNewItemsElement={addElement}
                removeElements={removeAllElements}
                />
        </div>
    )
}

export default TodoList;