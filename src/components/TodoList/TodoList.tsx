import { useState } from "react";
import { useTodo } from "../../context/todoContext";
import TodoColumn from "./TodoColumn/TodoColumn";
import TodoItem from "./TodoItem/TodoItem";
import TodoInput from "./TodoInput/TodoInput";

const TodoList: React.FC = () => {
  const { todos, setTodos } = useTodo();
  const [newElements, setNewElements] = useState('');

  function addElement() {
    if (newElements.trim() !== '') {
      const todoElement = {
        text: newElements,
        done: false,
        crucial: false,
        createdDate: Date.now(),
      };
      setTodos([...todos, todoElement]);
      setNewElements('');
    }
  }

  function removeElement(index: number) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  function removeAllElements() {
    setTodos(todos.filter((el) => !el.done));
  }

  function sortOldElements() {
    setTodos([...todos].sort((a, b) => a.createdDate - b.createdDate));
  }

  function sortNewsElements() {
    setTodos([...todos].sort((a, b) => b.createdDate - a.createdDate));
  }

  function sortCrucialElements() {
    setTodos([...todos].sort((a, b) => Number(b.crucial) - Number(a.crucial)));
  }

  function sortCrucialElement(event: any) {
    const index = parseInt(event.target.value);
    const updated = [...todos];
    const [target] = updated.splice(index, 1);
    target.crucial = !target.crucial;

    if (target.crucial) {
      updated.unshift(target);
    } else {
      updated.push(target);
      const crucial = updated.filter((el) => el.crucial);
      const normal = updated.filter((el) => !el.crucial).sort((a, b) => a.createdDate - b.createdDate);
      setTodos([...crucial, ...normal]);
      return;
    }

    setTodos(updated);
  }

  function crucialElments(index: number) {
    const updated = todos.map((el, i) =>
      i === index ? { ...el, crucial: !el.crucial } : el
    );
    setTodos(updated);
  }

  function isChecked(event: any) {
    const index = parseInt(event.target.value);
    const updated = todos.map((el, i) =>
      i === index ? { ...el, done: event.target.checked } : el
    );

    const crucial = updated.filter((el) => el.crucial);
    const normal = updated.filter((el) => !el.crucial).sort((a, b) => a.createdDate - b.createdDate);
    setTodos([...crucial, ...normal]);
  }

  const sorted = [...todos].sort((a, b) => Number(a.done) - Number(b.done));
  const myListElements = sorted.map((el, index) => (
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
  ));

  return (
    <div>
      <div className="px-4 sm:px-20 py-5 flex flex-col items-center w-full">
        <div className={"flex flex-col items-center w-full " + ((todos.length > 10 ? 'xl:w-auto' : '') + (todos.length <= 10 ? 'w-1/2' : ''))}>
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
  );
};

export default TodoList;