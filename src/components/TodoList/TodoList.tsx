import { useState } from "react";
import { useTodo } from "../../context/todoContext"
import TodoColumn from "./TodoColumn/TodoColumn";
import TodoInput from "./TodoInput/TodoInput"

const TodoList: React.FC = () => {
    const { todos, setTodos } = useTodo();
    const [newElements, setNewElements] = useState('');
    const [newTitleElements, setNewTitleElements] = useState('');
    const [isOldsActive, setIsOldsElements] = useState(false);
    const [isNewsActive, setIsNewsElements] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const addElement = () => {
        if (newElements.trim() && newTitleElements.trim()) {
            const todoElement = {
                title: newTitleElements,
                text: newElements,
                done: false,
                crucial: false,
                createdDate: Date.now(),
            };
            setTodos([todoElement, ...todos]);
            setNewElements('');
            setNewTitleElements('');
        }
    };

    const removeAllElements = () => {
        const remaining = todos.filter(el => !el.done);
        setTodos(remaining);
    };

    const sortOldElements = () => {
        const sorted = [...todos].sort((a, b) => a.createdDate - b.createdDate);
        setIsOldsElements(prev => {
            if (!prev) setIsNewsElements(false);
            return !prev;
        });
        setTodos(sorted);
    };

    const sortNewsElements = () => {
        const sorted = [...todos].sort((a, b) => b.createdDate - a.createdDate);
        setIsNewsElements(prev => {
            if (!prev) setIsOldsElements(false);
            return !prev;
        });
        setTodos(sorted);
    };

    const sortCrucialElement = (event: any) => {
        const index = Number(event.target.value);
        const target = todos[index];
        if (!target) return;

        const updated = todos.map((el, i) =>
            i === index ? { ...el, crucial: !el.crucial } : el
        );

        const crucial = updated.filter(el => el.crucial);
        const nonCrucial = updated.filter(el => !el.crucial).sort((a, b) => a.createdDate - b.createdDate);
        setTodos([...crucial, ...nonCrucial]);
    };

    const crucialElments = (index: number) => {
        const updated = todos.map((el, i) =>
            i === index ? { ...el, crucial: !el.crucial } : el
        );
        setTodos(updated);
    };

    const isChecked = (event: any) => {
        const index = Number(event.target.value);
        const updated = todos.map((el, i) =>
            i === index ? { ...el, done: event.target.checked } : el
        );

        const crucial = updated.filter(el => el.crucial);
        const nonCrucial = updated.filter(el => !el.crucial).sort((a, b) => a.createdDate - b.createdDate);
        setTodos([...crucial, ...nonCrucial]);
    };

    const checkAllElements = () => {
        const allChecked = !isAllChecked;
        setIsAllChecked(allChecked);
        setTodos(todos.map(el => ({ ...el, done: allChecked })));
    };

    return (
        <div>
            <div className="px-4 sm:px-20 py-5 flex flex-col items-center w-full">
                <div className={"flex flex-col items-center w-full " + (todos.length > 10 ? 'xl:w-full' : '')}>
                    <TodoColumn
                        isAllCheckedElements={checkAllElements}
                        isOldsElementActive={isOldsActive}
                        isNewsElementActive={isNewsActive}
                        filterOldElements={sortOldElements}
                        filterNewElements={sortNewsElements}
                        todos={todos}
                        check={isChecked}
                        changeCrucialElements={crucialElments}
                        sortCrucialElementFilter={sortCrucialElement}
                    />
                </div>
            </div>

            <TodoInput
                addItemElement={addElement}
                addNewItemsElement={addElement}
                addNewElement={newElements}
                addNewTitleElement={newTitleElements}
                addTitleElement={setNewTitleElements}
                creatNewTitleElement={setNewTitleElements}
                creatNewElement={setNewElements}
                removeElements={removeAllElements}
            />
        </div>
    );
};

export default TodoList;
