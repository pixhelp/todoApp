import { useState, useEffect,useRef } from "react";
import { useTodo } from "../../context/todoContext"
import TodoColumn from "./TodoColumn/TodoColumn";
import TodoItem from "./TodoItem/TodoItem";
import TodoInput from "./TodoInput/TodoInput"


const TodoList: React.FC = () => {
    const { todos, setTodos } = useTodo();
    const [newElements, setNewElements] =  useState('');
    const [isOldsActive, setIsOldsElements] = useState(false);
    const [isNewsActive, setIsNewsElements] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const addElement = () => {
        if (newElements.trim() !== '') {
            const todoElement = {
                text: newElements,
                done: false,
                crucial: false,
                createdDate: Date.now(),
            }

            setTodos([...todos, todoElement]);
            setNewElements('');
        }
    }

    const removeElement = (indexArray: number) => {
        const filterTodo = todos.filter((_el, index) => indexArray != index);
       setTodos(filterTodo);
    }
    
    const removeAllElements = () => {
       const filterAllElements = [...todos.filter((el) => el.done === false)]
       setTodos(filterAllElements);
    }

    const sortOldElements = () => {
        const filterOldElements = [...todos.sort((taskA, taskB) => taskA.createdDate - taskB.createdDate)];
       
        setIsOldsElements((oldsActive) => {
            if (!oldsActive) setIsNewsElements(false);
            return !oldsActive;
        });

        setTodos(filterOldElements);
    }

    const sortNewsElements = () => {
        const filterNewsElements = [...todos.sort((taskA, taskB) => taskB.createdDate - taskA.createdDate)];
        
        setIsNewsElements((newsActive) => {
            if (!newsActive) setIsOldsElements(false)
                return !newsActive;
        });

        setTodos(filterNewsElements);
    }

    const sortCrucialElement = (event:any) => {
        const findTargetCrucialElement = todos.find((el, index:number) => event.target.value == index.toString());
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

        const normalsElementsFilter = todos.filter((el,index:number) => (event.target.value != index.toString()));

        if (cloneCrucialElement.crucial === true) {
            normalsElementsFilter.unshift(cloneCrucialElement);
            const finalArray = [...normalsElementsFilter];
            setTodos(finalArray);

        } else if (cloneCrucialElement.crucial === false) {
            normalsElementsFilter.push(cloneCrucialElement);

            const elementsCrucialFilter = normalsElementsFilter.filter((el: { text: string; done: boolean; crucial: boolean; createdDate: number }, index: number) => el.crucial);
            const elementsNoCrucialFilter = normalsElementsFilter.filter((el: { text: string; done: boolean; crucial: boolean; createdDate: number }, index: number) => !el.crucial);
            elementsNoCrucialFilter.sort((dateA, dateB) => dateA.createdDate - dateB.createdDate);
            const finalElementsFilter = elementsCrucialFilter.concat(elementsNoCrucialFilter)
            const finalArray = [...finalElementsFilter];
            setTodos(finalArray);
        }
    }        

    const crucialElments = (indexElement:number) => {
        const crucialElement = [...todos.map((el: { text: string; done: boolean; crucial: boolean; createdDate: number }, index: number) => {
            if (index === indexElement && el.crucial === false) {
                return {...el, crucial: true}
            } else if (index === indexElement && el.crucial === true) {
                return {...el, crucial: false}
            } else {
                return el;
            }
        })];

        setTodos(crucialElement);
    }

    const isChecked = (event:any) => {
        const elemmentsCheck = todos.map((checkItem, index) => {
            if (event.target.value == index.toString() && event.target.checked) {
                checkItem.done = true;
            } 
            
            if (event.target.value == index && !event.target.checked) {
                checkItem.done = false;
            }
            
            
            return checkItem;
        });
        
        const elementsCrucial = elemmentsCheck.filter((el: { text: string; done: boolean; crucial: boolean; createdDate: number }, index: number) => (el.crucial));
        const elementsNoCrucial = elemmentsCheck.filter((el: { text: string; done: boolean; crucial: boolean; createdDate: number }, index: number) => (!el.crucial));
        elementsNoCrucial.sort((checkA, checkB) => (checkA.createdDate - checkB.createdDate));
        const elementsFilter = elementsCrucial.concat(elementsNoCrucial);

        setTodos(elementsFilter);
    }

    const { filterDoneOnly, filterCrucialOnly } = useTodo(); 
    let sortElements = [];
    
    if (filterDoneOnly) {
        const filtered = filterDoneOnly ? todos.filter((todo) => todo.done) : todos;
        sortElements = [...filtered.sort((a, b) => Number(a.done) - Number(b.done))];

    } else if (filterCrucialOnly) {
        const filteredCrucial = filterCrucialOnly ? todos.filter((todo) => todo.crucial) : todos;
        sortElements = [...filteredCrucial.sort((a, b) => Number(a.done) - Number(b.done))];

    } else {
        sortElements = [...todos.sort((a, b) => Number(a.done) - Number(b.done))];
    };

    const checkAllElements = () => {
        const newStateAllCheck = !isAllChecked;
        setIsAllChecked(newStateAllCheck);

        const checkElements = [...todos.map((el) => {
            return { ...el, done: newStateAllCheck };
        })];

        setTodos(checkElements);
    };
    
    const myListElements = sortElements.map((el, index) => {
        return (
            <TodoItem
                key={index}
                index={index}
                showElement={el}
                check={isChecked}
                remove={() => removeElement(index)}
                totalElements={todos.length}
                changeCrucialElements={crucialElments}
                sortCrucialElementFilter={sortCrucialElement}
            />
        )
    });
        
    return (
        <div>
            <input type="checkbox" value="check-all" onClick={checkAllElements}/>
            <div className="px-4 sm:px-20 py-5 flex flex-col items-center w-full">
                <div className={"flex flex-col items-center w-full "
                    + ((todos.length > 10 ? 'xl:w-auto' : '') + (todos.length <= 10 ? 'w-1/2' : '')) }>
                    <TodoColumn
                        isOldsElementActive={isOldsActive}
                        isNewsElementActive={isNewsActive}
                        listShowElements={myListElements}
                        filterOldElements={sortOldElements}
                        filterNewElements={sortNewsElements}
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